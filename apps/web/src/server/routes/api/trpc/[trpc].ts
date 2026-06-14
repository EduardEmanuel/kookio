import { createTrpcNitroHandler } from '@analogjs/trpc/server';
import { defineEventHandler } from 'h3';

import {
  appRouter,
  createContext,
  setGroceriesBoughtStore,
  setMealPlanDraftStore,
  setSessionResolver,
} from '@kookio/server-trpc';
import { resolveAuth } from '@kookio/server-auth';

import { redisGroceriesBoughtStore } from '../../../infra/groceries-bought';
import { redisMealPlanDraftStore } from '../../../infra/meal-plan-draft';
import { h3ApplyRateLimit } from '../../../infra/rate-limit';

setSessionResolver(resolveAuth);

// Only swap in the Redis-backed stores when REDIS_URL is configured.
// Without this guard the lib's in-memory fallbacks (defined in `context.ts`)
// get unconditionally overwritten, so a dev environment without Redis would
// instantiate a node-redis client that retries forever in the background.
if (process.env['REDIS_URL']) {
  setGroceriesBoughtStore(redisGroceriesBoughtStore);
  setMealPlanDraftStore(redisMealPlanDraftStore);
}

const trpcHandler = createTrpcNitroHandler({
  router: appRouter,
  createContext,
});

// Per-IP rate limiting (fail-open; enforced only in production via the
// h3ApplyRateLimit onlyInProd default). The public `auth.register` procedure
// is the one brute-forceable / enumerable surface, so it gets a tight bucket;
// every other call gets a generous backstop against gross abuse.
export default defineEventHandler(async (event) => {
  const isRegister = (event.path ?? '').includes('auth.register');
  await h3ApplyRateLimit(event, {
    bucket: isRegister ? 'trpc-register' : 'trpc',
    max: isRegister ? 10 : 300,
    windowSeconds: 60,
  });
  return trpcHandler(event);
});
