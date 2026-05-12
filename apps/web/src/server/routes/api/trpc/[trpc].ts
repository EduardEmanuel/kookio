import { createTrpcNitroHandler } from '@analogjs/trpc/server';

import {
  appRouter,
  createContext,
  setGroceriesBoughtStore,
  setSessionResolver,
} from '@kookio/server-trpc';
import { toSession } from '@kookio/server-auth';

import { redisGroceriesBoughtStore } from '../../../infra/groceries-bought';

setSessionResolver(toSession);

// Only swap in the Redis-backed bought-state when REDIS_URL is configured.
// Without this guard the lib's in-memory fallback (defined in `context.ts`)
// gets unconditionally overwritten, so a dev environment without Redis would
// instantiate a node-redis client that retries forever in the background.
if (process.env['REDIS_URL']) {
  setGroceriesBoughtStore(redisGroceriesBoughtStore);
}

export default createTrpcNitroHandler({
  router: appRouter,
  createContext,
});
