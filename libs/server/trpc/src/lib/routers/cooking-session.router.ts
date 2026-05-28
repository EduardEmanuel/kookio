import {
  CookingSessionCompleteInputSchema,
  CookingSessionCompleteOutputSchema,
  CookingSessionStartInputSchema,
  CookingSessionStartOutputSchema,
  RecipeStatusSchema,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';
import { fromGrams, toGrams } from '@kookio/shared-utility/measure-units';

// Sub-pinch (0.5 g) remainders are rounded down to a delete rather than left
// in floating-point limbo. Matches the cooking-grade noise floor documented
// in `@kookio/shared-utility/measure-units` and Q3 of the grams-pipeline plan.
const REMAINING_DELETE_THRESHOLD_GRAMS = 0.5;

import { onboardedProcedure } from '../middlewares/auth';
import { router, TRPCError } from '../trpc';

const log = createLogger('trpc', { router: 'cookingSession' });

export const cookingSession = router({
  /**
   * Onboarded — start a cooking session for a PUBLIC recipe.
   * The session row is created with `completedAt = null`; `complete` is what
   * actually decrements the pantry. Returning a stable session id up front
   * lets the UI hold onto it across the multi-step "cook" flow.
   */
  start: onboardedProcedure
    .input(CookingSessionStartInputSchema)
    .output(CookingSessionStartOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      const recipe = await ctx.prisma.recipe.findFirst({
        where: { id: input.recipeId, status: RecipeStatusSchema.enum.PUBLIC },
        select: { id: true },
      });
      if (!recipe) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Recipe not found',
        });
      }

      try {
        const session = await ctx.prisma.cookingSession.create({
          data: {
            userId,
            recipeId: input.recipeId,
            servings: input.servings,
          },
          select: { id: true, createdAt: true },
        });
        return { sessionId: session.id, createdAt: session.createdAt };
      } catch (err) {
        log.error(
          { err, userId, recipeId: input.recipeId },
          'cookingSession.start failed',
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to start cooking session',
          cause: err,
        });
      }
    }),

  /**
   * Onboarded — finalize a cooking session and decrement the pantry atomically.
   *
   * Pantry decrement rules, applied per consumed item inside a single
   * transaction so a failure rolls everything back:
   *
   *  - `quantity <= 0`             → no-op
   *  - pantry row missing          → skip silent (user removed it after `start`)
   *  - either side has no grams    → skip silent (piece-class unit on a catalog
   *                                   row with no `pieceGrams` AND the default
   *                                   fallback would have already applied; this
   *                                   branch only fires when the unit itself is
   *                                   missing from every mapping — defensive)
   *  - consumed-grams === 0        → skip silent (flavour-only unit, no-op decrement)
   *  - remaining < 0.5 g           → delete the pantry row (sub-pinch noise floor)
   *  - otherwise                   → convert remaining grams back into the
   *                                   pantry row's stored unit and update
   *
   * All math runs in grams internally via the shared `toGrams` helper, so the
   * recipe and pantry units no longer have to match. Same heuristic as thesis
   * Phase 2b — water density for volumes, per-ingredient mass for piece units.
   *
   * Ownership and "not yet completed" are checked on the session row by id;
   * a session belonging to another user — or one already completed — surfaces
   * as NOT_FOUND so we never leak existence.
   */
  complete: onboardedProcedure
    .input(CookingSessionCompleteInputSchema)
    .output(CookingSessionCompleteOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      try {
        return await ctx.prisma.$transaction(async (tx) => {
          const session = await tx.cookingSession.findUnique({
            where: { id: input.sessionId },
            select: { id: true, userId: true, completedAt: true },
          });
          if (
            !session ||
            session.userId !== userId ||
            session.completedAt !== null
          ) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Cooking session not found',
            });
          }

          for (const item of input.consumed) {
            if (item.quantity <= 0) continue;

            const pantryItem = await tx.pantryItem.findUnique({
              where: {
                userId_ingredientCatalogId: {
                  userId,
                  ingredientCatalogId: item.ingredientCatalogId,
                },
              },
              select: {
                id: true,
                quantity: true,
                unit: true,
                ingredient: { select: { pieceGrams: true } },
              },
            });
            if (!pantryItem) continue;

            const piece = pantryItem.ingredient.pieceGrams ?? null;
            // `allowDefault: true` — same fallback semantics the cook dialog
            // uses when piece-class meets a pieceGrams-less catalog row, so
            // a row the user opted into actually decrements rather than
            // silently dropping. Server still rejects truly-unmappable units
            // (toGrams returns null) — defence in depth without surprising
            // the user.
            const consumedGrams = toGrams(item.quantity, item.unit, piece, {
              allowDefault: true,
            });
            const pantryGrams = toGrams(
              pantryItem.quantity,
              pantryItem.unit,
              piece,
              { allowDefault: true },
            );
            if (consumedGrams === null || pantryGrams === null) continue;
            // Flavour-only consumption (TO_TASTE/TO_SERVE/GARNISH) is 0 g —
            // skip the write rather than burning a no-op update.
            if (consumedGrams === 0) continue;

            const remainingGrams = Math.max(0, pantryGrams - consumedGrams);

            if (remainingGrams < REMAINING_DELETE_THRESHOLD_GRAMS) {
              await tx.pantryItem.delete({ where: { id: pantryItem.id } });
            } else {
              const remainingInDisplayUnit = fromGrams(
                remainingGrams,
                pantryItem.unit,
                piece,
                { allowDefault: true },
              );
              // pantryGrams was non-null above, so the inverse is too.
              await tx.pantryItem.update({
                where: { id: pantryItem.id },
                data: { quantity: remainingInDisplayUnit! },
              });
            }
          }

          const completed = await tx.cookingSession.update({
            where: { id: session.id },
            data: { completedAt: new Date() },
            select: { id: true, completedAt: true },
          });
          // The `update` payload guarantees `completedAt` is non-null since we
          // just wrote `new Date()` above; the `!` reflects that to the type.
          return {
            sessionId: completed.id,
            completedAt: completed.completedAt!,
          };
        });
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        log.error(
          { err, userId, sessionId: input.sessionId },
          'cookingSession.complete failed',
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to complete cooking session',
          cause: err,
        });
      }
    }),
});
