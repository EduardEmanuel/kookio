import { Prisma } from '@prisma/client';

import { mockIngredients } from '@kookio/mock';
import { logger } from '@kookio/utils';

import { prisma, withTxRetry } from '../src/lib/prisma-client';

const SEED_USER_ID = process.env['SEED_USER_ID'] ?? 'seed-user';

function chunk<T>(arr: T[], size = 50): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function upsertChunk(items: typeof mockIngredients) {
  await withTxRetry(prisma, (tx) =>
    Promise.all(
      items.map((raw: Prisma.IngredientCreateInput) => {
        const { id, name, optional, quantity, unit } = raw;
        let { userId } = raw;

        userId = userId ?? SEED_USER_ID;

        const base = { id, name, optional, quantity, unit, userId };
        const create: Prisma.IngredientCreateInput = base;
        const update: Prisma.IngredientUpdateInput = base;
        const where: Prisma.IngredientWhereUniqueInput = { userId_name: { name, userId } };

        return tx.ingredient.upsert({ create, update, where });
      })
    )
  );
}

async function seedIngredients(): Promise<number> {
  const items = mockIngredients;
  let total = 0;

  for (const part of chunk(items, 50)) {
    await upsertChunk(part);
    total += part.length;
  }
  return total;
}

async function main() {
  logger.info(`🌱 Seeding ${mockIngredients.length} ingredients into Cockroach (user=${SEED_USER_ID}).`);
  const total = await seedIngredients();
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