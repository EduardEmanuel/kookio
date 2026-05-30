import { prisma } from '@kookio/prisma-client/server';
import { MeasureUnitSchema } from '@kookio/prisma-client';

import { logger } from './seed-helpers';

const mu = MeasureUnitSchema.enum;

// Ingredient names to pre-stock in the dev pantry (resolved against IngredientCatalog)
const DEV_PANTRY_INGREDIENTS: Array<{
  normalizedName: string;
  quantity: number;
  unit: (typeof mu)[keyof typeof mu];
}> = [
  { normalizedName: 'flour', quantity: 500, unit: mu.G },
  { normalizedName: 'eggs', quantity: 6, unit: mu.PIECE },
  { normalizedName: 'butter', quantity: 200, unit: mu.G },
  { normalizedName: 'milk', quantity: 1000, unit: mu.ML },
  { normalizedName: 'sugar', quantity: 300, unit: mu.G },
  { normalizedName: 'salt', quantity: 100, unit: mu.G },
  { normalizedName: 'olive oil', quantity: 500, unit: mu.ML },
  { normalizedName: 'onion', quantity: 3, unit: mu.PIECE },
  { normalizedName: 'garlic', quantity: 1, unit: mu.BUNCH },
  { normalizedName: 'tomatoes', quantity: 4, unit: mu.PIECE },
];

export const seedPantryItems = async (userId: string): Promise<void> => {
  logger.info({ userId }, '🌱 Seeding pantry items…');

  const names = DEV_PANTRY_INGREDIENTS.map((i) => i.normalizedName);
  const ingredients = await prisma.ingredientCatalog.findMany({
    where: { normalizedName: { in: names } },
    select: { id: true, normalizedName: true },
  });
  const nameToId = Object.fromEntries(
    ingredients.map((i) => [i.normalizedName, i.id]),
  );

  let seeded = 0;
  for (const item of DEV_PANTRY_INGREDIENTS) {
    const ingredientCatalogId = nameToId[item.normalizedName];
    if (!ingredientCatalogId) {
      logger.warn(
        { normalizedName: item.normalizedName },
        'Ingredient not found in catalog — skipping pantry item',
      );
      continue;
    }

    await prisma.pantryItem.upsert({
      where: { userId_ingredientCatalogId: { userId, ingredientCatalogId } },
      create: {
        userId,
        ingredientCatalogId,
        quantity: item.quantity,
        unit: item.unit,
      },
      update: { quantity: item.quantity, unit: item.unit },
    } as never);
    seeded += 1;
  }

  logger.info({ seeded }, '✅ Pantry items seeded');
};
