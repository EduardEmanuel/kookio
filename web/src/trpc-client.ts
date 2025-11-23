import { createTrpcClient } from '@analogjs/trpc';
import { inject } from '@angular/core';
import { SuperJSON } from 'superjson';

import { AppRouter } from './server/trpc/routers';

const url = '/api/trpc';

const trpcClient = createTrpcClient<AppRouter>({
  url,
  options: {
    transformer: SuperJSON,
  }
})

export const { provideTrpcClient } = trpcClient;
export const TrpcClientApp = trpcClient.TrpcClient;

export function injectTrpcClient() {
  return inject(TrpcClientApp);
}
