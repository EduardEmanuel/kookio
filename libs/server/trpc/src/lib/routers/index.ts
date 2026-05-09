import { router } from '../trpc';
import { auth } from './auth.router';
import { cookingSession } from './cooking-session.router';
import { mealPlan } from './meal-plan.router';
import { onboarding } from './onboarding.router';
import { onboardingCatalogs } from './onboarding-catalogs.router';
import { pantry } from './pantry.router';
import { profile } from './profile.router';
import { recipes } from './recipes/recipes.router';

export const appRouter = router({
  auth,
  cookingSession,
  mealPlan,
  onboarding,
  onboardingCatalogs,
  pantry,
  profile,
  recipes,
});
