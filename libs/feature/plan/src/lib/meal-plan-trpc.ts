import { InjectionToken } from '@angular/core';

import type {
  MealPlanSetInput,
  MealSlotType,
  MealSlotWithRecipe,
  RecipeFeedItem,
} from '@kookio/prisma-client';

/**
 * Wire shape for one slot in a persisted draft. Matches the local
 * `PlanSlot` in `plan.store.ts` byte-for-byte — declared here so the
 * draft contract is a documented surface of `MEAL_PLAN_TRPC` rather
 * than an implicit duplication.
 */
export interface MealPlanDraftSlot {
  date: string;
  slotType: MealSlotType;
  recipeId: string;
  servings: number;
  recipe: RecipeFeedItem | null;
}

/**
 * Persisted draft envelope. `savedAt` is epoch-ms and feeds into the
 * client's three-way reconciliation (local draft vs remote draft vs
 * server `serverUpdatedAt`) so the freshest state wins on restore.
 */
export interface MealPlanDraftPayload {
  slots: MealPlanDraftSlot[];
  savedAt: number;
}

/**
 * Returned by setDraft / clearDraft so the client knows if the
 * Redis-backed remote store was reachable. False means the local
 * mutation succeeded (localStorage write) but the cross-device sync
 * silently lapsed for this hop — same `persisted: false` shape as
 * `groceries.toggleBought`. Client treats it as "session-local only,
 * other devices won't see this until the store comes back".
 */
export interface MealPlanDraftPersistedResult {
  persisted: boolean;
}

/**
 * Minimal tRPC surface required by the plan feature. PlanStore consumes
 * `mealPlan.getCurrent` + `mealPlan.setMealPlan`; the recipe picker
 * (desktop sidebar + mobile bottom sheet) talks to `RECIPES_TRPC.recipes.match`
 * directly so it can use the pantry-aware match feed, so the `recipes`
 * namespace is intentionally absent from this token.
 *
 * The draft procedures (`getDraft` / `setDraft` / `clearDraft`) back
 * the cross-device draft sync. They sit alongside the localStorage
 * write in `PlanStore` (belt-and-suspenders) — Redis owns cross-device,
 * localStorage owns offline + zero-latency-write.
 *
 * Both `mealPlan` slot procedures speak in terms of slot collections —
 * there is no "plan" entity in the data model anymore. The `mealPlan`
 * namespace survives because it matches the URL (`/plan`) and the
 * user-facing label.
 */
export interface MealPlanTrpcClient {
  mealPlan: {
    getCurrent: { query(): Promise<MealSlotWithRecipe[]> };
    setMealPlan: {
      mutate(input: MealPlanSetInput): Promise<MealSlotWithRecipe[]>;
    };
    getDraft: { query(): Promise<MealPlanDraftPayload | null> };
    setDraft: {
      mutate(
        input: MealPlanDraftPayload,
      ): Promise<MealPlanDraftPersistedResult>;
    };
    clearDraft: { mutate(): Promise<MealPlanDraftPersistedResult> };
  };
}

export const MEAL_PLAN_TRPC = new InjectionToken<MealPlanTrpcClient>(
  'MEAL_PLAN_TRPC',
);
