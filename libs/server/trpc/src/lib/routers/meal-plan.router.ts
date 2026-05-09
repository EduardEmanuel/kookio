import z from 'zod';

import {
  MealPlanSetInputSchema,
  MealSlotWithRecipeSchema,
  type MealSlotWithRecipe,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

import { onboardedProcedure } from '../middlewares/auth';
import { router, TRPCError } from '../trpc';

const log = createLogger('trpc', { router: 'mealPlan' });

const SLOT_RECIPE_SELECT = {
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

const SLOT_INCLUDE = {
  recipe: { select: SLOT_RECIPE_SELECT },
} as const;

/** Parses an ISO datetime input and floors it to UTC midnight (slot dates). */
const toSlotDate = (iso: string): Date => {
  const d = new Date(iso);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const mealPlan = router({
  /**
   * Onboarded — return all of the caller's planned meals as a flat list.
   * The planner UI navigates the timeline freely with no enforced range,
   * so the server returns every slot the user owns; the client filters
   * to the visible window in memory.
   *
   * Slots are returned sparse — empty cells are absent rather than
   * represented as `recipeId: null` (the planner deletes a row when the
   * user clears a cell).
   */
  getCurrent: onboardedProcedure
    .output(z.array(MealSlotWithRecipeSchema))
    .query(async ({ ctx }): Promise<MealSlotWithRecipe[]> => {
      const userId = ctx.session!.uid;

      try {
        return await ctx.prisma.mealSlot.findMany({
          where: { userId },
          orderBy: [{ date: 'asc' }, { slotType: 'asc' }],
          include: SLOT_INCLUDE,
        });
      } catch (err) {
        log.error({ err, userId }, 'mealPlan.getCurrent failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load meal plan',
          cause: err,
        });
      }
    }),

  /**
   * Onboarded — replace the caller's full slot timeline atomically. The
   * client sends the complete set of slots it wants persisted; everything
   * not in `input.slots` is deleted, then the new entries are inserted.
   *
   * Validation order (cheapest first): same-(date,slotType) duplicates,
   * then recipe existence. We do not enforce any date-range bound because
   * the planner intentionally allows arbitrary timeline navigation; if a
   * user wants to plant a meal six months out, that's a feature.
   */
  setMealPlan: onboardedProcedure
    .input(MealPlanSetInputSchema)
    .output(z.array(MealSlotWithRecipeSchema))
    .mutation(async ({ ctx, input }): Promise<MealSlotWithRecipe[]> => {
      const userId = ctx.session!.uid;

      // Reject duplicate (date, slotType) pairs up front — Prisma would
      // otherwise surface this as P2002 from the unique index, but the
      // earlier check gives the client a clearer error.
      const seen = new Set<string>();
      for (const slot of input.slots) {
        const key = `${toSlotDate(slot.date).toISOString()}::${slot.slotType}`;
        if (seen.has(key)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Duplicate (date, slotType) in slots',
          });
        }
        seen.add(key);
      }

      // Verify all referenced recipes exist in a single round-trip (avoid
      // N+1). We don't check recipe.status here because the planner is a
      // user-private view — saving a private recipe to your own plan is
      // legitimate even if it would not surface in the public feed.
      if (input.slots.length > 0) {
        const recipeIds = Array.from(
          new Set(input.slots.map((s) => s.recipeId)),
        );
        const found = await ctx.prisma.recipe.findMany({
          where: { id: { in: recipeIds } },
          select: { id: true },
        });
        if (found.length !== recipeIds.length) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'One or more recipes were not found',
          });
        }
      }

      try {
        return await ctx.prisma.$transaction(async (tx) => {
          await tx.mealSlot.deleteMany({ where: { userId } });

          if (input.slots.length > 0) {
            await tx.mealSlot.createMany({
              data: input.slots.map((s) => ({
                userId,
                date: toSlotDate(s.date),
                slotType: s.slotType,
                recipeId: s.recipeId,
                servings: s.servings,
              })),
            });
          }

          return await tx.mealSlot.findMany({
            where: { userId },
            orderBy: [{ date: 'asc' }, { slotType: 'asc' }],
            include: SLOT_INCLUDE,
          });
        });
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        log.error({ err, userId }, 'mealPlan.setMealPlan failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to save meal plan',
          cause: err,
        });
      }
    }),
});
