import {
  MealPlanFullSchema,
  MealPlanSetInputSchema,
  type MealPlanFull,
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

/**
 * UTC start-of-day for the Monday of the ISO week containing `now`. Used by
 * `getCurrent` when lazily creating an empty plan: keeping the math UTC-only
 * matches how `MealPlanSlot.date` is stored (UTC midnight) and avoids a
 * timezone class of bugs around the Sat→Sun rollover.
 */
const isoWeekRange = (now: Date): { startDate: Date; endDate: Date } => {
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);
  // JS getUTCDay: Sunday = 0 ... Saturday = 6. ISO week starts Monday, so
  // Sunday must offset by 6 days, Monday by 0, ..., Saturday by 5.
  const offsetFromMonday = (start.getUTCDay() + 6) % 7;
  start.setUTCDate(start.getUTCDate() - offsetFromMonday);

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  end.setUTCHours(23, 59, 59, 999);

  return { startDate: start, endDate: end };
};

/** Parses an ISO datetime input and floors it to UTC midnight (slot dates). */
const toSlotDate = (iso: string): Date => {
  const d = new Date(iso);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const mealPlan = router({
  /**
   * Onboarded — return the caller's active meal plan with populated slots.
   * "Active" = the plan whose `endDate >= today`. If none exists the server
   * lazily creates an empty plan covering the current ISO week (Mon–Sun) so
   * the client always has a plan to render against.
   *
   * The "single active plan" invariant is enforced in the application layer
   * rather than the schema (no partial unique index): two concurrent
   * `getCurrent` calls from the same user can race and both create a plan.
   * The `orderBy: createdAt desc, take: 1` below picks the most-recent winner
   * deterministically; an orphan row from a lost race is harmless and never
   * surfaces to the client.
   */
  getCurrent: onboardedProcedure
    .output(MealPlanFullSchema)
    .query(async ({ ctx }): Promise<MealPlanFull> => {
      const userId = ctx.session!.uid;
      const now = new Date();

      try {
        const existing = await ctx.prisma.mealPlan.findFirst({
          where: { userId, endDate: { gte: now } },
          orderBy: { createdAt: 'desc' },
          include: {
            slots: {
              orderBy: [{ date: 'asc' }, { slotType: 'asc' }],
              include: SLOT_INCLUDE,
            },
          },
        });
        if (existing) return existing;

        const { startDate, endDate } = isoWeekRange(now);
        const created = await ctx.prisma.mealPlan.create({
          data: { userId, startDate, endDate },
          include: {
            slots: {
              orderBy: [{ date: 'asc' }, { slotType: 'asc' }],
              include: SLOT_INCLUDE,
            },
          },
        });
        return created;
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
   * Onboarded — replace the active plan's date range and slot set in one
   * atomic transaction. The client builds the whole week as a draft (with
   * localStorage persistence) and submits once; per-slot mutations are not
   * exposed because the planner UI commits via an explicit "Save" gesture.
   *
   * Validation order (cheapest first): same-(date,slotType) duplicates,
   * date-range membership, recipe existence. The transaction itself is
   * delete-then-createMany on slots — simpler and more predictable than
   * computing a per-row diff, and the slot set is bounded (≤ 7×4 today).
   */
  setMealPlan: onboardedProcedure
    .input(MealPlanSetInputSchema)
    .output(MealPlanFullSchema)
    .mutation(async ({ ctx, input }): Promise<MealPlanFull> => {
      const userId = ctx.session!.uid;

      const startDate = new Date(input.startDate);
      const endDate = new Date(input.endDate);
      if (endDate.getTime() < startDate.getTime()) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'endDate must be on or after startDate',
        });
      }

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

      // All slot dates must fall within [startDate, endDate] inclusive,
      // matching how `getCurrent` filters by `endDate >= today`.
      const startMs = startDate.getTime();
      const endMs = endDate.getTime();
      for (const slot of input.slots) {
        const slotMs = toSlotDate(slot.date).getTime();
        if (slotMs < startMs || slotMs > endMs) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Slot date is outside the plan range',
          });
        }
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
          const existing = await tx.mealPlan.findFirst({
            where: { userId, endDate: { gte: new Date() } },
            orderBy: { createdAt: 'desc' },
            select: { id: true },
          });

          const planId =
            existing?.id ??
            (
              await tx.mealPlan.create({
                data: { userId, startDate, endDate },
                select: { id: true },
              })
            ).id;

          if (existing) {
            await tx.mealPlan.update({
              where: { id: planId },
              data: { startDate, endDate },
            });
          }

          await tx.mealPlanSlot.deleteMany({ where: { mealPlanId: planId } });

          if (input.slots.length > 0) {
            await tx.mealPlanSlot.createMany({
              data: input.slots.map((s) => ({
                mealPlanId: planId,
                date: toSlotDate(s.date),
                slotType: s.slotType,
                recipeId: s.recipeId,
                servings: s.servings,
              })),
            });
          }

          return await tx.mealPlan.findUniqueOrThrow({
            where: { id: planId },
            include: {
              slots: {
                orderBy: [{ date: 'asc' }, { slotType: 'asc' }],
                include: SLOT_INCLUDE,
              },
            },
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

// Re-exported here so the spec file can construct ISO ranges that match
// the server's own definition without duplicating the math.
export { isoWeekRange };
