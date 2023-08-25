import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { LoginDTO, RegisterDTO } from './authentications.dto';
import { LoginGuard } from '../../../../apps/api/src/infrastructure/common/guards/login.guard';
import { User } from '@prisma/client';
import { GetUser } from 'apps/api/src/infrastructure/common/decorators/get-user.decorators';
import { Roles } from 'apps/api/src/infrastructure/common/decorators/roles.decorators';
import { JwtAuthGuard } from 'apps/api/src/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from 'apps/api/src/infrastructure/common/guards/roles.guard';

@Controller('authentications')
export class AuthenticationsController {
  constructor(private authenticationsService: AuthenticationsService) {}

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authenticationsService.validateLogin(loginDTO);
  }

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {
    return await this.authenticationsService.register(registerDTO);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN', 'MEMBER'])
  async me(@GetUser() user: User) {
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}
