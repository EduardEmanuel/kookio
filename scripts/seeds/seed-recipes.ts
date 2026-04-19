import * as fs from 'node:fs';
import * as path from 'node:path';

import type { IngredientCatalogLookupRow } from '@kookio/prisma-client/dtos/ingredient-catalog';
import type { RecipeIngredientSeedRow } from '@kookio/prisma-client/dtos/recipe-ingredient';
import type { RecipeSeedRow } from '@kookio/prisma-client/dtos/recipe';
import type { RecipeTagSeedRow } from '@kookio/prisma-client/dtos/recipe-tag';
import { PrismaIngredientCatalogRepository } from '@kookio/prisma-client/lib/repositories/ingredient-catalog/ingredient-catalog.repository';
import { PrismaMealAreaRepository } from '@kookio/prisma-client/lib/repositories/meal-area/meal-area.repository';
import { PrismaMealCategoryRepository } from '@kookio/prisma-client/lib/repositories/meal-category/meal-category.repository';
import { PrismaRecipeIngredientRepository } from '@kookio/prisma-client/lib/repositories/recipe-ingredient/recipe-ingredient.repository';
import { PrismaRecipeTagRepository } from '@kookio/prisma-client/lib/repositories/recipe-tag/recipe-tag.repository';
import { PrismaRecipeRepository } from '@kookio/prisma-client/lib/repositories/recipe/recipe.repository';

import { logger } from './seed-helpers';

// ─── Types (snapshot shape from recipes.json) ────────────────────────────────

interface RecipesSnapshot {
  fetchedAt: string;
  source: string;
  totalFetched: number;
  recipes: RecipeSeedRow[];
}

interface MergeCandidate {
  plural: string;
  singular: string;
  approve: boolean | null;
}

// ─── Repositories ─────────────────────────────────────────────────────────────

const ingredientCatalogRepo = new PrismaIngredientCatalogRepository();
const mealAreaRepo = new PrismaMealAreaRepository();
const mealCategoryRepo = new PrismaMealCategoryRepository();
const recipeIngredientRepo = new PrismaRecipeIngredientRepository();
const recipeTagRepo = new PrismaRecipeTagRepository();
const recipeRepo = new PrismaRecipeRepository();

// ─── Resolution maps ──────────────────────────────────────────────────────────

/**
 * Extra ingredient name aliases not covered by merge-candidates.json.
 * Maps normalizedName variants found in recipes → normalizedName in catalog.
 */
const EXTRA_INGREDIENT_ALIASES: Record<string, string> = {
  gruyere_cheese: 'gruyere', // catalog has short name; some recipes use full name
};

const buildIngredientAliasMap = (
  mergeCandidatesPath: string,
): Map<string, string> => {
  const aliasMap = new Map<string, string>();

  const { candidates } = JSON.parse(
    fs.readFileSync(mergeCandidatesPath, 'utf-8'),
  ) as { candidates: MergeCandidate[] };

  for (const c of candidates) {
    if (c.approve === true) {
      aliasMap.set(c.plural, c.singular);
    }
  }

  for (const [from, to] of Object.entries(EXTRA_INGREDIENT_ALIASES)) {
    aliasMap.set(from, to);
  }

  return aliasMap;
};

const resolveIngredientName = (
  name: string,
  aliasMap: Map<string, string>,
): string => aliasMap.get(name) ?? name;

// ─── Seed function ────────────────────────────────────────────────────────────

