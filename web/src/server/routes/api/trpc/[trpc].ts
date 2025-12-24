import { createTrpcNitroHandler } from '@analogjs/trpc/server';

import { appRouter, createContext } from '@kookio/server-trpc';

export default createTrpcNitroHandler({
  router: appRouter,
  createContext,
});