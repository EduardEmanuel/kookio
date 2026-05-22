import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

import { prisma } from '@kookio/prisma-client/server';
import type {
  IngredientCatalogLookupRow,
  RecipeIngredientSeedRow,
  RecipeSeedRow,
  RecipeStepSeedRow,
  RecipeTagSeedRow,
} from '@kookio/prisma-client';

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

// ─── Extra ingredient name aliases ────────────────────────────────────────────

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

  const [categories, areas, ingredients] = await Promise.all([
    prisma.mealCategory.findMany({ select: { id: true, externalId: true } }),
    prisma.mealArea.findMany({ select: { id: true, externalId: true } }),
    prisma.ingredientCatalog.findMany({
      select: { id: true, normalizedName: true },
    }),
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
  let upsertedSteps = 0;
  let removedOrphanSteps = 0;
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

      const upsertedRecipe = await prisma.recipe.upsert({
        where: { externalId: recipe.externalId },
        create: {
          externalId: recipe.externalId,
          slug: recipe.slug,
          title: recipe.title,
          imageUrl: recipe.imageUrl,
          videoUrl: recipe.videoUrl,
          sourceUrl: recipe.sourceUrl,
          status: 'PUBLIC',
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          categoryId,
          areaId,
          authorId: null,
        },
        update: {
          title: recipe.title,
          imageUrl: recipe.imageUrl,
          videoUrl: recipe.videoUrl,
          sourceUrl: recipe.sourceUrl,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
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

        await prisma.recipeIngredient.upsert({
          where: {
            recipeId_ingredientCatalogId: {
              recipeId: (upsertedRecipe as { id: string }).id,
              ingredientCatalogId,
            },
          },
          create: {
            recipeId: (upsertedRecipe as { id: string }).id,
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
        await prisma.recipeTag.upsert({
          where: {
            recipeId_tag: {
              recipeId: (upsertedRecipe as { id: string }).id,
              tag,
            },
          },
          create: { recipeId: (upsertedRecipe as { id: string }).id, tag },
          update: {},
        } as never);
        upsertedTags++;
      }

      // RecipeStep: upsert keyed on (recipeId, order) via the @@unique
      // constraint, then drop any steps left over from a previous seed
      // run with a higher step count for this recipe.
      const recipeId = (upsertedRecipe as { id: string }).id;
      for (const step of recipe.steps as RecipeStepSeedRow[]) {
        await prisma.recipeStep.upsert({
          where: {
            recipeId_order: { recipeId, order: step.order },
          },
          create: {
            recipeId,
            order: step.order,
            title: step.title,
            content: step.content,
          },
          update: {
            title: step.title,
            content: step.content,
          },
        } as never);
        upsertedSteps++;
      }
      const orphans = await prisma.recipeStep.deleteMany({
        where: { recipeId, order: { gt: recipe.steps.length } },
      });
      removedOrphanSteps += orphans.count;
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
      stepsUpserted: upsertedSteps,
      orphanStepsRemoved: removedOrphanSteps,
    },
    '📊 Seed results',
  );
};

// ─── Report ───────────────────────────────────────────────────────────────────

const logReport = async (): Promise<void> => {
  const [recipeCount, ingredientCount, tagCount] = await Promise.all([
    prisma.recipe.count(),
    prisma.recipeIngredient.count(),
    prisma.recipeTag.count(),
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
