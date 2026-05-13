import { InjectionToken } from '@angular/core';

import type { SavedRecipeRow } from '@kookio/prisma-client';

export interface ToggleSaveInput {
  recipeId: string;
}

export interface ToggleSaveResult {
  recipeId: string;
  saved: boolean;
}

/** Minimal tRPC surface required by `SavedStore` and `SaveToggleComponent`. */
export interface SavedTrpcClient {
  recipeCollection: {
    getSaved: { query(): Promise<SavedRecipeRow[]> };
    getSavedIds: { query(): Promise<string[]> };
    toggleSave: {
      mutate(input: ToggleSaveInput): Promise<ToggleSaveResult>;
    };
  };
}

export const SAVED_TRPC = new InjectionToken<SavedTrpcClient>('SAVED_TRPC');
