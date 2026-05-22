import z from 'zod';

import {
  SavedRecipeRowSchema,
  UuidIdSchema,
  type SavedRecipeRow,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

import { onboardedProcedure } from '../middlewares/auth';
import { router, TRPCError } from '../trpc';

const log = createLogger('trpc', { router: 'recipeCollection' });

const FAVORITES_NAME = 'favorites';

const SAVED_RECIPE_SELECT = {
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
} as const;

const ToggleSaveInputSchema = z.object({
  recipeId: UuidIdSchema,
});

const ToggleSaveResultSchema = z.object({
  recipeId: UuidIdSchema,
  saved: z.boolean(),
});

export const recipeCollection = router({
  /**
   * Onboarded — full list of saved recipes with the data the UI needs to
   * render cards (incl. category emoji and area flag for the cuisines and
   * categories grouping toggles on `/recipes/saved`).
   *
   * The favorites collection is guaranteed to exist for any onboarded user
   * because `onboarding.commit` seeds it. If it is missing — e.g. a test
   * fixture or a pre-backfill row — return an empty list rather than throwing.
   */
  getSaved: onboardedProcedure
    .output(z.array(SavedRecipeRowSchema))
    .query(async ({ ctx }): Promise<SavedRecipeRow[]> => {
      const userId = ctx.session!.uid;

      try {
        const collection = await ctx.prisma.recipeCollection.findUnique({
          where: { userId_name: { userId, name: FAVORITES_NAME } },
          select: { id: true },
        });
        if (!collection) return [];

        const entries = await ctx.prisma.recipeCollectionEntry.findMany({
          where: { collectionId: collection.id },
          orderBy: { addedAt: 'desc' },
          select: {
            addedAt: true,
            recipe: { select: SAVED_RECIPE_SELECT },
          },
        });

        return entries.map((e) => ({
          recipe: e.recipe,
          addedAt: e.addedAt,
        }));
      } catch (err) {
        log.error({ err, userId }, 'recipeCollection.getSaved failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load saved recipes',
          cause: err,
        });
      }
    }),

  /**
   * Onboarded — return just the saved recipe ids as a flat array. Single
   * up-front call hydrates `SavedStore`'s `Set<string>` so every surface
   * (recipe detail, match cards, feed) can show the correct toggle state
   * synchronously without an N+1 per-card query.
   */
  getSavedIds: onboardedProcedure
    .output(z.array(UuidIdSchema))
    .query(async ({ ctx }): Promise<string[]> => {
      const userId = ctx.session!.uid;

      try {
        const collection = await ctx.prisma.recipeCollection.findUnique({
          where: { userId_name: { userId, name: FAVORITES_NAME } },
          select: { id: true },
        });
        if (!collection) return [];

        const entries = await ctx.prisma.recipeCollectionEntry.findMany({
          where: { collectionId: collection.id },
          select: { recipeId: true },
        });
        return entries.map((e) => e.recipeId);
      } catch (err) {
        log.error({ err, userId }, 'recipeCollection.getSavedIds failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load saved recipe ids',
          cause: err,
        });
      }
    }),

  /**
   * Onboarded — flip the saved state for a recipe.
   * Returns the new `saved` flag so the client can settle optimistic UI.
   * NOT_FOUND if the recipe id does not resolve to a PUBLIC recipe; the
   * favorites collection itself is guaranteed by `onboarding.commit`.
   */
  toggleSave: onboardedProcedure
    .input(ToggleSaveInputSchema)
    .output(ToggleSaveResultSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;
      const { recipeId } = input;

      const recipe = await ctx.prisma.recipe.findFirst({
        where: { id: recipeId, status: 'PUBLIC' },
        select: { id: true },
      });
      if (!recipe) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Recipe not found',
        });
      }

      try {
        const collection = await ctx.prisma.recipeCollection.findUnique({
          where: { userId_name: { userId, name: FAVORITES_NAME } },
          select: { id: true },
        });
        if (!collection) {
          // Defensive path: onboarding seeded the row, the backfill migration
          // covers pre-existing users. If we still get here, the user is in
          // an inconsistent state we cannot recover from at this seam.
          throw new TRPCError({
            code: 'PRECONDITION_FAILED',
            message: 'Favorites collection missing for user',
          });
        }

        const existing = await ctx.prisma.recipeCollectionEntry.findUnique({
          where: {
            collectionId_recipeId: {
              collectionId: collection.id,
              recipeId,
            },
          },
          select: { recipeId: true },
        });

        if (existing) {
          await ctx.prisma.recipeCollectionEntry.delete({
            where: {
              collectionId_recipeId: {
                collectionId: collection.id,
                recipeId,
              },
            },
          });
          return { recipeId, saved: false };
        }

        await ctx.prisma.recipeCollectionEntry.create({
          data: { collectionId: collection.id, recipeId },
        });
        return { recipeId, saved: true };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        log.error(
          { err, userId, recipeId },
          'recipeCollection.toggleSave failed',
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to toggle saved recipe',
          cause: err,
        });
      }
    }),
});
