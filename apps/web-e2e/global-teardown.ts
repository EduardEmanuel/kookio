import { prisma } from '@kookio/prisma-client';

export default async function globalTeardown() {
  await prisma.$disconnect();
}