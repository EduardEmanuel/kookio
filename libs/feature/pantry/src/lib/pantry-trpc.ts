import { InjectionToken } from '@angular/core';

import type {
  IngredientSearchResult,
  MeasureUnit,
  PantryItemWithIngredient,
} from '@kookio/prisma-client';

/**
 * Input shape for `pantry.add`. Matches the server zod schema
 * (see `libs/server/trpc/.../pantry.router.ts`): `expiresAt` travels as an
 * ISO datetime string (or null) — the form converts the Material datepicker
 * `Date` value before calling the mutation.
 */
export interface PantryAddInput {
  ingredientCatalogId: string;
  quantity: number;
  unit: MeasureUnit;
  expiresAt?: string | null;
}

/** Partial update — only fields the caller actually changed. */
export interface PantryUpdateInput {
  id: string;
  quantity?: number;
  unit?: MeasureUnit;
  expiresAt?: string | null;
}

export interface PantryRemoveInput {
  id: string;
}

export interface PantrySearchIngredientsInput {
  query: string;
  limit?: number;
}

/**
 * Minimal tRPC surface required by the pantry feature: the store consumes
 * list / add / update / remove, the form consumes searchIngredients. A single
 * token keeps the wiring simple — the app provides the same `TrpcClientApp`
 * instance for all feature tokens.
 */
export interface PantryTrpcClient {
  pantry: {
    list: { query(): Promise<PantryItemWithIngredient[]> };
    add: {
      mutate(input: PantryAddInput): Promise<PantryItemWithIngredient>;
    };
    update: {
      mutate(input: PantryUpdateInput): Promise<PantryItemWithIngredient>;
    };
    remove: {
      mutate(input: PantryRemoveInput): Promise<{ id: string }>;
    };
    searchIngredients: {
      query(
        input: PantrySearchIngredientsInput,
      ): Promise<IngredientSearchResult[]>;
    };
  };
}

export const PANTRY_TRPC = new InjectionToken<PantryTrpcClient>('PANTRY_TRPC');
