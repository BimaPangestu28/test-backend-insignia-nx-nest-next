import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDTO, UpdateContactDTO } from './contacts.dto';
import { User } from '@prisma/client';
import { GetUser } from '../../../../apps/api/src/infrastructure/common/decorators/get-user.decorators';
import { Roles } from '../../../../apps/api/src/infrastructure/common/decorators/roles.decorators';
import { JwtAuthGuard } from 'apps/api/src/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from 'apps/api/src/infrastructure/common/guards/roles.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN', 'MEMBER'])
  getContacts(@GetUser() user: User) {
    return this.contactsService.getContacts({
      userId: user.role === 'ADMIN' ? undefined : user.id,
    });
  }

  @Get('/:id')
  getContactById(@Param('id') id: string) {
    return this.contactsService.findContactById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN', 'MEMBER'])
  createContact(@Body() data: CreateContactDTO, @GetUser() user: User) {
    return this.contactsService.createContact({ ...data, userId: user.id });
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateContact(@Param('id') id: string, @Body() data: UpdateContactDTO) {
    return this.contactsService.updateContact(id, data);
  }

  @Delete('/:id')
  deleteContact(@Param('id') id: string) {
    return this.contactsService.deleteContact(id);
  }
}
