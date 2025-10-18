import { Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import type { IngredientResultType, Prisma } from '@kookio/prisma';
import { logger } from '@kookio/utils';

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@web/server/trpc/routers';
import { injectTrpcClient } from '@web/trpc-client';

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

type CreateIngredientInput = RouterInputs['ingredient']['create'];
type CreateIngredientOutput = RouterOutputs['ingredient']['create'];
type FindIngredientOutput = RouterOutputs['ingredient']['findUnique'];
type FindIngredientWhere = Prisma.IngredientWhereUniqueInput;

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly trpc = injectTrpcClient();

  public readonly ingredients = signal<IngredientResultType[]>([]);

  public createIngredient(ingredient: CreateIngredientInput): Observable<CreateIngredientOutput> {
    return this.trpc.ingredient.create
      .mutate(ingredient)
      .pipe(
        tap(ingredient => this.ingredients.update(ingredients => [...ingredients, ingredient])),
        catchError((error: Error) => {
          logger.error(error, '❌ Error creating ingredient via tRPC:');
          return of({} as IngredientResultType); // return an empty ingredient on error
        }),
      );
  }

  public fetchIngredient(where: FindIngredientWhere): Observable<FindIngredientOutput> {
    return this.trpc.ingredient.findUnique
    .query({ where })
    .pipe(
      tap(ingredient => this.ingredients.set(ingredient ? [ingredient] : [])),
      catchError((error: Error) => {
        logger.error(error, '❌ Error fetching ingredients from tRPC:');
        this.ingredients.set([]);
        return of(null as FindIngredientOutput);
      }),
    );
  }
}
