import {
  type RecipeMatchInfo,
  type RecipeMatchPage,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';
import { type RecipeMatchLevel } from '@kookio/shared-utility/recipe-match-level';

import type { Context } from '../../context';
import {
  enrichWithMatchInfo,
  passesLevel,
  type PantryMap,
  type ScannedRecipe,
} from './recipes.match.helpers';

const log = createLogger('trpc', { router: 'recipes', proc: 'match' });

const DEFAULT_BATCH_SIZE = Number(process.env['RECIPE_MATCH_BATCH_SIZE']) || 50;
const DEFAULT_EXAMINED_BUDGET =
  Number(process.env['RECIPE_MATCH_EXAMINED_BUDGET']) || 1500;

/**
 * Selection used by both Alright/Almost (loop) and All (single fetch) paths. Keeping a
 * single shape here means the output mapper at the bottom of each function is
 * identical and the row→ScannedRecipe cast is sound.
 */
const RECIPE_MATCH_SELECT = {
  id: true,
  slug: true,
  title: true,
  imageUrl: true,
  prepTimeMinutes: true,
  cookTimeMinutes: true,
  servings: true,
  difficulty: true,
  category: { select: { id: true, name: true, emoji: true } },
  area: { select: { id: true, name: true, flag: true } },
  ingredients: {
    select: {
      unit: true,
      ingredient: { select: { id: true, name: true } },
    },
  },
} as const;

type Prisma = Context['prisma'];

type EnrichedMatch = { recipe: ScannedRecipe; matchInfo: RecipeMatchInfo };

const toItem = ({ recipe, matchInfo }: EnrichedMatch) => ({
  id: recipe.id,
  slug: recipe.slug,
  title: recipe.title,
  imageUrl: recipe.imageUrl,
  prepTimeMinutes: recipe.prepTimeMinutes,
  cookTimeMinutes: recipe.cookTimeMinutes,
  servings: recipe.servings,
  difficulty: recipe.difficulty,
  category: recipe.category,
  area: recipe.area,
  matchInfo,
});

export type ScanInput = {
  level: Exclude<RecipeMatchLevel, 'All'>;
  cursor?: string;
  limit: number;
};

export type ScanOpts = {
  prisma: Prisma;
  pantryMap: PantryMap;
  userId: string;
  input: ScanInput;
  batchSize?: number;
  examinedBudget?: number;
};

/**
 * Loop-based pager for levels Alright and Almost. Fetches recipes in batches, filters
 * each batch by the level rule, accumulates matches until either the page is
 * full, the DB is exhausted, or the safety budget is reached. The three exit
 * conditions map to three cursor strategies — see comments at each branch.
 */
export const scanForMatches = async ({
  prisma,
  pantryMap,
  userId,
  input,
  batchSize = DEFAULT_BATCH_SIZE,
  examinedBudget = DEFAULT_EXAMINED_BUDGET,
}: ScanOpts): Promise<RecipeMatchPage> => {
  const matched: EnrichedMatch[] = [];
  let lastExaminedId: string | undefined = input.cursor;
  let examinedCount = 0;
  let dbExhausted = false;

  while (
    matched.length < input.limit &&
    examinedCount < examinedBudget &&
    !dbExhausted
  ) {
    const batch = (await prisma.recipe.findMany({
      where: { status: 'PUBLIC' },
      select: RECIPE_MATCH_SELECT,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: batchSize,
      ...(lastExaminedId ? { cursor: { id: lastExaminedId }, skip: 1 } : {}),
    })) as unknown as ScannedRecipe[];

    if (batch.length === 0) {
      dbExhausted = true;
      break;
    }

    for (const recipe of batch) {
      examinedCount += 1;
      const enriched = enrichWithMatchInfo(recipe, pantryMap);
      if (passesLevel(enriched.matchInfo, input.level)) {
        matched.push(enriched);
        if (matched.length >= input.limit) break;
      }
    }

    lastExaminedId = batch[batch.length - 1].id;
    if (batch.length < batchSize) {
      dbExhausted = true;
    }
  }

  const capped = matched.slice(0, input.limit);
  const items = capped.map(toItem);

  let nextCursor: string | null = null;
  let partialScan = false;

  if (matched.length >= input.limit) {
    // Page full. Cursor on the last matched id; items in the current batch
    // that sit after this id were not yet examined (we broke the inner loop
    // early) — they will be re-fetched and examined on the next call.
    nextCursor = items[items.length - 1]?.id ?? null;
  } else if (examinedCount >= examinedBudget && !dbExhausted) {
    // Budget reached before page filled. Cursor on the last examined id so
    // the next call resumes the scan instead of restarting it. partialScan
    // tells the client to auto-continue without waiting for user action.
    nextCursor = lastExaminedId ?? null;
    partialScan = true;
    log.warn(
      {
        userId,
        level: input.level,
        examinedCount,
        matched: matched.length,
        limit: input.limit,
      },
      'Recipe match scan hit examined budget',
    );
  }
  // else: dbExhausted with output < limit → nextCursor stays null.

  return { items, nextCursor, partialScan };
};

export type FetchAllOpts = {
  prisma: Prisma;
  pantryMap: PantryMap;
  input: { cursor?: string; limit: number };
};

/**
 * Single-query pager for level All. Identical shape to scanForMatches output,
 * but skips the loop machinery: filter is identity at level All, so a one-shot
 * cursor query with `take: limit + 1` is equivalent and cheaper.
 */
export const fetchAllRecipesPage = async ({
  prisma,
  pantryMap,
  input,
}: FetchAllOpts): Promise<RecipeMatchPage> => {
  const rows = (await prisma.recipe.findMany({
    where: { status: 'PUBLIC' },
    select: RECIPE_MATCH_SELECT,
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: input.limit + 1,
    ...(input.cursor ? { cursor: { id: input.cursor }, skip: 1 } : {}),
  })) as unknown as ScannedRecipe[];

  const hasMore = rows.length > input.limit;
  const slice = hasMore ? rows.slice(0, input.limit) : rows;
  const items = slice.map((recipe) =>
    toItem(enrichWithMatchInfo(recipe, pantryMap)),
  );

  return {
    items,
    nextCursor: hasMore ? (items[items.length - 1]?.id ?? null) : null,
    partialScan: false,
  };
};
