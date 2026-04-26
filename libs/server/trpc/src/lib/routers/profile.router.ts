import z from 'zod';

import { createLogger } from '@kookio/server-logger';

import { procedure, router, TRPCError } from '../trpc';
import { requireAuth } from '../middlewares/auth';

const log = createLogger('trpc', { router: 'profile' });

const CompleteOnboardingInputSchema = z.object({
  adultsCount: z.number().int().min(1).max(20),
  childrenCount: z.number().int().min(0).max(20),
});

const ProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  adultsCount: z.number().int(),
  childrenCount: z.number().int(),
  onboardingDone: z.boolean(),
});

export const profile = router({
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
