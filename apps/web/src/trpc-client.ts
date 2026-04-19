import { createTrpcClient } from '@analogjs/trpc';
import { type WritableSignal, inject, signal } from '@angular/core';
import { httpBatchLink } from '@trpc/client';

import { AppRouter } from '@kookio/server-trpc/types';
import { TRPC_PATH, TRPC_TRANSFORMER } from '@kookio/server-trpc/configs';
import { getResolvedAuth } from '@kookio/feature-auth';

const FIVE_MINUTES_MS = 5 * 60 * 1000;

/**
 * Request headers signal — written by AppComponent when idToken changes,
 * read by httpBatchLink on every request (reactive per-request headers).
 */
export const TrpcHeaders: WritableSignal<Record<string, string>> = signal({});

/**
 * Resolves a relative URL to an absolute one when running in SSR (no window).
 * Mirrors the logic in @analogjs/trpc's built-in customFetch so that
 * server-side tRPC calls don't fail with ERR_INVALID_URL.
 */
const resolveUrl = (
  input: Parameters<typeof fetch>[0],
): Parameters<typeof fetch>[0] => {
  if (typeof window !== 'undefined') return input;

  const host =
    process.env['NITRO_HOST'] ?? process.env['ANALOG_HOST'] ?? 'localhost';
  const port =
    process.env['NITRO_PORT'] ?? process.env['ANALOG_PORT'] ?? '4205';
  const base = `http://${host}:${port}`;

  if (input instanceof Request) {
    return new Request(new URL(input.url, base).toString(), input);
  }
  if (input instanceof URL) {
    return new URL(input.pathname + input.search + input.hash, base);
  }
  // string — only rewrite if it looks like a relative path
  if (typeof input === 'string' && input.startsWith('/')) {
    return new URL(input, base).toString();
  }
  return input;
};

/**
 * PASUL 2 — Pre-request token check.
 * If the current token expires in < 5 minutes, force-refresh it and replace
 * the Authorization header before the request goes out. Also updates TrpcHeaders
 * so subsequent requests use the new token without another round-trip.
 *
 * PASUL 3 — 401 retry.
 * If the server returns UNAUTHORIZED, force-refresh the token once and retry.
 * A second 401 is returned as-is — no infinite loop.
 */
export const authAwareFetch: typeof fetch = async (url, options) => {
  url = resolveUrl(url);
  const auth = getResolvedAuth();

  if (auth?.currentUser) {
    // PASUL 2: Proactive refresh if token expires within 5 minutes.
    try {
      const tokenResult = await auth.currentUser.getIdTokenResult();
      const expiresAt = new Date(tokenResult.expirationTime).getTime();

      if (expiresAt - Date.now() < FIVE_MINUTES_MS) {
        const newToken = await auth.currentUser.getIdToken(
          /* forceRefresh */ true,
        );
        const headers = new Headers((options?.headers ?? {}) as HeadersInit);
        headers.set('Authorization', `Bearer ${newToken}`);
        options = { ...(options ?? {}), headers };
        // Keep signal in sync so future requests also use the new token.
        TrpcHeaders.set({ Authorization: `Bearer ${newToken}` });
      }
    } catch {
      // Token check failed — proceed with existing headers.
    }
  }

  let response = await fetch(url, options);

  // PASUL 3: On 401 — force-refresh once and retry.
  if (response.status === 401 && auth?.currentUser) {
    try {
      const newToken = await auth.currentUser.getIdToken(
        /* forceRefresh */ true,
      );
      const headers = new Headers((options?.headers ?? {}) as HeadersInit);
      headers.set('Authorization', `Bearer ${newToken}`);
      const retryOptions = { ...(options ?? {}), headers };
      response = await fetch(url, retryOptions);
      // Keep signal in sync after successful retry.
      TrpcHeaders.set({ Authorization: `Bearer ${newToken}` });
    } catch {
      // Refresh or retry failed — return the original 401.
    }
  }

  return response;
};

const trpcClient = createTrpcClient<AppRouter>({
  url: TRPC_PATH,
  options: {
    transformer: TRPC_TRANSFORMER,
    links: [
      httpBatchLink({
        url: TRPC_PATH,
        headers: () => TrpcHeaders(),
        fetch: authAwareFetch,
      }),
    ],
  },
});

export const { provideTrpcClient } = trpcClient;
export const TrpcClientApp = trpcClient.TrpcClient;

export const injectTrpcClient = () => {
  return inject(TrpcClientApp);
};
