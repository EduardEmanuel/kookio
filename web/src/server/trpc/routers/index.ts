import { router } from '../trpc';

import { ingredient } from './ingredient.router';

export const appRouter = router({
  ingredient,
});

export type AppRouter = typeof appRouter;
