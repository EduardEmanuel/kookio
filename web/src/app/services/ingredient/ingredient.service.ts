import { Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { Ingredient } from '@kookio/schema';
import { logger } from '@kookio/utils';

import { injectTrpcClient } from '@web/trpc-client';


@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly trpc = injectTrpcClient();

  public readonly ingredients = signal<Ingredient[]>([]);

  public createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.trpc.ingredient.create
      .mutate(ingredient)
      .pipe(
        tap(ingredient => this.ingredients.update(ingredients => [...ingredients, ingredient])),
        catchError((error: Error) => {
          logger.error(error, '❌ Error creating ingredient via tRPC:');
          return of({} as Ingredient); // return an empty ingredient on error
        }),
      );
  }

  public fetchIngredientsForUser(userId: string): Observable<Ingredient[]> {
    return this.trpc.ingredient.list
    .query({ userId })
    .pipe(
      tap(list => this.ingredients.set(list)),
      catchError((error: Error) => {
        logger.error(error, '❌ Error fetching ingredients from tRPC:');
        this.ingredients.set([]);
        return of([]); // return an empty array on error
      }),
    );
  }
}