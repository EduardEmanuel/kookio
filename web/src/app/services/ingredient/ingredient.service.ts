import { Injectable, signal } from '@angular/core';
import { effect } from '@angular/core';

import { injectTrpcClient } from '@web/trpc-client';

import { Ingredient } from '@kookio/schema';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly trpc = injectTrpcClient();

  public readonly ingredients = signal<Ingredient[]>([]);

  constructor() {
    effect(() => {
      const randomId = Math.floor(Math.random() * 10) + 1;
      const userId = `test-user-id-${randomId}`;

      this.fetchIngredientsForUser(userId);
    });
  }

  public fetchIngredientsForUser(userId: string) {
    return (this.trpc.ingredient as any).list
    .query({ userId })
    .then((list: Array<Ingredient>) => this.ingredients.set(list))
    .catch((error: Error) => {
        console.error('Error fetching ingredients from tRPC:', error);
        this.ingredients.set([]);
    });
  }
}