import { ContactGroupsService } from './../../../contact-groups/src/lib/contact-groups.service';
/* eslint-disable @nx/enforce-module-boundaries */
import { ContactModel } from './../../../../apps/api/src/domain/model/contact';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Contact, PrismaClient } from '@prisma/client';
import { CreateContactDTO, UpdateContactDTO } from './contacts.dto';
import { UsersService } from '@test-backend-insignia-nx-nest-next/users';

const prisma = new PrismaClient();

@Injectable()
export class ContactsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(forwardRef(() => ContactGroupsService))
    private readonly contactGroupsService: ContactGroupsService
  ) {}

  toContactModel(contact: any): ContactModel {
    const contactModel = new ContactModel();

    contactModel.id = contact.id;
    contactModel.name = contact.name;
    contactModel.email = contact.email;
    contactModel.phoneNumber = contact.phoneNumber;
    contactModel.address = contact.address;

    if (contact.user) {
      contactModel.user = this.userService.toUserModel(contact.user);
    }

    if (contact.ContactList && contact.ContactList.length > 0) {
      contactModel.contactGroups = contact.ContactList.map((contactList) => {
        return this.contactGroupsService.toContactGroupModel(
          contactList.contactGroup
        );
      });
    }

    return contactModel;
  }

  async getContacts({ userId }: { userId?: string }): Promise<ContactModel[]> {
    const where: any = {};

    if (userId) where.userId = userId;

    const contacts = await prisma.contact.findMany({
      where,
      include: { user: true, ContactList: { include: { contactGroup: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return contacts.map((contact) => this.toContactModel(contact));
  }

  async findContactById(id: string): Promise<ContactModel> {
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: { user: true, ContactList: { include: { contactGroup: true } } },
    });

    if (!contact) throw new Error('Contact not found');

    return this.toContactModel(contact);
  }

  async createContact(data: CreateContactDTO): Promise<ContactModel> {
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        user: {
          connect: { id: data.userId },
        },
      },
    });

    if (data.contactGroupIds && data.contactGroupIds.length > 0)
      await prisma.contactList.createMany({
        data: data.contactGroupIds.map((contactGroupId) => {
          return {
            contactId: contact.id,
            contactGroupId,
          };
        }),
      });

    return await this.findContactById(contact.id);
  }

  async updateContact(
    id: string,
    data: UpdateContactDTO
  ): Promise<ContactModel> {
    await this.findContactById(id);

    const contact = await prisma.contact.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
      },
    });

    if (data.contactGroupIds && data.contactGroupIds.length > 0) {
      await prisma.contactList.deleteMany({ where: { contactId: id } });
      await prisma.contactList.createMany({
        data: data.contactGroupIds.map((contactGroupId) => {
          return {
            contactId: contact.id,
            contactGroupId,
          };
        }),
      });
    }

    return await this.findContactById(contact.id);
  }

  async deleteContact(id: string): Promise<Contact> {
    await this.findContactById(id);

    const contact = await prisma.contact.delete({ where: { id } });

    await prisma.contactList.deleteMany({ where: { contactId: id } });

    return contact;
  }
}
