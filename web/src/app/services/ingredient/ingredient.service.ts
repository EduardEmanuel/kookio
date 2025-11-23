import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import type {
  CreateOneIngredientDTO,
  CreateIngredientResultDTO,
  CreateManyIngredientDTO,
  CreateManyIngredientResultDTO,
  DeleteIngredientResultDTO,
  DeleteManyIngredientDTO,
  DeleteManyIngredientResultDTO,
  DeleteOneIngredientDTO,
  FindManyIngredientDTO,
  FindManyIngredientResultDTO,
  FindUniqueIngredientDTO,
  FindUniqueIngredientResultDTO,
  UpdateIngredientResultDTO,
  UpdateManyIngredientDTO,
  UpdateManyIngredientResultDTO,
  UpdateOneIngredientDTO,
} from '@kookio/prisma-validator';
import { logger } from '@kookio/utils';

import { injectTrpcClient } from '@web/trpc-client';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly trpc = injectTrpcClient();

  public create(ingredient: CreateOneIngredientDTO): Observable<CreateIngredientResultDTO> {
    return this.trpc.ingredient.create
      .mutate(ingredient)
      .pipe(
        catchError((error: Error) => {
          logger.error(error, `❌ Error creating ingredient via tRPC: ${ingredient.data.name}`);
          return of({} as CreateIngredientResultDTO);
        }),
      );
  }

  public createMany(ingredients: CreateManyIngredientDTO): Observable<CreateManyIngredientResultDTO> {
    const dataArray = Array.isArray(ingredients.data) ? ingredients.data : [ingredients.data];

    return this.trpc.ingredient.createMany
      .mutate(ingredients)
      .pipe(
        catchError((error: Error) => {
          ingredients.data
          const names = dataArray.map((i, index) => `${index}. ${i.name}`).join('; ');

          logger.error(error, `❌ Error creating many ingredients via tRPC: ${names}`);
          return of({} as CreateManyIngredientResultDTO);
        }),
      );
  }

  public delete(ingredient: DeleteOneIngredientDTO): Observable<DeleteIngredientResultDTO> {
    return this.trpc.ingredient.delete
      .mutate(ingredient)
      .pipe(
        catchError((error: Error) => {
          logger.error(error, `❌ Error deleting ingredient via tRPC: ${ingredient.where.name}`);
          return of({} as DeleteIngredientResultDTO);
        }),
      );
  }

  public deleteMany(ingredients: DeleteManyIngredientDTO): Observable<DeleteManyIngredientResultDTO> {
    return this.trpc.ingredient.deleteMany
      .mutate(ingredients)
      .pipe(
        catchError((error: Error) => {
          const name = ingredients.where?.name ?? 'undefined name';

          logger.error(error, `❌ Error deleting many ingredients via tRPC: ${name}`);
          return of({} as DeleteManyIngredientResultDTO);
        }),
      );
  }

  public findMany(ingredients: FindManyIngredientDTO): Observable<FindManyIngredientResultDTO> {
    return this.trpc.ingredient.findMany
      .query(ingredients)
      .pipe(
        catchError((error: Error) => {
          const name = ingredients.where?.name ?? 'undefined name';

          logger.error(error, `❌ Error finding many ingredients from tRPC: ${name}`);
          return of({} as FindManyIngredientResultDTO);
        }),
      );
  }

  public findUnique(ingredient: FindUniqueIngredientDTO): Observable<FindUniqueIngredientResultDTO> {
    return this.trpc.ingredient.findUnique
    .query(ingredient)
    .pipe(
      catchError((error: Error) => {
        logger.error(error, `❌ Error finding ingredient from tRPC: ${ingredient.where.name}`);
        return of({} as FindUniqueIngredientResultDTO);
      }),
    );
  }

  public update(ingredient: UpdateOneIngredientDTO): Observable<UpdateIngredientResultDTO> {
    return this.trpc.ingredient.update
      .mutate(ingredient)
      .pipe(
        catchError((error: Error) => {
          logger.error(error, `❌ Error updating ingredient via tRPC: ${ingredient.where.name}`);
          return of({} as UpdateIngredientResultDTO);
        }),
      );
  }

  public updateMany(ingredients: UpdateManyIngredientDTO): Observable<UpdateManyIngredientResultDTO> {
    return this.trpc.ingredient.updateMany
      .mutate(ingredients)
      .pipe(
        catchError((error: Error) => {
          const name = ingredients.where?.name ?? 'undefined name';

          logger.error(error, `❌ Error updating many ingredients via tRPC: ${name}`);
          return of({} as UpdateManyIngredientResultDTO);
        }),
      );
  }
}