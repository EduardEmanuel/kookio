import * as fs from 'node:fs';
import * as path from 'node:path';

import {
  prisma,
  type IngredientCatalogSeedRow,
  type MealAreaSeedRow,
  type MealCategorySeedRow,
} from '@kookio/prisma-client';

import { logger } from './seed-helpers';

// ─── Types ───────────────────────────────────────────────────────────────────

interface CatalogSnapshot {
  fetchedAt: string;
  cleanedAt: string;
  source: string;
  categories: MealCategorySeedRow[];
  areas: MealAreaSeedRow[];
  ingredients: IngredientCatalogSeedRow[];
}

// ─── Seed functions ──────────────────────────────────────────────────────────

const seedCategories = async (
  categories: MealCategorySeedRow[],
): Promise<void> => {
  logger.info(`🍽️  Seeding ${categories.length} categories…`);

  let upserted = 0;

  for (const cat of categories) {
    await prisma.mealCategory.upsert({
      where: { externalId: cat.externalId },
      create: {
        externalId: cat.externalId,
        name: cat.name,
        imageUrl: cat.imageUrl,
        description: cat.description,
      },
      update: {
        name: cat.name,
        imageUrl: cat.imageUrl,
        description: cat.description,
      },
    } as never);
    upserted++;
  }

  logger.info(`✅ MealCategory: ${upserted} rows upserted`);
};

const seedAreas = async (areas: MealAreaSeedRow[]): Promise<void> => {
  logger.info(`🌍  Seeding ${areas.length} areas…`);

  let upserted = 0;

  for (const area of areas) {
    await prisma.mealArea.upsert({
      where: { externalId: area.externalId },
      create: { externalId: area.externalId, name: area.name, flag: area.flag },
      update: { name: area.name },
    } as never);
    upserted++;
  }

  logger.info(`✅ MealArea: ${upserted} rows upserted`);
};

const seedIngredients = async (
  ingredients: IngredientCatalogSeedRow[],
): Promise<void> => {
  logger.info(`🥕  Seeding ${ingredients.length} ingredients…`);

  let upserted = 0;
  let errors = 0;

  for (const ing of ingredients) {
    try {
      await prisma.ingredientCatalog.upsert({
        where: { normalizedName: ing.normalizedName },
        create: {
          externalId: ing.externalId,
          name: ing.name,
          normalizedName: ing.normalizedName,
          description: ing.description,
          imageUrl: ing.imageUrl,
          category: ing.category,
        },
        update: {
          // On re-runs: update TheMealDB fields but NOT category —
          // category may have been manually corrected after the first seed.
          name: ing.name,
          description: ing.description,
          imageUrl: ing.imageUrl,
        },
      } as never);
      upserted++;
    } catch (err) {
      errors++;
      logger.error(
        { err, normalizedName: ing.normalizedName },
        `❌ Failed to upsert ingredient`,
      );
    }
  }

  if (errors > 0) {
    logger.warn(`⚠️  ${errors} ingredients failed — check errors above`);
  }
  logger.info(`✅ IngredientCatalog: ${upserted} rows upserted`);
};

// ─── Report ──────────────────────────────────────────────────────────────────

const logReport = async (): Promise<void> => {
  const [categoryCount, areaCount, ingredientCount] = await Promise.all([
    prisma.mealCategory.count(),
    prisma.mealArea.count(),
    prisma.ingredientCatalog.count(),
  ]);

  const categoryDist = await prisma.ingredientCatalog.groupBy({
    by: ['category'],
    _count: { category: true },
    orderBy: { _count: { category: 'desc' } },
  } as never);

  logger.info(
    {
      mealCategory: categoryCount,
      mealArea: areaCount,
      ingredientCatalog: ingredientCount,
      distribution: Object.fromEntries(
        (
          categoryDist as Array<{
            category: string | null;
            _count: { category: number };
          }>
        ).map((r) => [r.category ?? 'null', r._count.category]),
      ),
    },
    '📊 Database state after Phase 1',
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export const runSeedCatalog = async (): Promise<void> => {
  const INPUT_PATH = path.resolve(
    __dirname,
    '../../libs/prisma/client/seed-data/catalog.json',
  );

  if (!fs.existsSync(INPUT_PATH)) {
    throw new Error(
      `catalog.json not found at ${INPUT_PATH}\nRun fetch-catalog first.`,
    );
  }

  const snapshot = JSON.parse(
    fs.readFileSync(INPUT_PATH, 'utf-8'),
  ) as CatalogSnapshot;

  logger.info(
    {
      fetchedAt: snapshot.fetchedAt,
      cleanedAt: snapshot.cleanedAt,
      source: snapshot.source,
    },
    '🚀 seed-catalog — Phase 1: Seed Database',
  );

  await seedCategories(snapshot.categories);
  await seedAreas(snapshot.areas);
  await seedIngredients(snapshot.ingredients);

  await logReport();

  logger.info('🎉 Phase 1 complete. Ready for Phase 2 (seed-recipes).');
};
