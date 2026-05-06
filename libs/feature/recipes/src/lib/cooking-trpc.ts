import { InjectionToken } from '@angular/core';

import type {
  CookingRecipeForSession,
  CookingSessionCompleteInput,
  CookingSessionCompleteOutput,
  CookingSessionStartInput,
  CookingSessionStartOutput,
  GetRecipeForSessionInput,
} from '@kookio/prisma-client';

/**
 * Minimal tRPC surface required by the cook page and the ingredient
 * confirmation dialog. Lives on its own sub-path
 * (`@kookio/feature-recipes/cooking-trpc`) so `app.config.ts` can wire the
 * provider without importing recipe components — see `feature-pantry/trpc`
 * for the same pattern (memory: feedback_feature-lib-barrel-bloat.md).
 */
export interface CookingSessionTrpcClient {
  cookingSession: {
    getRecipeForSession: {
      query(input: GetRecipeForSessionInput): Promise<CookingRecipeForSession>;
    };
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
