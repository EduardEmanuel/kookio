import { router } from '../trpc';
import { ingredientRouter } from './ingredient';

export const appRouter = router({
  ingredient: ingredientRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
