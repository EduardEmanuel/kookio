import { InjectionToken } from '@angular/core';

import type { RecipeFeedPage } from '@kookio/prisma-client';

/**
 * Input shape for `recipes.feed`. Mirrors the server contract (cursor + limit
 * with reserved-for-future filters), but stays lib-local so the frontend
 * surface does not have to import server zod schemas.
 */
export interface RecipesFeedInput {
  cursor?: string;
  limit?: number;
  categoryId?: string;
  areaId?: string;
}

/** Minimal tRPC surface required by the feed UI. */
export interface RecipesTrpcClient {
  recipes: {
    feed: {
      query(input?: RecipesFeedInput): Promise<RecipeFeedPage>;
    };
  };
}

export const RECIPES_TRPC = new InjectionToken<RecipesTrpcClient>(
  'RECIPES_TRPC',
);
