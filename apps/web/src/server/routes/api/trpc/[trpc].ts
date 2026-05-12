import { createTrpcNitroHandler } from '@analogjs/trpc/server';

import {
  appRouter,
  createContext,
  setGroceriesBoughtStore,
  setMealPlanDraftStore,
  setSessionResolver,
} from '@kookio/server-trpc';
import { toSession } from '@kookio/server-auth';

import { redisGroceriesBoughtStore } from '../../../infra/groceries-bought';
import { redisMealPlanDraftStore } from '../../../infra/meal-plan-draft';

setSessionResolver(toSession);

// Only swap in the Redis-backed stores when REDIS_URL is configured.
// Without this guard the lib's in-memory fallbacks (defined in `context.ts`)
// get unconditionally overwritten, so a dev environment without Redis would
// instantiate a node-redis client that retries forever in the background.
if (process.env['REDIS_URL']) {
  setGroceriesBoughtStore(redisGroceriesBoughtStore);
  setMealPlanDraftStore(redisMealPlanDraftStore);
}

export default createTrpcNitroHandler({
  router: appRouter,
  createContext,
});
