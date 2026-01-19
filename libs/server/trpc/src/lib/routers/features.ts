import { readServerFeaturesFromEnv } from '@kookio/core-config';

import { procedure, router } from '../trpc';

export const featuresRouter = router({
  read: procedure.query(() => readServerFeaturesFromEnv()),
});
