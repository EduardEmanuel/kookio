import { router } from '../trpc';
import { auth } from './auth.router';
import { onboarding } from './onboarding.router';
import { onboardingCatalogs } from './onboarding-catalogs.router';
import { profile } from './profile.router';
import { recipes } from './recipes.router';
import { user } from './user.router';

export const appRouter = router({
  auth,
  onboarding,
  onboardingCatalogs,
  profile,
  recipes,
  user,
});
