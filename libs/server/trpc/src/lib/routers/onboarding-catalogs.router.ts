import { createLogger } from '@kookio/server-logger';

import { procedure, router, TRPCError } from '../trpc';
import { requireAuth } from '../middlewares/auth';

const log = createLogger('trpc', { router: 'onboardingCatalogs' });

// TODO(post-w3): wrap each query with cacheGetOrSet against Redis — these
// catalogs are static and currently hit Postgres on every onboarding step.
export const onboardingCatalogs = router({
  dietaryRestrictions: procedure.use(requireAuth).query(async ({ ctx }) => {
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

  utensils: procedure.use(requireAuth).query(async ({ ctx }) => {
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

  mealCategories: procedure.use(requireAuth).query(async ({ ctx }) => {
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

  mealAreas: procedure.use(requireAuth).query(async ({ ctx }) => {
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
