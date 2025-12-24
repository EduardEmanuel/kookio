import { Prisma } from '@prisma/client';

import { mockIngredients } from '@kookio/shared-mock';
import { logger } from '@kookio/server-logger';

import { prisma, withTxRetry } from '../lib/prisma-client';

const SEED_USER_ID = process.env['SEED_USER_ID']; // no default in cloud

function chunk<T>(arr: T[], size = 50): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function alreadySeeded(userId: string): Promise<boolean> {
  const hit = await prisma.ingredient.findFirst({
    where: { userId },
    select: { id: true },
  });
  return Boolean(hit);
}

async function upsertChunk(items: typeof mockIngredients, userId: string) {
  await withTxRetry(prisma, (tx) =>
    Promise.all(
      items.map((raw: Prisma.IngredientCreateInput) => {
        const { id, name, optional, quantity, unit } = raw;

        const base = { id, name, optional, quantity, unit, userId };
        const create: Prisma.IngredientCreateInput = base;
        const update: Prisma.IngredientUpdateInput = base;
        const where: Prisma.IngredientWhereUniqueInput = { userId_name: { name, userId } };

        return tx.ingredient.upsert({ create, update, where });
      })
    )
  );
}

async function seedIngredients(userId: string): Promise<number> {
  const items = mockIngredients;
  let total = 0;

  for (const part of chunk(items, 50)) {
    await upsertChunk(part, userId);
    total += part.length;
  }
  return total;
}

async function main() {
  if (!SEED_USER_ID) {
    logger.info('🌱 SEED_USER_ID not set; skipping seed.');
    return;
  }

  const seeded = await alreadySeeded(SEED_USER_ID);
  if (seeded) {
    logger.info(`🌱 Seed already present for user=${SEED_USER_ID}; skipping.`);
    return;
  }

  logger.info(`🌱 Seeding ${mockIngredients.length} ingredients into Cockroach (user=${SEED_USER_ID}).`);
  const total = await seedIngredients(SEED_USER_ID);
  logger.info(`✅ Seed completed (${total} ingredients upserted).`);
}

main()
  .catch((error) => {
    logger.error(error, '❌ Prisma seed failed');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });