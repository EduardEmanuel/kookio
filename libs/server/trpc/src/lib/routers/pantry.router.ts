import z from 'zod';

import {
  IngredientSearchResultSchema,
  MeasureUnitSchema,
  PantryItemWithIngredientSchema,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

import { router, TRPCError } from '../trpc';
import { onboardedProcedure, protectedProcedure } from '../middlewares/auth';

const log = createLogger('trpc', { router: 'pantry' });

const SEARCH_DEFAULT_LIMIT = 20;
const SEARCH_MAX_LIMIT = 50;

const AddInputSchema = z.object({
  ingredientCatalogId: z.string().uuid(),
  quantity: z.number().positive(),
  unit: MeasureUnitSchema,
  expiresAt: z.string().datetime().nullable().optional(),
});

const UpdateInputSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().positive().optional(),
  unit: MeasureUnitSchema.optional(),
  expiresAt: z.string().datetime().nullable().optional(),
});

const RemoveInputSchema = z.object({
  id: z.string().uuid(),
});

const SearchIngredientsInputSchema = z.object({
  query: z.string().min(1).max(100),
  limit: z
    .number()
    .int()
    .min(1)
    .max(SEARCH_MAX_LIMIT)
    .default(SEARCH_DEFAULT_LIMIT),
});

const PANTRY_ITEM_INCLUDE = {
  ingredient: {
    select: {
      id: true,
      name: true,
      imageUrl: true,
      category: true,
    },
  },
} as const;

// Prisma error code for unique constraint violation. The pantry has a
// `@@unique([userId, ingredientCatalogId])`, so a duplicate add hits this.
const PRISMA_UNIQUE_VIOLATION = 'P2002';

const isUniqueViolation = (err: unknown): boolean =>
  typeof err === 'object' &&
  err !== null &&
  (err as { code?: unknown }).code === PRISMA_UNIQUE_VIOLATION;

export const pantry = router({
  /**
   * Onboarded — list all pantry items for the current user.
   * Sorted by `expiresAt asc` (Postgres/CockroachDB places NULLs last on ASC,
   * so items with an expiry date surface first), then `addedAt desc`.
   */
  list: onboardedProcedure
    .output(z.array(PantryItemWithIngredientSchema))
    .query(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        return await ctx.prisma.pantryItem.findMany({
          where: { userId },
          include: PANTRY_ITEM_INCLUDE,
          orderBy: [{ expiresAt: 'asc' }, { addedAt: 'desc' }],
        });
      } catch (err) {
        log.error({ err, userId }, 'pantry.list failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load pantry',
          cause: err,
        });
      }
    }),

  /**
   * Onboarded — add an ingredient to the user's pantry.
   * Throws CONFLICT if the ingredient is already present (schema enforces
   * `@@unique([userId, ingredientCatalogId])`); the client should call
   * `update` instead. Throws NOT_FOUND if the catalog id does not resolve.
   */
  add: onboardedProcedure
    .input(AddInputSchema)
    .output(PantryItemWithIngredientSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      const ingredient = await ctx.prisma.ingredientCatalog.findUnique({
        where: { id: input.ingredientCatalogId },
        select: { id: true },
      });
      if (!ingredient) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Ingredient not found',
        });
      }

      try {
        return await ctx.prisma.pantryItem.create({
          data: {
            userId,
            ingredientCatalogId: input.ingredientCatalogId,
            quantity: input.quantity,
            unit: input.unit,
            expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
          },
          include: PANTRY_ITEM_INCLUDE,
        });
      } catch (err) {
        if (isUniqueViolation(err)) {
          throw new TRPCError({
            code: 'CONFLICT',
            message:
              'This ingredient is already in your pantry — update or remove the existing entry.',
            cause: err,
          });
        }
        log.error({ err, userId }, 'pantry.add failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to add pantry item',
          cause: err,
        });
      }
    }),

  /**
   * Onboarded — partial update of a pantry item the caller owns.
   * Ownership is enforced by the `userId` filter on `findFirst`; an item
   * that belongs to another user surfaces as NOT_FOUND (no existence leak).
   */
  update: onboardedProcedure
    .input(UpdateInputSchema)
    .output(PantryItemWithIngredientSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      const existing = await ctx.prisma.pantryItem.findFirst({
        where: { id: input.id, userId },
        select: { id: true },
      });
      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Pantry item not found',
        });
      }

      try {
        return await ctx.prisma.pantryItem.update({
          where: { id: input.id },
          data: {
            ...(input.quantity !== undefined && { quantity: input.quantity }),
            ...(input.unit !== undefined && { unit: input.unit }),
            ...(input.expiresAt !== undefined && {
              expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
            }),
          },
          include: PANTRY_ITEM_INCLUDE,
        });
      } catch (err) {
        log.error({ err, userId, id: input.id }, 'pantry.update failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update pantry item',
          cause: err,
        });
      }
    }),

  /**
   * Onboarded — delete a pantry item the caller owns.
   * Atomic ownership check: `deleteMany` with both `id` and `userId` deletes
   * 0 rows when the item is not the caller's, which we surface as NOT_FOUND.
   */
  remove: onboardedProcedure
    .input(RemoveInputSchema)
    .output(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      try {
        const result = await ctx.prisma.pantryItem.deleteMany({
          where: { id: input.id, userId },
        });
        if (result.count === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Pantry item not found',
          });
        }
        return { id: input.id };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        log.error({ err, userId, id: input.id }, 'pantry.remove failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to remove pantry item',
          cause: err,
        });
      }
    }),

  // TODO(post-w4): move to a dedicated `ingredients.router` when recipe
  // creation or ingredient detail pages also need to consume this.
  /**
   * Protected — search the ingredient catalog by normalized name.
   * Does not require completed onboarding so that the onboarding pantry step
   * can also use it.
   */
  searchIngredients: protectedProcedure
    .input(SearchIngredientsInputSchema)
    .output(z.array(IngredientSearchResultSchema))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.ingredientCatalog.findMany({
          where: {
            normalizedName: {
              contains: input.query.toLowerCase().trim(),
              mode: 'insensitive',
            },
          },
          take: input.limit,
          orderBy: { name: 'asc' },
          select: {
            id: true,
            name: true,
            imageUrl: true,
            category: true,
          },
        });
      } catch (err) {
        log.error(
          { err, query: input.query },
          'pantry.searchIngredients failed',
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to search ingredients',
          cause: err,
        });
      }
    }),
});
