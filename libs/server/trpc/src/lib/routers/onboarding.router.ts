import z from 'zod';

import {
  OnboardingCommitInputSchema,
  OnboardingCurrentSchema,
} from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

import { router, TRPCError } from '../trpc';
import { protectedProcedure } from '../middlewares/auth';

const log = createLogger('trpc', { router: 'onboarding' });

const OnboardingDoneSchema = z.object({
  onboardingDone: z.boolean(),
});

/**
 * NOTE: this router intentionally uses `protectedProcedure` (not
 * `onboardedProcedure`) because every endpoint here runs DURING the
 * onboarding flow itself. Gating it with `requireOnboarding` would create
 * a deadlock — the user can't complete onboarding without already having
 * completed it.
 */
export const onboarding = router({
  /**
   * Protected — finalizes onboarding for the current user.
   * Upserts UserProfile and replaces all four many-to-many selection sets
   * inside a single interactive transaction.
   *
   * Note: dietary restrictions and utensils are keyed on UserProfile.id
   * (per schema design), while preferred categories and areas are keyed
   * directly on User.id so they survive profile resets.
   */
  commit: protectedProcedure
    .input(OnboardingCommitInputSchema)
    .output(OnboardingDoneSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      try {
        await ctx.prisma.$transaction(async (tx) => {
          await tx.user.update({
            where: { id: userId },
            data: { name: input.name },
          });

          const profile = await tx.userProfile.upsert({
            where: { userId },
            create: {
              userId,
              adultsCount: input.adultsCount,
              childrenCount: input.childrenCount,
              onboardingDone: true,
            },
            update: {
              adultsCount: input.adultsCount,
              childrenCount: input.childrenCount,
              onboardingDone: true,
            },
          });

          const profileId = profile.id;

          await tx.userDietaryRestriction.deleteMany({
            where: { userId: profileId },
          });
          if (input.dietaryRestrictionIds.length > 0) {
            await tx.userDietaryRestriction.createMany({
              data: input.dietaryRestrictionIds.map((dietaryRestrictionId) => ({
                userId: profileId,
                dietaryRestrictionId,
              })),
              skipDuplicates: true,
            });
          }

          await tx.userUtensil.deleteMany({ where: { userId: profileId } });
          if (input.utensilIds.length > 0) {
            await tx.userUtensil.createMany({
              data: input.utensilIds.map((utensilId) => ({
                userId: profileId,
                utensilId,
              })),
              skipDuplicates: true,
            });
          }

          await tx.userPreferredCategory.deleteMany({ where: { userId } });
          if (input.preferredCategoryIds.length > 0) {
            await tx.userPreferredCategory.createMany({
              data: input.preferredCategoryIds.map((mealCategoryId) => ({
                userId,
                mealCategoryId,
              })),
              skipDuplicates: true,
            });
          }

          await tx.userPreferredArea.deleteMany({ where: { userId } });
          if (input.preferredAreaIds.length > 0) {
            await tx.userPreferredArea.createMany({
              data: input.preferredAreaIds.map((mealAreaId) => ({
                userId,
                mealAreaId,
              })),
              skipDuplicates: true,
            });
          }
        });

        log.info({ uid: userId }, 'onboarding committed');
        return { onboardingDone: true };
      } catch (err) {
        log.error({ err, uid: userId }, 'onboarding.commit failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to save onboarding selections',
          cause: err,
        });
      }
    }),

  /**
   * Protected — flips onboardingDone back to false without discarding
   * adultsCount, childrenCount, or any of the M:N selections.
   * Defensive upsert keeps the endpoint idempotent for users who never onboarded.
   */
  reset: protectedProcedure
    .output(OnboardingDoneSchema)
    .mutation(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        await ctx.prisma.userProfile.upsert({
          where: { userId },
          create: { userId, onboardingDone: false },
          update: { onboardingDone: false },
        });
        return { onboardingDone: false };
      } catch (err) {
        log.error({ err, uid: userId }, 'onboarding.reset failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to reset onboarding state',
          cause: err,
        });
      }
    }),

  /**
   * Protected — returns the user's existing selections so the stepper UI
   * can pre-populate when the user re-enters onboarding after a reset.
   * Returns sensible defaults (1 adult, 0 children, empty arrays) when no
   * profile or selections exist yet.
   */
  current: protectedProcedure
    .output(OnboardingCurrentSchema)
    .query(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        const [user, profile] = await Promise.all([
          ctx.prisma.user.findUnique({
            where: { id: userId },
            select: { name: true },
          }),
          ctx.prisma.userProfile.findUnique({
            where: { userId },
            select: { id: true, adultsCount: true, childrenCount: true },
          }),
        ]);

        const profileId = profile?.id;

        const [prefCategories, prefAreas, utensils, dietary] =
          await Promise.all([
            ctx.prisma.userPreferredCategory.findMany({
              where: { userId },
              select: { mealCategoryId: true },
            }),
            ctx.prisma.userPreferredArea.findMany({
              where: { userId },
              select: { mealAreaId: true },
            }),
            profileId
              ? ctx.prisma.userUtensil.findMany({
                  where: { userId: profileId },
                  select: { utensilId: true },
                })
              : Promise.resolve([]),
            profileId
              ? ctx.prisma.userDietaryRestriction.findMany({
                  where: { userId: profileId },
                  select: { dietaryRestrictionId: true },
                })
              : Promise.resolve([]),
          ]);

        return {
          name: user?.name ?? null,
          adultsCount: profile?.adultsCount ?? 1,
          childrenCount: profile?.childrenCount ?? 0,
          preferredCategoryIds: prefCategories.map((p) => p.mealCategoryId),
          preferredAreaIds: prefAreas.map((p) => p.mealAreaId),
          utensilIds: utensils.map((u) => u.utensilId),
          dietaryRestrictionIds: dietary.map((d) => d.dietaryRestrictionId),
        };
      } catch (err) {
        log.error({ err, uid: userId }, 'onboarding.current failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load onboarding state',
          cause: err,
        });
      }
    }),
});
