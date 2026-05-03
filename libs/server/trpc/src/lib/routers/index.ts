import { router } from '../trpc';
import { auth } from './auth.router';
import { onboarding } from './onboarding.router';
import { onboardingCatalogs } from './onboarding-catalogs.router';
import { pantry } from './pantry.router';
import { profile } from './profile.router';
import { recipes } from './recipes.router';
import { user } from './user.router';

export const appRouter = router({
  auth,
  onboarding,
  onboardingCatalogs,
  pantry,
  profile,
  recipes,
  user,
});
