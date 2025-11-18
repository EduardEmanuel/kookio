import { UpdateOneIngredientDTO } from "@kookio/prisma-validator";
import { mockIngredients } from "@kookio/mock";
import { logger } from "@kookio/utils";

import prisma from "../src/lib/prisma-client";

async function seedIngredients(): Promise<number> {
  const operations = mockIngredients.map((ingredient) => {
    if (!ingredient.id) {
      throw new Error('Seed ingredient requires an id');
    }

    const { id, ...rest } = ingredient;
    const updatePayload: UpdateOneIngredientDTO = rest;

    return prisma.ingredient.upsert({
      where: { id },
      update: updatePayload,
      create: ingredient,
    });
  });

  const result = await prisma.$transaction(operations);
  return result.length;
}

async function main() {
  logger.info(`🌱 Seeding ${mockIngredients.length} ingredients into Cockroach.`);
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
