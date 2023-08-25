import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContactGroupsService } from './contact-groups.service';
import { ContactGroup, User } from '@prisma/client';
import {
  CreateContactGroupDTO,
  UpdateContactGroupDTO,
} from './contact-group.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'apps/api/src/infrastructure/common/guards/roles.guard';
import { Roles } from 'apps/api/src/infrastructure/common/decorators/roles.decorators';
import { GetUser } from 'apps/api/src/infrastructure/common/decorators/get-user.decorators';
import { ContactGroupModel } from 'apps/api/src/domain/model/contact-group';

@Controller('contact-groups')
export class ContactGroupsController {
  constructor(private contactGroupsService: ContactGroupsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['ADMIN', 'MEMBER'])
  async getContactGroups(@GetUser() user: User): Promise<ContactGroupModel[]> {
    return await this.contactGroupsService.getContactGroups({
      userId: user.role === 'MEMBER' ? user.id : null,
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['ADMIN', 'MEMBER'])
  async findContactGroupById(
    @Param('id') id: string
  ): Promise<ContactGroupModel> {
    return await this.contactGroupsService.findContactGroupById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['ADMIN', 'MEMBER'])
  async createContactGroup(
    @Body() createContactGroupDTO: CreateContactGroupDTO,
    @GetUser() user: User
  ): Promise<ContactGroupModel> {
    return await this.contactGroupsService.createContactGroup({
      ...createContactGroupDTO,
      userId: user.id,
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['ADMIN', 'MEMBER'])
  async updateContactGroup(
    @Param('id') id: string,
    @Body() updateContactGroupDTO: UpdateContactGroupDTO,
    @GetUser() user: User
  ): Promise<ContactGroupModel> {
    return await this.contactGroupsService.updateContactGroup(id, {
      ...updateContactGroupDTO,
      userId: user.id,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['ADMIN', 'MEMBER'])
  async deleteContactGroup(@Param('id') id: string): Promise<ContactGroup> {
    return await this.contactGroupsService.deleteContactGroup(id);
  }

  // @Post(':id/contacts')
  // async addContactsToContactGroup(
  //   @Param('id') id: string,
  //   @Body() addContactsToContactGroupDTO: AddContactsToContactGroupDTO
  // ): Promise<ContactGroup> {
  //   return await this.contactGroupsService.addContactsToContactGroup(
  //     id,
  //     addContactsToContactGroupDTO
  //   );
  // }

  // @Delete(':id/contacts')
  // async removeContactsFromContactGroup(
  //   @Param('id') id: string,
  //   @Body() removeContactsFromContactGroupDTO: RemoveContactsFromContactGroupDTO
  // ): Promise<ContactGroup> {
  //   return await this.contactGroupsService.removeContactsFromContactGroup(
  //     id,
  //     removeContactsFromContactGroupDTO
  //   );
  // }

  // @Get(':id/contacts')
  // async getContactsFromContactGroup(
  //   @Param('id') id: string
  // ): Promise<Contact[]> {
  //   return await this.contactGroupsService.getContactsFromContactGroup(id);
  // }

  // @Get(':id/contacts/:contactId')
  // async getContactFromContactGroup(
  //   @Param('id') id: string,
  //   @Param('contactId') contactId: string
  // ): Promise<Contact> {
  //   return await this.contactGroupsService.getContactFromContactGroup(
  //     id,
  //     contactId
  //   );
  // }
}
