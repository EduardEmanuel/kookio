import { InjectionToken } from '@angular/core';

import type {
  MealPlanSetInput,
  MealSlotWithRecipe,
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
 *
 * Both `mealPlan` procedures speak in terms of slot collections — there
 * is no "plan" entity in the data model anymore. The `mealPlan` namespace
 * survives because it matches the URL (`/plan`) and the user-facing label.
 */
export interface MealPlanTrpcClient {
  mealPlan: {
    getCurrent: { query(): Promise<MealSlotWithRecipe[]> };
    setMealPlan: {
      mutate(input: MealPlanSetInput): Promise<MealSlotWithRecipe[]>;
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
