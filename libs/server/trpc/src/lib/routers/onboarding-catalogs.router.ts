import { createLogger } from '@kookio/server-logger';

import { router, TRPCError } from '../trpc';
import { protectedProcedure } from '../middlewares/auth';

const log = createLogger('trpc', { router: 'onboardingCatalogs' });

// TODO(post-w3): wrap each query with cacheGetOrSet against Redis — these
// catalogs are static and currently hit Postgres on every onboarding step.
//
// NOTE: this router intentionally uses `protectedProcedure` (not
// `onboardedProcedure`). The catalogs are fetched DURING onboarding to
// populate the stepper's selection lists; gating them on `onboardingDone`
// would make the very screens that complete onboarding unable to load.
export const onboardingCatalogs = router({
  dietaryRestrictions: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.dietaryRestriction.findMany({
        orderBy: { label: 'asc' },
      });
    } catch (err) {
      log.error({ err }, 'onboardingCatalogs.dietaryRestrictions failed');
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to load dietary restrictions',
        cause: err,
      });
    }
  }),

  utensils: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.utensil.findMany({
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
      });
    } catch (err) {
      log.error({ err }, 'onboardingCatalogs.utensils failed');
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to load utensils',
        cause: err,
      });
    }
  }),

  mealCategories: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.mealCategory.findMany({
        orderBy: { name: 'asc' },
      });
    } catch (err) {
      log.error({ err }, 'onboardingCatalogs.mealCategories failed');
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to load meal categories',
        cause: err,
      });
    }
  }),

  mealAreas: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.mealArea.findMany({
        orderBy: { name: 'asc' },
      });
    } catch (err) {
      log.error({ err }, 'onboardingCatalogs.mealAreas failed');
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to load meal areas',
        cause: err,
      });
    }
  }),
});
