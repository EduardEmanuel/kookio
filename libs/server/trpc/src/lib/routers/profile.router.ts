import z from 'zod';

import { DisplayNameSchema } from '@kookio/prisma-client';
import { createLogger } from '@kookio/server-logger';

import { procedure, router, TRPCError } from '../trpc';
import { requireAuth } from '../middlewares/auth';

const log = createLogger('trpc', { router: 'profile' });

const CompleteOnboardingInputSchema = z.object({
  adultsCount: z.number().int().min(1).max(20),
  childrenCount: z.number().int().min(0).max(20),
});

const UpdateNameInputSchema = z.object({
  name: DisplayNameSchema,
});

const UpdateNameOutputSchema = z.object({
  name: z.string(),
});

const ProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  adultsCount: z.number().int(),
  childrenCount: z.number().int(),
  onboardingDone: z.boolean(),
});

const ProfileCountsSchema = z.object({
  pantryCount: z.number().int().min(0),
  utensilCount: z.number().int().min(0),
  dietaryCount: z.number().int().min(0),
  preferredCategoryCount: z.number().int().min(0),
  preferredAreaCount: z.number().int().min(0),
});

export const profile = router({
  /**
   * Protected — returns aggregate counts across the user's profile-shaped
   * data (pantry, utensils, dietary restrictions, preferred categories &
   * areas). Drives `AuthStore.hasProfileSignals`.
   *
   * `userUtensil` and `userDietaryRestriction` are keyed by `UserProfile.id`,
   * not `User.id` — same JOIN pattern as `onboarding.current`.
   */
  counts: procedure
    .use(requireAuth)
    .output(ProfileCountsSchema)
    .query(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        const profileRow = await ctx.prisma.userProfile.findUnique({
          where: { userId },
          select: { id: true },
        });
        const profileId = profileRow?.id;

        const [
          pantryCount,
          utensilCount,
          dietaryCount,
          preferredCategoryCount,
          preferredAreaCount,
        ] = await Promise.all([
          ctx.prisma.pantryItem.count({ where: { userId } }),
          profileId
            ? ctx.prisma.userUtensil.count({ where: { userId: profileId } })
            : Promise.resolve(0),
          profileId
            ? ctx.prisma.userDietaryRestriction.count({
                where: { userId: profileId },
              })
            : Promise.resolve(0),
          ctx.prisma.userPreferredCategory.count({ where: { userId } }),
          ctx.prisma.userPreferredArea.count({ where: { userId } }),
        ]);

        return {
          pantryCount,
          utensilCount,
          dietaryCount,
          preferredCategoryCount,
          preferredAreaCount,
        };
      } catch (err) {
        log.error({ err, userId }, 'profile.counts failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load profile counts',
          cause: err,
        });
      }
    }),

  /**
   * Protected — finalizes onboarding for the current user.
   * Creates the UserProfile row if missing, otherwise updates it.
   */
  completeOnboarding: procedure
    .use(requireAuth)
    .input(CompleteOnboardingInputSchema)
    .output(ProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      try {
        const result = await ctx.prisma.userProfile.upsert({
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

        log.info({ uid: userId }, 'onboarding completed');

        return {
          id: result.id,
          userId: result.userId,
          adultsCount: result.adultsCount,
          childrenCount: result.childrenCount,
          onboardingDone: result.onboardingDone,
        };
      } catch (err) {
        log.error({ err, userId }, 'profile.completeOnboarding failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to save onboarding state',
          cause: err,
        });
      }
    }),

  /**
   * Protected — updates the current user's display name. Used by the account
   * page form. Validates via the same `DisplayNameSchema` as onboarding.
   */
  updateName: procedure
    .use(requireAuth)
    .input(UpdateNameInputSchema)
    .output(UpdateNameOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.uid;

      try {
        const updated = await ctx.prisma.user.update({
          where: { id: userId },
          data: { name: input.name },
          select: { name: true },
        });

        return { name: updated.name ?? input.name };
      } catch (err) {
        log.error({ err, userId }, 'profile.updateName failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to save name',
          cause: err,
        });
      }
    }),

  /**
   * Protected — flips onboardingDone back to false for the current user
   * without discarding adultsCount / childrenCount.
   * Defensive upsert: creates a minimal profile if it does not yet exist,
   * which keeps the endpoint idempotent for users who never onboarded.
   */
  resetOnboarding: procedure
    .use(requireAuth)
    .output(ProfileSchema)
    .mutation(async ({ ctx }) => {
      const userId = ctx.session!.uid;

      try {
        const result = await ctx.prisma.userProfile.upsert({
          where: { userId },
          create: { userId, onboardingDone: false },
          update: { onboardingDone: false },
        });

        return {
          id: result.id,
          userId: result.userId,
          adultsCount: result.adultsCount,
          childrenCount: result.childrenCount,
          onboardingDone: result.onboardingDone,
        };
      } catch (err) {
        log.error({ err, userId }, 'profile.resetOnboarding failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to reset onboarding state',
          cause: err,
        });
      }
    }),
});
