import { Prisma } from '@prisma/client';

import { mockIngredients } from '@kookio/shared-mock';
import { logger } from '@kookio/server-logger';

import { prisma, withTxRetry } from '../lib/prisma-client';

const SEED_USER_ID = process.env['SEED_USER_ID'];

const chunk = <T>(arr: T[], size = 50): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const upsertChunk = async (items: typeof mockIngredients, userId: string) => {
  await withTxRetry(prisma, async (tx) => {
    for (const raw of items as Prisma.IngredientCreateInput[]) {
      const { name, optional, quantity, unit } = raw;

      await tx.ingredient.upsert({
        where: {
          userId_name: { userId, name },
        },
        create: {
          userId,
          name,
          quantity,
          unit,
          optional,
        },
        update: {
          quantity,
          unit,
          optional,
        },
      });
    }
  });
};

const seedIngredients = async (userId: string): Promise<number> => {
  const items = mockIngredients;
  let total = 0;

  for (const part of chunk(items, 50)) {
    await upsertChunk(part, userId);
    total += part.length;
  }
  return total;
};

const main = async () => {
  if (!SEED_USER_ID) {
    logger.info('🌱 SEED_USER_ID not set; skipping seed.');
    return;
  }

  logger.info(
    `🌱 Seeding ${mockIngredients.length} ingredients into Cockroach (user=${SEED_USER_ID}).`,
  );
  const total = await seedIngredients(SEED_USER_ID);
  logger.info(`✅ Seed completed (${total} ingredients upserted).`);
};

main()
  .catch((error) => {
    logger.error(error, '❌ Prisma seed failed');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
