import { Module } from '@nestjs/common';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';

@Module({
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService],
  exports: [AuthenticationsService],
})
export class AuthenticationsModule {}
