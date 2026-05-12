import z from 'zod';

import {
  MealPlanSetInputSchema,
  MealSlotTypeSchema,
  MealSlotWithRecipeSchema,
  type MealSlotWithRecipe,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

import { onboardedProcedure } from '../middlewares/auth';
import { router, TRPCError } from '../trpc';

const DraftSlotInputSchema = z.object({
  date: z.string().datetime(),
  slotType: MealSlotTypeSchema,
  recipeId: z.string().min(1),
  servings: z.number().int().min(1).max(20),
  // Pass-through — the client uses the cached recipe blob to render
  // restored drafts without a re-fetch. Server doesn't introspect the
  // shape (the recipe lives in Postgres anyway and could be re-fetched
  // if missing).
  recipe: z.unknown().nullable(),
});

const DraftPayloadSchema = z.object({
  slots: z.array(DraftSlotInputSchema),
  savedAt: z.number().int().nonnegative(),
});

const DraftPersistedOutputSchema = z.object({
  persisted: z.boolean(),
});

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

  /**
   * Onboarded — fetch the caller's persisted draft (or null if none).
   * Sits alongside `PlanStore`'s localStorage write — Redis owns the
   * cross-device sync. Read failures degrade to null so the load path
   * falls back to localStorage cleanly.
   */
  getDraft: onboardedProcedure
    .output(DraftPayloadSchema.nullable())
    .query(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        return await ctx.mealPlanDraft.get(userId);
      } catch (err) {
        log.warn(
          { err, userId },
          'mealPlan.getDraft: store unavailable, returning null',
        );
        return null;
      }
    }),

  /**
   * Onboarded — persist a draft. `persisted: false` when the underlying
   * store (Redis) is down — the client treats it as "session-local
   * only, won't sync across devices for this hop". Mirrors the
   * `groceries.toggleBought` graceful-degradation contract.
   */
  setDraft: onboardedProcedure
    .input(DraftPayloadSchema)
    .output(DraftPersistedOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      try {
        await ctx.mealPlanDraft.set(userId, input);
        return { persisted: true };
      } catch (err) {
        log.warn(
          { err, userId },
          'mealPlan.setDraft: store unavailable, returning persisted:false',
        );
        return { persisted: false };
      }
    }),

  /**
   * Onboarded — drop the persisted draft. Called after a successful
   * submit and on explicit "discard draft". Same `persisted: false`
   * fallback as setDraft so the client UX never gets stuck on a Redis
   * blip.
   */
  clearDraft: onboardedProcedure
    .output(DraftPersistedOutputSchema)
    .mutation(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        await ctx.mealPlanDraft.clear(userId);
        return { persisted: true };
      } catch (err) {
        log.warn(
          { err, userId },
          'mealPlan.clearDraft: store unavailable, returning persisted:false',
        );
        return { persisted: false };
      }
    }),
});
