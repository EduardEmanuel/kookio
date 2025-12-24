import { createTrpcClient } from '@analogjs/trpc';
import { inject } from '@angular/core';

import { AppRouter } from '@kookio/server-trpc-types';
import { TRPC_PATH, TRPC_TRANSFORMER } from '@kookio/server-trpc-configs';

const trpcClient = createTrpcClient<AppRouter>({
  url: TRPC_PATH,
  options: {
    transformer: TRPC_TRANSFORMER,
  },
});

export const { provideTrpcClient } = trpcClient;
export const TrpcClientApp = trpcClient.TrpcClient;

export function injectTrpcClient() {
  return inject(TrpcClientApp);
}
