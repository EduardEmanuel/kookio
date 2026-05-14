import { InjectionToken } from '@angular/core';

import type {
  CookingSessionCompleteInput,
  CookingSessionCompleteOutput,
  CookingSessionStartInput,
  CookingSessionStartOutput,
} from '@kookio/prisma-client';

/**
 * Minimal tRPC surface required by the cook page. Lives on its own sub-path
 * (`@kookio/feature-recipes/cooking-trpc`) so `app.config.ts` can wire the
 * provider without importing recipe components — see `feature-pantry/trpc`
 * for the same pattern (memory: feedback_feature-lib-barrel-bloat.md).
 *
 * Recipe data is loaded SSR-side via `recipes.byId` (public), and pantry
 * availability is loaded client-side via `PANTRY_TRPC` — so this surface
 * only covers session start/complete.
 */
export interface CookingSessionTrpcClient {
  cookingSession: {
    start: {
      mutate(
        input: CookingSessionStartInput,
      ): Promise<CookingSessionStartOutput>;
    };
    complete: {
      mutate(
        input: CookingSessionCompleteInput,
      ): Promise<CookingSessionCompleteOutput>;
    };
  };
}

export const COOKING_SESSION_TRPC =
  new InjectionToken<CookingSessionTrpcClient>('COOKING_SESSION_TRPC');
