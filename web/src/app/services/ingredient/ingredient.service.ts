import { Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import type {
  CreateIngredientDTO,
  FindUniqueIngredientDTO,
  FindUniqueIngredientResultDTO,
  IngredientDTO,
} from '@kookio/prisma';
import { logger } from '@kookio/utils';

import { injectTrpcClient } from '@web/trpc-client';

type FindIngredientWhere = FindUniqueIngredientDTO['where'];

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly trpc = injectTrpcClient();

  public readonly ingredients = signal<IngredientDTO[]>([]);

  public createIngredient(ingredient: CreateIngredientDTO): Observable<IngredientDTO> {
    return this.trpc.ingredient.create
      .mutate(ingredient)
      .pipe(
        tap(ingredient => this.ingredients.update(ingredients => [...ingredients, ingredient])),
        catchError((error: Error) => {
          logger.error(error, '❌ Error creating ingredient via tRPC:');
          return of({} as IngredientDTO); // return an empty ingredient on error
        }),
      );
  }

  public fetchIngredient(where: FindIngredientWhere): Observable<FindUniqueIngredientResultDTO> {
    return this.trpc.ingredient.findUnique
    .query({ where })
    .pipe(
      tap(ingredient => this.ingredients.set(ingredient ? [ingredient] : [])),
      catchError((error: Error) => {
        logger.error(error, '❌ Error fetching ingredients from tRPC:');
        this.ingredients.set([]);
        return of(null as FindUniqueIngredientResultDTO);
      }),
    );
  }
}
