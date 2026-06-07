import { InjectionToken } from '@angular/core';

import type { RecipeFeedPage, RecipeMatchPage } from '@kookio/prisma-client';
import type { RecipeMatchLevel } from '@kookio/shared-utility/recipe-match-level';

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

/**
 * Input shape for `recipes.match`. Mirrors the server contract: level is
 * required, cursor + limit follow the same pagination convention as feed.
 * `categoryIds` / `areaIds` are optional preference filters (sourced from the
 * user's onboarding choices) — when non-empty they restrict the match; omitted
 * leaves the result unfiltered.
 */
export interface RecipesMatchInput {
  level: RecipeMatchLevel;
  cursor?: string;
  limit?: number;
  categoryIds?: string[];
  areaIds?: string[];
}

/** Minimal tRPC surface required by the recipes UI. */
export interface RecipesTrpcClient {
  recipes: {
    feed: {
      query(input?: RecipesFeedInput): Promise<RecipeFeedPage>;
    };
    match: {
      query(input: RecipesMatchInput): Promise<RecipeMatchPage>;
    };
  };
}

export const RECIPES_TRPC = new InjectionToken<RecipesTrpcClient>(
  'RECIPES_TRPC',
);
