import z from 'zod';

import {
  RecipeDetailSchema,
  RecipeFeedPageSchema,
  RecipeMatchLevelSchema,
  RecipeMatchPageSchema,
  UuidIdSchema,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

import { onboardedProcedure } from '../../middlewares/auth';
import { procedure, router, TRPCError } from '../../trpc';
import { fetchAllRecipesPage, scanForMatches } from './recipes.match';
import { buildPantryMap } from './recipes.match.helpers';

const log = createLogger('trpc', { router: 'recipes' });

const FEED_DEFAULT_LIMIT = 20;
const FEED_MAX_LIMIT = 50;

const MATCH_DEFAULT_LIMIT = 20;
const MATCH_MAX_LIMIT = 50;

const MatchInputSchema = z.object({
  level: RecipeMatchLevelSchema,
  cursor: UuidIdSchema.optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(MATCH_MAX_LIMIT)
    .default(MATCH_DEFAULT_LIMIT),
});

const FeedInputSchema = z.object({
  cursor: UuidIdSchema.optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(FEED_MAX_LIMIT)
    .default(FEED_DEFAULT_LIMIT),
  // Reserved for future filters (week 5). Kept in the contract so adding them
  // later does not break the client signature.
  categoryId: UuidIdSchema.optional(),
  areaId: UuidIdSchema.optional(),
});

const ByIdInputSchema = z.object({
  id: UuidIdSchema,
});

const FEED_RECIPE_SELECT = {
  id: true,
  slug: true,
  title: true,
  imageUrl: true,
  prepTimeMinutes: true,
  cookTimeMinutes: true,
  servings: true,
  category: { select: { id: true, name: true, emoji: true } },
  area: { select: { id: true, name: true, flag: true } },
} as const;

const DETAIL_RECIPE_INCLUDE = {
  category: { select: { id: true, name: true, emoji: true } },
  area: { select: { id: true, name: true, flag: true } },
  ingredients: {
    select: {
      id: true,
      quantity: true,
      unit: true,
      notes: true,
      ingredient: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          category: true,
        },
      },
    },
    orderBy: { id: 'asc' },
  },
  tags: { select: { tag: true } },
} as const;

export const recipes = router({
  /**
   * Public — cursor-paginated feed of PUBLIC recipes.
   * Returns up to `limit` items plus a `nextCursor` (null when exhausted).
   */
  feed: procedure
    .input(FeedInputSchema)
    .output(RecipeFeedPageSchema)
    .query(async ({ ctx, input }) => {
      try {
        const items = await ctx.prisma.recipe.findMany({
          where: {
            status: 'PUBLIC',
            ...(input.categoryId ? { categoryId: input.categoryId } : {}),
            ...(input.areaId ? { areaId: input.areaId } : {}),
          },
          take: input.limit + 1,
          ...(input.cursor ? { cursor: { id: input.cursor }, skip: 1 } : {}),
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          select: FEED_RECIPE_SELECT,
        });

        const hasMore = items.length > input.limit;
        const slice = hasMore ? items.slice(0, input.limit) : items;
        const nextCursor = hasMore
          ? (slice[slice.length - 1]?.id ?? null)
          : null;

        return { items: slice, nextCursor };
      } catch (err) {
        log.error({ err, input }, 'recipes.feed failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load recipes feed',
          cause: err,
        });
      }
    }),

  /**
   * Public — full detail of a single PUBLIC recipe.
   * NOT_FOUND is returned both for missing rows and for PRIVATE recipes,
   * to avoid leaking the existence of private records.
   */
  byId: procedure
    .input(ByIdInputSchema)
    .output(RecipeDetailSchema)
    .query(async ({ ctx, input }) => {
      let recipe;
      try {
        recipe = await ctx.prisma.recipe.findFirst({
          where: { id: input.id, status: 'PUBLIC' },
          include: DETAIL_RECIPE_INCLUDE,
        });
      } catch (err) {
        log.error({ err, id: input.id }, 'recipes.byId failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load recipe',
          cause: err,
        });
      }

      if (!recipe) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Recipe not found',
        });
      }

      return recipe;
    }),

  /**
   * Onboarded — progressive A/B/C match against the caller's pantry.
   *  - A: every non-staple ingredient is already in the pantry.
   *  - B: 1 to 3 ingredients are missing — the "almost there" bucket.
   *  - C: every PUBLIC recipe, identical pagination shape to feed but with
   *       enriched matchInfo for the UI.
   *
   * Levels A and B use a budgeted scan (`scanForMatches`) because the level
   * filter is post-DB; level C bypasses the loop and runs a single query for
   * efficiency. See `recipes.match.ts` for cursor + budget semantics.
   */
  match: onboardedProcedure
    .input(MatchInputSchema)
    .output(RecipeMatchPageSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      try {
        const pantryRows = await ctx.prisma.pantryItem.findMany({
          where: { userId },
          select: { ingredientCatalogId: true, quantity: true, unit: true },
        });
        const pantryMap = buildPantryMap(pantryRows);

        if (input.level === 'C') {
          return await fetchAllRecipesPage({
            prisma: ctx.prisma,
            pantryMap,
            input: { cursor: input.cursor, limit: input.limit },
          });
        }

        return await scanForMatches({
          prisma: ctx.prisma,
          pantryMap,
          userId,
          input: {
            level: input.level,
            cursor: input.cursor,
            limit: input.limit,
          },
        });
      } catch (err) {
        log.error({ err, userId, input }, 'recipes.match failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to match recipes against pantry',
          cause: err,
        });
      }
    }),
});
