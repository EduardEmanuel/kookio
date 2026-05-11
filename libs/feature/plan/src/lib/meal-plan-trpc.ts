import { InjectionToken } from '@angular/core';

import type {
  MealPlanSetInput,
  MealSlotWithRecipe,
} from '@kookio/prisma-client';

/**
 * Minimal tRPC surface required by the plan feature. PlanStore consumes
 * `mealPlan.getCurrent` + `mealPlan.setMealPlan`; the recipe picker
 * (desktop sidebar + mobile bottom sheet) talks to `RECIPES_TRPC.recipes.match`
 * directly so it can use the pantry-aware match feed, so the `recipes`
 * namespace is intentionally absent from this token.
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
}

export const MEAL_PLAN_TRPC = new InjectionToken<MealPlanTrpcClient>(
  'MEAL_PLAN_TRPC',
);
