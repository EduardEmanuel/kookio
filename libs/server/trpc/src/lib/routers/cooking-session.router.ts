import {
  CookingRecipeForSessionSchema,
  CookingSessionCompleteInputSchema,
  CookingSessionCompleteOutputSchema,
  CookingSessionStartInputSchema,
  CookingSessionStartOutputSchema,
  GetRecipeForSessionInputSchema,
  RecipeStatusSchema,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

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
   *  - `quantity <= 0`           → no-op
   *  - pantry row missing        → skip silent (user removed it after `start`)
   *  - units differ              → skip silent (no automatic unit conversion;
   *                                 the dialog warns the user about this)
   *  - `pantry - consumed <= 0`  → delete the pantry row (no zero-quantity rows
   *                                 left behind)
   *  - otherwise                 → update with `Math.max(0, ...)` as a defensive
   *                                 floor against the row changing under us
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
              select: { id: true, quantity: true, unit: true },
            });
            if (!pantryItem) continue;
            if (pantryItem.unit !== item.unit) continue;

            const remaining = Math.max(0, pantryItem.quantity - item.quantity);

            if (remaining === 0) {
              await tx.pantryItem.delete({ where: { id: pantryItem.id } });
            } else {
              await tx.pantryItem.update({
                where: { id: pantryItem.id },
                data: { quantity: remaining },
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

  /**
   * Onboarded — load a PUBLIC recipe enriched with pantry availability per
   * ingredient. The composite shape lets the cook page render the ingredient
   * confirmation dialog without a second round-trip.
   */
  getRecipeForSession: onboardedProcedure
    .input(GetRecipeForSessionInputSchema)
    .output(CookingRecipeForSessionSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      try {
        const [recipe, pantryItems] = await Promise.all([
          ctx.prisma.recipe.findFirst({
            where: {
              id: input.recipeId,
              status: RecipeStatusSchema.enum.PUBLIC,
            },
            select: {
              id: true,
              title: true,
              instructions: true,
              servings: true,
              ingredients: {
                select: {
                  id: true,
                  ingredientCatalogId: true,
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
              },
            },
          }),
          ctx.prisma.pantryItem.findMany({
            where: { userId },
            select: {
              ingredientCatalogId: true,
              quantity: true,
              unit: true,
            },
          }),
        ]);

        if (!recipe) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Recipe not found',
          });
        }

        const pantryByCatalogId = new Map(
          pantryItems.map((p) => [
            p.ingredientCatalogId,
            { quantity: p.quantity, unit: p.unit },
          ]),
        );

        return {
          ...recipe,
          ingredients: recipe.ingredients.map((ri) => ({
            ...ri,
            pantryAvailable:
              pantryByCatalogId.get(ri.ingredientCatalogId) ?? null,
          })),
        };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        log.error(
          { err, userId, recipeId: input.recipeId },
          'cookingSession.getRecipeForSession failed',
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load recipe',
          cause: err,
        });
      }
    }),
});
