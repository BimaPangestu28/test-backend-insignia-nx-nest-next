import { LoginDTO, RegisterDTO } from './authentications.dto';
import { BcryptService } from './../../../../apps/api/src/infrastructure/services/bcrypt/bcrypt.service';
import { LoggerService } from './../../../../apps/api/src/infrastructure/logger/logger.service';
import { JwtTokenService } from '../../../../apps/api/src/infrastructure/services/jwt/jwt.service';
import { EnvironmentConfigService } from '../../../../apps/api/src/infrastructure/config/environment-config/environment-config.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AuthenticationsService {
  constructor(
    private readonly logger: LoggerService,
    private readonly jwtService: JwtTokenService,
    private readonly environtmentConfigService: EnvironmentConfigService,
    private readonly bcryptService: BcryptService
  ) {}

  async validateLogin(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = loginDTO;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const match = await this.bcryptService.compare(password, user.password);

    if (user && match) {
      await this.updateLastActivity(user.email);

      return await this.createTokenJWT(user);
    }

    throw new BadRequestException('Invalid credentials');
  }

  async createTokenJWT(user: User): Promise<{ accessToken: string }> {
    this.logger.log('createTokenJWT execute', `createTokenJWT: ${user.email}`);
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    };
    const secret = this.environtmentConfigService.getJwtSecret();
    const expiresIn =
      this.environtmentConfigService.getJwtExpirationTime() + 's';

    return {
      accessToken: this.jwtService.createToken(payload, secret, expiresIn),
    };
  }

  async validateUserForJWTStragtegy(email: string) {
    this.logger.log(
      'validateUserForJWTStragtegy execute',
      `validateUserForJWTStragtegy: ${email}`
    );
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }

  async updateLastActivity(email: string): Promise<User> {
    return await prisma.user.update({
      where: { email },
      data: { lastActivityAt: new Date() },
    });
  }

  async register(registerDTO: RegisterDTO): Promise<{ accessToken: string }> {
    const { email, password, name } = registerDTO;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.bcryptService.hash(password);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: 'MEMBER' },
    });

    return await this.createTokenJWT(newUser);
  }
}
