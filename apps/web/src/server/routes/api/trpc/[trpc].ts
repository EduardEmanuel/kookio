import { createTrpcNitroHandler } from '@analogjs/trpc/server';

import {
  appRouter,
  createContext,
  setSessionResolver,
} from '@kookio/server-trpc';
import { toSession } from '@kookio/server-auth';

setSessionResolver(toSession);

export default createTrpcNitroHandler({
  router: appRouter,
  createContext,
});
