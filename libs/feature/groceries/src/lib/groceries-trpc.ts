import { InjectionToken } from '@angular/core';

import type { IngredientCategory, MeasureUnit } from '@kookio/prisma-client';

/**
 * One row in the derived grocery list. Re-derived on every `list` call;
 * `isBought` is hydrated from the server-side bought-state store and
 * survives across devices for the TTL window.
 */
export interface GroceryItem {
  ingredientCatalogId: string;
  ingredientName: string;
  ingredientImageUrl: string | null;
  category: IngredientCategory | null;
  totalQuantity: number | null;
  unit: MeasureUnit | null;
  isBought: boolean;
}

export interface GroceriesStats {
  total: number;
  remaining: number;
}

export interface GroceriesToggleBoughtInput {
  ingredientCatalogId: string;
  /**
   * The bought-state the client wants the row to end up in. The optimistic
   * flip in the store already happened locally — the server uses this so a
   * Redis blip doesn't force the response to fake a toggle direction (the
   * server cannot read prior state if Redis is down).
   */
  intendedState: boolean;
}

export interface GroceriesToggleBoughtOutput {
  isBought: boolean;
  /**
   * False when bought-state could not be persisted (Redis unavailable, etc.).
   * The client keeps the local optimistic flip and shows a one-time snackbar
   * so the user knows their selections won't sync across devices this session.
   */
  persisted: boolean;
  total: number;
  remaining: number;
}

/**
 * Minimal tRPC surface required by the groceries feature: the page consumes
 * `list` + `toggleBought`; the dashboard widget consumes `stats`. A single
 * token covers all three so the wiring stays a single `provide` line in
 * `app.config.ts`.
 *
 * The interface declares Promise return types for ergonomics — at runtime
 * the analog client returns Observables. Consumers wrap with `from(...)` or
 * `firstValueFrom(from(...))` per the project pattern documented in
 * `.ai/11_trpc.md` ("Procedures return Observables — never await").
 */
export interface GroceriesTrpcClient {
  groceries: {
    list: { query(): Promise<GroceryItem[]> };
    stats: { query(): Promise<GroceriesStats> };
    toggleBought: {
      mutate(
        input: GroceriesToggleBoughtInput,
      ): Promise<GroceriesToggleBoughtOutput>;
    };
  };
}

export const GROCERIES_TRPC = new InjectionToken<GroceriesTrpcClient>(
  'GROCERIES_TRPC',
);
