import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const contactListAdmin: any = [];

  for (let i = 0; i < 10; i++) {
    contactListAdmin.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      address: faker.address.streetAddress(),
    });
  }

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@email.dev' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@email.dev',
      password: await bcrypt.hash('passwordadmin123', 10),
      role: 'ADMIN',
      ContactGroups: {
        create: [
          {
            name: faker.lorem.word(),
            description: faker.lorem.paragraph(),
          },
        ],
      },
      Contacts: {
        create: contactListAdmin,
      },
    },
  });

  const contactListMember: any = [];

  for (let i = 0; i < 10; i++) {
    contactListMember.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      address: faker.address.streetAddress(),
    });
  }

  const memberUser = await prisma.user.upsert({
    where: { email: 'member@email.dev' },
    update: {},
    create: {
      name: 'member',
      email: 'member@email.dev',
      password: await bcrypt.hash('passwordmember123', 10),
      role: 'MEMBER',
      ContactGroups: {
        create: {
          name: faker.lorem.word(),
          description: faker.lorem.paragraph(),
        },
      },
      Contacts: {
        create: contactListMember,
      },
    },
  });

  console.log({ adminUser, memberUser });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
