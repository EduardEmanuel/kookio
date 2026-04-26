import { prisma } from '@kookio/prisma-client';

export default async () => {
  await prisma.$disconnect();
};
