import { prisma } from '@kookio/prisma-client/server';

export default async () => {
  await prisma.$disconnect();
};
