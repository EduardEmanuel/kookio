import { router } from '../trpc';
import { auth } from './auth.router';
import { user } from './user.router';

export const appRouter = router({
  auth,
  user,
});