const seedRecipes = async (
  recipes: RecipeSeedRow[],
  aliasMap: Map<string, string>,
): Promise<void> => {
  logger.info('📦 Loading catalog lookups from DB...');

  const [{ data: categories }, { data: areas }, { data: ingredients }] =
    await Promise.all([
      mealCategoryRepo.findMany({
        select: { id: true, externalId: true },
      } as never),
      mealAreaRepo.findMany({
        select: { id: true, externalId: true },
      } as never),
      ingredientCatalogRepo.findMany({
        select: { id: true, normalizedName: true },
      } as never),
    ]);

  const categoryMap = new Map(
    (categories as Array<{ id: string; externalId: string | null }>).map(
      (c) => [c.externalId, c.id],
    ),
  );
  const areaMap = new Map(
    (areas as Array<{ id: string; externalId: string | null }>).map((a) => [
      a.externalId,
      a.id,
    ]),
  );
  const ingredientMap = new Map(
    (ingredients as IngredientCatalogLookupRow[]).map((i) => [
      i.normalizedName,
      i.id,
    ]),
  );

  logger.info(
    {
      mealCategory: categoryMap.size,
      mealArea: areaMap.size,
      ingredientCatalog: ingredientMap.size,
    },
    'Catalog lookups loaded',
  );

  logger.info(`🍲 Seeding ${recipes.length} recipes...`);

  let upsertedRecipes = 0;
  let skippedRecipes = 0;
  let upsertedIngredients = 0;
  let skippedIngredients = 0;
  let upsertedTags = 0;
  const missingIngredients = new Set<string>();

  for (const recipe of recipes) {
    try {
      const categoryId = recipe.categoryExternalId
        ? (categoryMap.get(recipe.categoryExternalId) ?? null)
        : null;

      const areaId = recipe.areaExternalId
        ? (areaMap.get(recipe.areaExternalId) ?? null)
        : null;

      if (recipe.categoryExternalId && !categoryId) {
        logger.warn(
          {
            title: recipe.title,
            categoryExternalId: recipe.categoryExternalId,
          },
          'Unknown category — skipping FK',
        );
      }

      if (recipe.areaExternalId && !areaId) {
        logger.warn(
          { title: recipe.title, areaExternalId: recipe.areaExternalId },
          'Unknown area — skipping FK',
        );
      }

      const upsertedRecipe = await recipeRepo.upsert({
        where: { externalId: recipe.externalId },
        create: {
          externalId: recipe.externalId,
          slug: recipe.slug,
          title: recipe.title,
          imageUrl: recipe.imageUrl,
          youtubeUrl: recipe.youtubeUrl,
          sourceUrl: recipe.sourceUrl,
          instructions: recipe.instructions,
          status: 'PUBLIC',
          servings: 4,
          categoryId,
          areaId,
          authorId: null,
        },
        update: {
          title: recipe.title,
          imageUrl: recipe.imageUrl,
          youtubeUrl: recipe.youtubeUrl,
          sourceUrl: recipe.sourceUrl,
          instructions: recipe.instructions,
          categoryId,
          areaId,
        },
      } as never);

      upsertedRecipes++;

      for (const ing of recipe.ingredients as RecipeIngredientSeedRow[]) {
        const resolvedName = resolveIngredientName(
          ing.ingredientNormalizedName,
          aliasMap,
        );
        const ingredientCatalogId = ingredientMap.get(resolvedName) ?? null;

        if (!ingredientCatalogId) {
          missingIngredients.add(ing.ingredientNormalizedName);
          skippedIngredients++;
          continue;
        }

        await recipeIngredientRepo.upsert({
          where: {
            recipeId_ingredientCatalogId: {
              recipeId: upsertedRecipe.id,
              ingredientCatalogId,
            },
          },
          create: {
            recipeId: upsertedRecipe.id,
            ingredientCatalogId,
            quantity: ing.quantity,
            unit: ing.unit,
            notes: ing.notes,
          },
          update: {
            quantity: ing.quantity,
            unit: ing.unit,
            notes: ing.notes,
          },
        } as never);

        upsertedIngredients++;
      }

      for (const { tag } of recipe.tags as RecipeTagSeedRow[]) {
        await recipeTagRepo.upsert({
          where: { recipeId_tag: { recipeId: upsertedRecipe.id, tag } },
          create: { recipeId: upsertedRecipe.id, tag },
          update: {},
        } as never);
        upsertedTags++;
      }
    } catch (err) {
      logger.error({ err, title: recipe.title }, '❌ Failed to upsert recipe');
      skippedRecipes++;
    }
  }

  if (missingIngredients.size > 0) {
    logger.warn(
      {
        count: missingIngredients.size,
        skippedRefs: skippedIngredients,
        names: [...missingIngredients].sort(),
      },
      '⚠️  Some ingredient names had no catalog match',
    );
  }

  logger.info(
    {
      recipesUpserted: upsertedRecipes,
      recipesFailed: skippedRecipes,
      ingredientsUpserted: upsertedIngredients,
      ingredientsSkipped: skippedIngredients,
      tagsUpserted: upsertedTags,
    },
    '📊 Seed results',
  );
};

// ─── Report ───────────────────────────────────────────────────────────────────

const logReport = async (): Promise<void> => {
  const [recipeCount, ingredientCount, tagCount] = await Promise.all([
    recipeRepo.count({}),
    recipeIngredientRepo.count({}),
    recipeTagRepo.count({}),
  ]);

  logger.info(
    {
      recipe: recipeCount,
      recipeIngredient: ingredientCount,
      recipeTag: tagCount,
    },
    '📊 Database state after Phase 2',
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export const runSeedRecipes = async (): Promise<void> => {
  const INPUT_PATH = path.resolve(
    __dirname,
    '../../libs/prisma/client/seed-data/recipes.json',
  );
  const MERGE_CANDIDATES_PATH = path.resolve(
    __dirname,
    '../../libs/prisma/client/seed-data/merge-candidates.json',
  );

  if (!fs.existsSync(INPUT_PATH)) {
    throw new Error(
      `recipes.json not found at ${INPUT_PATH}\nRun fetch-recipes first.`,
    );
  }

  const snapshot = JSON.parse(
    fs.readFileSync(INPUT_PATH, 'utf-8'),
  ) as RecipesSnapshot;

  logger.info(
    {
      fetchedAt: snapshot.fetchedAt,
      source: snapshot.source,
      total: snapshot.totalFetched,
    },
    '🚀 seed-recipes — Phase 2b: Seed Database',
  );

  const aliasMap = buildIngredientAliasMap(MERGE_CANDIDATES_PATH);
  logger.info({ entries: aliasMap.size }, '🗺️  Alias map loaded');

  await seedRecipes(snapshot.recipes, aliasMap);
  await logReport();

  logger.info('🎉 Phase 2 complete.');
};
