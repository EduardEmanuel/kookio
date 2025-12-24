
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

import { injectTrpcClient } from '../../../trpc-client';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly trpc = injectTrpcClient();

  private labelFromWhere(where: any): string {
  if (!where) return 'ingredient(unknown)';
  if (where.userId_name?.userId && where.userId_name?.name) {
    return `ingredient(user=${where.userId_name.userId}, name=${where.userId_name.name})`;
  }
  if (where.id) return `ingredient(id=${where.id})`;
  if (where.name) return `ingredient(name=${where.name})`;
  return 'ingredient(unknown)';
}

  public create(ingredient: CreateOneIngredientDTO): Observable<CreateIngredientResultDTO> {
    return this.trpc.ingredient.create
      .mutate(ingredient)
      .pipe(
        catchError((error: Error) => {
          console.error(error, `❌ Error creating ingredient via tRPC: ${ingredient.data.name}`);
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
          const names = dataArray.map((i, index) => `${index}. ${i.name}`).join('; ');

          console.error(error, `❌ Error creating many ingredients via tRPC: ${names}`);
          return of({} as CreateManyIngredientResultDTO);
        }),
      );
  }

  public delete(ingredient: DeleteOneIngredientDTO): Observable<DeleteIngredientResultDTO> {
  const label = this.labelFromWhere(ingredient.where);

  return this.trpc.ingredient.delete.mutate(ingredient).pipe(
    catchError((error: Error) => {
      console.error(error, `❌ Error deleting ingredient via tRPC: ${label}`);
      return of({} as DeleteIngredientResultDTO);
    }),
  );
}

  public deleteMany(ingredients: DeleteManyIngredientDTO): Observable<DeleteManyIngredientResultDTO> {
    return this.trpc.ingredient.deleteMany
      .mutate(ingredients)
      .pipe(
        catchError((error: Error) => {
          const label = this.labelFromWhere(ingredients.where);

          console.error(error, `❌ Error deleting many ingredients via tRPC: ${label}`);
          return of({} as DeleteManyIngredientResultDTO);
        }),
      );
  }

  public findMany(ingredients: FindManyIngredientDTO): Observable<FindManyIngredientResultDTO> {
    return this.trpc.ingredient.findMany
      .query(ingredients)
      .pipe(
        catchError((error: Error) => {
          const label = this.labelFromWhere(ingredients.where);

          console.error(error, `❌ Error finding many ingredients from tRPC: ${label}`);
          return of({} as FindManyIngredientResultDTO);
        }),
      );
  }

  public findUnique(ingredient: FindUniqueIngredientDTO): Observable<FindUniqueIngredientResultDTO> {
  const label = this.labelFromWhere(ingredient.where);

  return this.trpc.ingredient.findUnique
    .query(ingredient)
    .pipe(
      catchError((error: Error) => {
        console.error(error, `❌ Error finding ingredient from tRPC: ${label}`);
        return of({} as FindUniqueIngredientResultDTO);
      }),
    );
}

  public update(ingredient: UpdateOneIngredientDTO): Observable<UpdateIngredientResultDTO> {
  const label = this.labelFromWhere(ingredient.where);

  return this.trpc.ingredient.update.mutate(ingredient).pipe(
    catchError((error: Error) => {
      console.error(error, `❌ Error updating ingredient via tRPC: ${label}`);
      return of({} as UpdateIngredientResultDTO);
    }),
  );
}

  public updateMany(ingredients: UpdateManyIngredientDTO): Observable<UpdateManyIngredientResultDTO> {
    return this.trpc.ingredient.updateMany
      .mutate(ingredients)
      .pipe(
        catchError((error: Error) => {
          const label = this.labelFromWhere(ingredients.where);

          console.error(error, `❌ Error updating many ingredients via tRPC: ${label}`);
          return of({} as UpdateManyIngredientResultDTO);
        }),
      );
  }
}
