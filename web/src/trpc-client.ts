import { AppRouter } from './server/trpc/routers';
import { createTrpcClient } from '@analogjs/trpc';
import { inject } from '@angular/core';
import { SuperJSON } from 'superjson';

const trpcClient = createTrpcClient<AppRouter>({
  url: '/api/trpc',
  options: {
    transformer: SuperJSON,
  }
})

export const { provideTrpcClient } = trpcClient;
export const TrpcClientApp = trpcClient.TrpcClient;

export function injectTrpcClient() {
  return inject(TrpcClientApp);
}
