import z from 'zod';

import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  UuidIdSchema,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

import { onboardedProcedure } from '../middlewares/auth';
import { router, TRPCError } from '../trpc';
import type { Context } from '../context';
import { deriveGroceries, type DerivedGroceryRow } from './groceries.helpers';

const log = createLogger('trpc', { router: 'groceries' });

const GroceryItemSchema = z.object({
  ingredientCatalogId: UuidIdSchema,
  ingredientName: z.string(),
  ingredientImageUrl: z.string().nullable(),
  category: IngredientCategorySchema.nullable(),
  totalQuantity: z.number().nullable(),
  unit: MeasureUnitSchema.nullable(),
  isBought: z.boolean(),
});

const GroceriesStatsOutputSchema = z.object({
  total: z.number().int().nonnegative(),
  remaining: z.number().int().nonnegative(),
});

const ToggleBoughtInputSchema = z.object({
  ingredientCatalogId: UuidIdSchema,
  intendedState: z.boolean(),
});

const ToggleBoughtOutputSchema = z.object({
  isBought: z.boolean(),
  /**
   * False when the bought-state mutation could not be persisted (Redis
   * unavailable, etc.). Client keeps its local optimistic flip and shows a
   * one-time snackbar in that case.
   */
  persisted: z.boolean(),
  total: z.number().int().nonnegative(),
  remaining: z.number().int().nonnegative(),
});

const RECIPE_INGREDIENT_SELECT = {
  id: true,
  servings: true,
  ingredients: {
    select: {
      quantity: true,
      unit: true,
      ingredient: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          category: true,
        },
      },
    },
  },
} as const;

/**
 * Fetch slots, pantry, and the recipes referenced by those slots in the
 * fewest round-trips possible, then run the pure derivation. Shared by
 * `list` and `stats` to keep the algorithm in one place.
 */
const loadDerivedRows = async (
  ctx: Context,
  userId: string,
): Promise<DerivedGroceryRow[]> => {
  const [slots, pantryRows] = await Promise.all([
    ctx.prisma.mealSlot.findMany({
      where: { userId, recipeId: { not: null } },
      select: { recipeId: true, servings: true },
    }),
    ctx.prisma.pantryItem.findMany({
      where: { userId },
      select: { ingredientCatalogId: true },
    }),
  ]);

  const recipeIds = Array.from(
    new Set(
      slots.map((s) => s.recipeId).filter((id): id is string => id !== null),
    ),
  );

  const recipes = recipeIds.length
    ? await ctx.prisma.recipe.findMany({
        where: { id: { in: recipeIds } },
        select: RECIPE_INGREDIENT_SELECT,
      })
    : [];

  const pantryIds = new Set(pantryRows.map((p) => p.ingredientCatalogId));
  return deriveGroceries(slots, recipes, pantryIds);
};

/**
 * Bought-state is a soft preference — a Redis blip should not break the
 * grocery list itself. Read failures degrade to "nothing checked"; the user
 * can re-tick what they had, and the next successful read restores state.
 */
const safeReadBought = async (
  ctx: Context,
  userId: string,
): Promise<readonly string[]> => {
  try {
    return await ctx.groceriesBought.get(userId);
  } catch (err) {
    log.error(
      { err, userId },
      'groceries: bought-state read failed, falling back to empty set',
    );
    return [];
  }
};

export const groceries = router({
  /**
   * Onboarded — derive the user's grocery list from `meal plan minus pantry`.
   *
   * The list is recomputed on every call (no persisted rows). Bought-state
   * lives in Redis and survives across devices for the TTL window so a user
   * can start ticking at home and finish at the supermarket on their phone.
   *
   * Returns a flat array; the client groups by `category` for display.
   */
  list: onboardedProcedure
    .output(z.array(GroceryItemSchema))
    .query(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        const [derived, boughtIds] = await Promise.all([
          loadDerivedRows(ctx, userId),
          safeReadBought(ctx, userId),
        ]);

        const boughtSet = new Set(boughtIds);
        return derived.map((row) => ({
          ...row,
          isBought: boughtSet.has(row.ingredientCatalogId),
        }));
      } catch (err) {
        log.error({ err, userId }, 'groceries.list failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load groceries',
          cause: err,
        });
      }
    }),

  /**
   * Onboarded — minimal counts for the dashboard widget. Re-derives the full
   * list (bounded cost: ≤ ~210 expansions for 21 slots × 10 ingredients) but
   * returns only the two integers the widget needs, so the response payload
   * stays small.
   */
  stats: onboardedProcedure
    .output(GroceriesStatsOutputSchema)
    .query(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        const [derived, boughtIds] = await Promise.all([
          loadDerivedRows(ctx, userId),
          safeReadBought(ctx, userId),
        ]);

        const boughtSet = new Set(boughtIds);
        const total = derived.length;
        const remaining = derived.filter(
          (r) => !boughtSet.has(r.ingredientCatalogId),
        ).length;
        return { total, remaining };
      } catch (err) {
        log.error({ err, userId }, 'groceries.stats failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load groceries stats',
          cause: err,
        });
      }
    }),

  /**
   * Onboarded — set the bought-state for a single ingredient to `intendedState`.
   * Named `toggleBought` because the user-facing action is a checkbox toggle,
   * but the wire contract is a setter so a Redis blip can't force a fake
   * toggle direction in the response.
   *
   * Bought-state is a soft cross-device preference — when Redis is down, the
   * mutation still returns success with `persisted: false`. The client keeps
   * the local optimistic flip and shows a one-time snackbar; counts on the
   * response are best-effort (server has no authoritative bought set to count
   * against, so `remaining` falls back to `total`).
   *
   * Stale entries (an id that is no longer in the derived list because the
   * user added the ingredient to their pantry mid-shop) are filtered at read
   * time in `list`/`stats`, not cleaned up here — keeping the toggle path a
   * single round-trip.
   */
  toggleBought: onboardedProcedure
    .input(ToggleBoughtInputSchema)
    .output(ToggleBoughtOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      let persisted = false;
      let resultIds: readonly string[] = [];

      try {
        const current = await ctx.groceriesBought.get(userId);
        const currentSet = new Set(current);
        if (input.intendedState) currentSet.add(input.ingredientCatalogId);
        else currentSet.delete(input.ingredientCatalogId);
        resultIds = [...currentSet];
        await ctx.groceriesBought.set(userId, resultIds);
        persisted = true;
      } catch (err) {
        // Redis blip — log once, fall through with persisted=false. The
        // derivation below still runs because the plan/pantry data lives in
        // Postgres and is unaffected.
        log.warn(
          { err, userId, ingredientCatalogId: input.ingredientCatalogId },
          'groceries.toggleBought: bought-state unavailable, returning unpersisted toggle',
        );
      }

      try {
        const derived = await loadDerivedRows(ctx, userId);
        const total = derived.length;
        // When persisted=false, resultIds is [], so remaining === total —
        // honest "we don't know what's bought" answer. Client trusts its
        // local boughtIds in that case via the `persisted` flag.
        const boughtSet = new Set(resultIds);
        const remaining = derived.filter(
          (r) => !boughtSet.has(r.ingredientCatalogId),
        ).length;

        return {
          isBought: input.intendedState,
          persisted,
          total,
          remaining,
        };
      } catch (err) {
        // Derivation failure is a real bug (Postgres down, etc.) — surface
        // as 500 so the client falls into the catchError branch and rolls
        // back the optimistic flip.
        log.error(
          { err, userId, ingredientCatalogId: input.ingredientCatalogId },
          'groceries.toggleBought: derivation failed',
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update grocery item',
          cause: err,
        });
      }
    }),
});
