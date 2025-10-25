import path from 'path';
import dotenvSafe from 'dotenv-safe';

import { PrismaClient, Prisma } from '@kookio/prisma';
import { mockIngredients } from '@kookio/mock';
import { logger } from '@kookio/utils';

const envFile = process.argv[2] ?? '.env.local';
const projectRoot = path.resolve(__dirname, '..');

dotenvSafe.config({
  path: path.join(projectRoot, envFile),
  example: path.join(projectRoot, '.env.example'),
  allowEmptyValues: true,
});

const prisma = new PrismaClient();

type SeedInput = Prisma.IngredientUncheckedCreateInput;

const normalizeIngredient = (ingredient: SeedInput): SeedInput => ({
  ...ingredient,
  createdAt: ingredient.createdAt ?? new Date(),
});

async function seedIngredients(): Promise<number> {
  const operations = mockIngredients.map((ingredient) => {
    if (!ingredient.id) {
      throw new Error('Seed ingredient requires an id');
    }

    const { id, createdAt, ...rest } = ingredient;
    const createPayload = normalizeIngredient({ id, createdAt, ...rest });
    const updatePayload: Prisma.IngredientUpdateInput = rest;

    return prisma.ingredient.upsert({
      where: { id },
      update: updatePayload,
      create: createPayload,
    });
  });

  const result = await prisma.$transaction(operations);
  return result.length;
}

async function main() {
  logger.info(`🌱 Seeding ${mockIngredients.length} ingredients into Cockroach/PostgreSQL...`);
  const total = await seedIngredients();
  logger.info(`✅ Seed completed (${total} ingredients synced).`);
}

main()
  .catch((error) => {
    logger.error(error, '❌ Prisma seed failed');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
