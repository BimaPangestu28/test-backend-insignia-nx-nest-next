import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { AuthenticationsService } from '@test-backend-insignia-nx-nest-next/authentications';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
    private readonly authentcationService: AuthenticationsService
  ) {
    super();
  }

  async validate(email: string, password: string) {
    if (!email || !password) {
      this.logger.warn(
        'LocalStrategy',
        `email or password is missing, BadRequestException`
      );
      this.exceptionService.UnauthorizedException();
    }
    const user = await this.authentcationService.validateLogin({
      email,
      password,
    });
    if (!user) {
      this.logger.warn('LocalStrategy', `Invalid email or password`);
      this.exceptionService.UnauthorizedException({
        message: 'Invalid email or password.',
      });
    }
    return user;
  }
}
