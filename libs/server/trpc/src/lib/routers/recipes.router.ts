import z from 'zod';

import {
  RecipeDetailSchema,
  RecipeFeedPageSchema,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

import { procedure, router, TRPCError } from '../trpc';

const log = createLogger('trpc', { router: 'recipes' });

const FEED_DEFAULT_LIMIT = 20;
const FEED_MAX_LIMIT = 50;

const FeedInputSchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(FEED_MAX_LIMIT)
    .default(FEED_DEFAULT_LIMIT),
  // Reserved for future filters (week 5). Kept in the contract so adding them
  // later does not break the client signature.
  categoryId: z.string().uuid().optional(),
  areaId: z.string().uuid().optional(),
});

const ByIdInputSchema = z.object({
  id: z.string().uuid(),
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
});
