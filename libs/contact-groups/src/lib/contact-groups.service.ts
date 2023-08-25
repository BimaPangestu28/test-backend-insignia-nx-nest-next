import { ContactGroupModel } from './../../../../apps/api/src/domain/model/contact-group';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ContactGroup, PrismaClient } from '@prisma/client';
import { ContactsService } from 'libs/contacts/src/lib/contacts.service';
import { UsersService } from 'libs/users/src/lib/users.service';

const prisma = new PrismaClient();

@Injectable()
export class ContactGroupsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(forwardRef(() => ContactsService))
    private readonly contactsService: ContactsService
  ) {}

  async getContactGroups({
    userId,
  }: {
    userId?: string;
  }): Promise<ContactGroupModel[]> {
    const where: any = {};

    if (userId) where['userId'] = userId;

    const groups = await prisma.contactGroup.findMany({
      where,
      include: { ContactList: { include: { contact: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return groups.map((group) => {
      return this.toContactGroupModel(group);
    });
  }

  toContactGroupModel(contactGroup: any): ContactGroupModel {
    const contactGroupModel = new ContactGroupModel();
    contactGroupModel.id = contactGroup.id;
    contactGroupModel.name = contactGroup.name;
    contactGroupModel.description = contactGroup.description;

    if (contactGroup.ContactList)
      contactGroupModel.contactList = contactGroup.ContactList.map(
        (ContactList: any) => {
          return this.contactsService.toContactModel(ContactList.contact);
        }
      );

    if (contactGroup.user)
      contactGroupModel.user = this.userService.toUserModel(contactGroup.user);

    return contactGroupModel;
  }

  async findContactGroupById(id: string): Promise<ContactGroupModel> {
    const contactGroup = await prisma.contactGroup.findUnique({
      where: { id },
      include: { ContactList: { include: { contact: true } }, user: true },
    });

    if (!contactGroup) throw new Error('Contact Group not found');

    return this.toContactGroupModel(contactGroup);
  }

  async createContactGroup(data: any): Promise<ContactGroupModel> {
    const contactGroup = await prisma.contactGroup.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
    });

    if (data.contactIds && data.contactIds.length > 0)
      await prisma.contactList.createMany({
        data: data.contactIds.map((contactId: string) => {
          return {
            contactId,
            contactGroupId: contactGroup.id,
          };
        }),
      });

    return await this.findContactGroupById(contactGroup.id);
  }

  async updateContactGroup(id: string, data: any): Promise<ContactGroupModel> {
    await this.findContactGroupById(id);

    const contactGroup = await prisma.contactGroup.update({
      where: { id },
      data: { name: data.name, description: data.description },
    });

    if (data.contactIds && data.contactIds.length > 0) {
      await prisma.contactList.deleteMany({ where: { contactGroupId: id } });
      await prisma.contactList.createMany({
        data: data.contactIds.map((contactId: string) => {
          return {
            contactId,
            contactGroupId: contactGroup.id,
          };
        }),
      });
    }

    return await this.findContactGroupById(contactGroup.id);
  }

  async deleteContactGroup(id: string): Promise<ContactGroup> {
    await this.findContactGroupById(id);

    const contactGroup = await prisma.contactGroup.delete({ where: { id } });

    await prisma.contactList.deleteMany({ where: { contactGroupId: id } });

    return contactGroup;
  }
}
