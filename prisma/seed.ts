
import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

// added the postgres adapter for prisma 7
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // creates the default users
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        password,
      },
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }

  // adds the sample contacts to the database
  for (const contact of config.defaultContacts) {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);

    await prisma.contact.upsert({
      where: { id: config.defaultContacts.indexOf(contact) + 1 },
      update: {
        image: contact.image,
      },
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
