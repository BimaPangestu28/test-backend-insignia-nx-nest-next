import { Module } from '@nestjs/common';

import {
  AuthenticationsController,
  AuthenticationsService,
} from '@test-backend-insignia-nx-nest-next/authentications';
import {
  UsersController,
  UsersService,
} from '@test-backend-insignia-nx-nest-next/users';
import {
  ContactsController,
  ContactsService,
} from '@test-backend-insignia-nx-nest-next/contacts';
import {
  ContactGroupsController,
  ContactGroupsService,
} from '@test-backend-insignia-nx-nest-next/contact-groups';
import { LoggerModule } from '../infrastructure/logger/logger.module';
import { ExceptionsModule } from '../infrastructure/exceptions/exceptionts.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtModule as JwtServiceModule } from '../infrastructure/services/jwt/jwt.module';

import { BcryptModule } from '../infrastructure/services/bcrypt/bcrypt.module';
import { EnvironmentConfigModule } from '../infrastructure/config/environment-config/environment-config.module';
import { LocalStrategy } from '../infrastructure/common/strategies/local.strategy';
import { JwtStrategy } from '../infrastructure/common/strategies/jwt.strategy';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
  ],
  controllers: [
    AuthenticationsController,
    UsersController,
    ContactsController,
    ContactGroupsController,
  ],
  providers: [
    AuthenticationsService,
    UsersService,
    ContactsService,
    ContactGroupsService,

    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
