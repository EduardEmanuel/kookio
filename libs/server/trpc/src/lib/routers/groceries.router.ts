import z from 'zod';

import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  UuidIdSchema,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';
import { fromGrams, toGrams } from '@kookio/shared-utility/measure-units';

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

const GroceriesListOutputSchema = z.object({
  items: z.array(GroceryItemSchema),
  /**
   * False when the bought-state read fell back to an empty set because
   * Redis was unreachable. The client's load path uses this signal to
   * decide whether to trust `item.isBought` (true → server canonical)
   * or to override with the localStorage cache (false → Redis is down,
   * cache holds the truth this session).
   */
  boughtAvailable: z.boolean(),
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

const AddBoughtToPantryOutputSchema = z.object({
  /** Bought items inserted as new pantry rows. */
  added: z.number().int().nonnegative(),
  /**
   * Bought items merged into an existing pantry row. Quantities reconcile
   * via the shared grams pipeline (water-density for volumes, pieceGrams
   * for piece-class) so an ml-recipe can merge into a g-pantry-row. Rare
   * in practice — `deriveGroceries` filters out anything already in the
   * pantry — but a concurrent add from another tab can land here.
   */
  merged: z.number().int().nonnegative(),
  /**
   * Bought items the server could not move: null quantity, null unit, or
   * a unit with no mapping at all (defensive — `toGrams` returned null
   * for either side). Surfaced as a count so the page can show a "kept
   * N items on the list" hint without naming each one.
   */
  skipped: z.number().int().nonnegative(),
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
          pieceGrams: true,
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
 * grocery list itself. Read failures degrade to "nothing checked", and the
 * `available` flag tells the caller whether the empty set is authentic
 * (Redis up, no items bought) or a fallback (Redis down). The `list`
 * endpoint forwards `available` to the client so the client-side
 * localStorage cache can override the empty isBought values when Redis
 * is degraded.
 */
const safeReadBought = async (
  ctx: Context,
  userId: string,
): Promise<{ ids: readonly string[]; available: boolean }> => {
  try {
    const ids = await ctx.groceriesBought.get(userId);
    return { ids, available: true };
  } catch (err) {
    log.error(
      { err, userId },
      'groceries: bought-state read failed, falling back to empty set',
    );
    return { ids: [], available: false };
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
    .output(GroceriesListOutputSchema)
    .query(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        const [derived, bought] = await Promise.all([
          loadDerivedRows(ctx, userId),
          safeReadBought(ctx, userId),
        ]);

        const boughtSet = new Set(bought.ids);
        return {
          items: derived.map((row) => ({
            ...row,
            isBought: boughtSet.has(row.ingredientCatalogId),
          })),
          boughtAvailable: bought.available,
        };
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
        const [derived, bought] = await Promise.all([
          loadDerivedRows(ctx, userId),
          safeReadBought(ctx, userId),
        ]);

        const boughtSet = new Set(bought.ids);
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

  /**
   * Onboarded — move every currently-bought grocery item into the user's
   * pantry, then clear those ids from the Redis bought-state.
   *
   * Bought-state must be readable (Redis up) to run at all — there is no
   * point trying to move "the user's bought items" if we don't know which
   * those are. A Redis blip surfaces as INTERNAL_SERVER_ERROR so the
   * client shows a "try again" snackbar instead of falsely reporting a
   * no-op success.
   *
   * Per item:
   *  - null quantity or null unit  → skipped (`PantryItem` cannot store either)
   *  - bought id no longer in derived (already in pantry, plan changed, recipe
   *    removed) → silently dropped from bought-state, not counted
   *  - same-unit pantry row exists → merge (sum quantity)
   *  - same-family pantry row exists → convert and merge
   *  - incompatible unit pantry row exists → skipped
   *  - no pantry row → create
   *
   * The Postgres write is one transaction. Clearing Redis is best-effort
   * outside the tx — if Redis fails after the tx commits, the items are in
   * the pantry already but stay ticked on the list. The list/stats endpoints
   * filter bought ids against the derived set on read, so the stale ticks
   * disappear from the UI on the next reload anyway.
   */
  addBoughtToPantry: onboardedProcedure
    .output(AddBoughtToPantryOutputSchema)
    .mutation(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      let boughtIds: readonly string[];
      try {
        boughtIds = await ctx.groceriesBought.get(userId);
      } catch (err) {
        log.error(
          { err, userId },
          'groceries.addBoughtToPantry: bought-state read failed',
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not read your bought-state — please try again',
          cause: err,
        });
      }

      if (boughtIds.length === 0) {
        return { added: 0, merged: 0, skipped: 0 };
      }

      let added = 0;
      let merged = 0;
      let skipped = 0;
      const movedOrStale: string[] = [];

      try {
        await ctx.prisma.$transaction(async (tx) => {
          const [slots, pantryRows] = await Promise.all([
            tx.mealSlot.findMany({
              where: { userId, recipeId: { not: null } },
              select: { recipeId: true, servings: true },
            }),
            tx.pantryItem.findMany({
              where: { userId },
              select: {
                id: true,
                ingredientCatalogId: true,
                quantity: true,
                unit: true,
                ingredient: { select: { pieceGrams: true } },
              },
            }),
          ]);

          const recipeIds = Array.from(
            new Set(
              slots
                .map((s) => s.recipeId)
                .filter((id): id is string => id !== null),
            ),
          );

          const recipes = recipeIds.length
            ? await tx.recipe.findMany({
                where: { id: { in: recipeIds } },
                select: RECIPE_INGREDIENT_SELECT,
              })
            : [];

          const pantryByIngredient = new Map(
            pantryRows.map((p) => [p.ingredientCatalogId, p]),
          );
          const pantryIds = new Set(pantryByIngredient.keys());

          const derived = deriveGroceries(slots, recipes, pantryIds);
          const derivedById = new Map(
            derived.map((row) => [row.ingredientCatalogId, row]),
          );

          for (const ingredientCatalogId of boughtIds) {
            const row = derivedById.get(ingredientCatalogId);
            if (!row) {
              // Bought but no longer in the derived list — already in
              // pantry, plan changed, recipe removed, etc. Drop from the
              // bought set silently.
              movedOrStale.push(ingredientCatalogId);
              continue;
            }
            if (row.totalQuantity === null || row.unit === null) {
              skipped++;
              continue;
            }

            const existing = pantryByIngredient.get(ingredientCatalogId);
            if (existing) {
              // deriveGroceries filters out anything currently in the
              // pantry, so this branch only fires when a concurrent write
              // from another tab landed between the snapshot and the tx.
              // Reconcile both sides through grams using the same per-
              // ingredient pieceGrams — pulls in the shared thesis Phase
              // 2b heuristic so an ml-grocery-row can merge into a
              // g-pantry-row without ad-hoc unit comparisons.
              const piece = existing.ingredient.pieceGrams ?? null;
              const consumedGrams = toGrams(
                row.totalQuantity,
                row.unit,
                piece,
                {
                  allowDefault: true,
                },
              );
              const existingGrams = toGrams(
                existing.quantity,
                existing.unit,
                piece,
                { allowDefault: true },
              );
              if (consumedGrams === null || existingGrams === null) {
                skipped++;
                continue;
              }
              const newGrams = existingGrams + consumedGrams;
              const newQuantity = fromGrams(newGrams, existing.unit, piece, {
                allowDefault: true,
              });
              // fromGrams returns null only when toGrams would also have
              // returned null. Both sides succeeded above, so the inverse
              // must too.
              await tx.pantryItem.update({
                where: { id: existing.id },
                data: { quantity: newQuantity! },
              });
              merged++;
              movedOrStale.push(ingredientCatalogId);
            } else {
              await tx.pantryItem.create({
                data: {
                  userId,
                  ingredientCatalogId,
                  quantity: row.totalQuantity,
                  unit: row.unit,
                  expiresAt: null,
                },
              });
              added++;
              movedOrStale.push(ingredientCatalogId);
            }
          }
        });
      } catch (err) {
        log.error(
          { err, userId, boughtCount: boughtIds.length },
          'groceries.addBoughtToPantry: transaction failed',
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to move bought items to pantry',
          cause: err,
        });
      }

      try {
        const movedSet = new Set(movedOrStale);
        const remaining = boughtIds.filter((id) => !movedSet.has(id));
        await ctx.groceriesBought.set(userId, remaining);
      } catch (err) {
        // The pantry write already committed; a Redis failure here just
        // leaves the moved items still ticked on the list. The next reload
        // filters them out via the derive-vs-bought intersection at read
        // time, so the stale ticks disappear on their own.
        log.warn(
          { err, userId },
          'groceries.addBoughtToPantry: clear-bought failed',
        );
      }

      return { added, merged, skipped };
    }),
});
