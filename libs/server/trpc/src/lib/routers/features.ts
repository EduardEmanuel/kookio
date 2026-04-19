import { readServerFeaturesFromEnv } from '@kookio/core-config';

import { publicProcedure, router } from '../trpc';

export const featuresRouter = router({
  read: publicProcedure.query(() => readServerFeaturesFromEnv()),
});
