import { InjectionToken } from '@angular/core';

import type {
  MealPlanFull,
  MealPlanSetInput,
  RecipeFeedPage,
} from '@kookio/prisma-client';

/**
 * Input for the recipe sidebar / picker. Mirrors the public `recipes.feed`
 * tRPC procedure: cursor-paginated, newest-first. The plan UI does not need
 * the optional `categoryId` / `areaId` filters today, so they're omitted to
 * keep the surface tight.
 */
export interface RecipeFeedInput {
  cursor?: string;
  limit?: number;
}

/**
 * Minimal tRPC surface required by the plan feature: PlanStore consumes
 * `mealPlan.getCurrent` + `mealPlan.setMealPlan`; the recipe picker (sidebar
 * on desktop, bottom sheet on mobile) consumes `recipes.feed`.
 */
export interface MealPlanTrpcClient {
  mealPlan: {
    getCurrent: { query(): Promise<MealPlanFull> };
    setMealPlan: {
      mutate(input: MealPlanSetInput): Promise<MealPlanFull>;
    };
  };
  recipes: {
    feed: {
      query(input: RecipeFeedInput): Promise<RecipeFeedPage>;
    };
  };
}

export const MEAL_PLAN_TRPC = new InjectionToken<MealPlanTrpcClient>(
  'MEAL_PLAN_TRPC',
);
