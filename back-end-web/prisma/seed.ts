import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient();

async function seed() {
  faker.locale = 'pt_BR';

  const profession = [
    { name: 'Developer' },
    { name: 'Designer' }, 
    { name: 'Product Manager' },
  ];

  const professionResponse = await prisma.$transaction(
    profession.map((profession) => prisma.profession.create({ data: profession }))
  );

  console.log('Profissões criadas com sucesso!', professionResponse);

  const persons = [];

  for (let i = 0; i < 4; i++) {
    persons.push({
      name: faker.name.fullName(),
      professionId: professionResponse[Math.floor(Math.random() * professionResponse.length)].id,
      email: faker.internet.email(),
      phone: faker.phone.number(),
    });
  }

  await prisma.person.createMany({
    data: persons,
  });

  console.log('Seed executado com sucesso!');
}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
