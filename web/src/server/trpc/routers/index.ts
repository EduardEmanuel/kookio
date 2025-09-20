import { router } from '../trpc';
import { ingredientRouter } from './ingredient';
import { noteRouter } from './notes';

export const appRouter = router({
  note: noteRouter,
  ingredient: ingredientRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
