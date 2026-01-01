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
import { ingredientLabelers } from '@kookio/shared-utility';

import { injectTrpcClient } from '../../../trpc-client';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly trpc = injectTrpcClient();

  public create = (
    ingredient: CreateOneIngredientDTO,
  ): Observable<CreateIngredientResultDTO> => {
    return this.trpc.ingredient.create.mutate(ingredient).pipe(
      catchError((error: Error) => {
        const label = ingredientLabelers.fromCreateData(ingredient.data);

        console.error(error, `❌ Error creating ingredient via tRPC: ${label}`);
        return of({} as CreateIngredientResultDTO);
      }),
    );
  };

  public createMany = (
    ingredients: CreateManyIngredientDTO,
  ): Observable<CreateManyIngredientResultDTO> => {
    return this.trpc.ingredient.createMany.mutate(ingredients).pipe(
      catchError((error: Error) => {
        const label = ingredientLabelers.fromCreateManyData(ingredients.data);

        console.error(
          error,
          `❌ Error creating many ingredients via tRPC: ${label}`,
        );
        return of({} as CreateManyIngredientResultDTO);
      }),
    );
  };

  public delete = (
    ingredient: DeleteOneIngredientDTO,
  ): Observable<DeleteIngredientResultDTO> => {
    return this.trpc.ingredient.delete.mutate(ingredient).pipe(
      catchError((error: Error) => {
        const label = ingredientLabelers.fromWhere(ingredient.where);

        console.error(error, `❌ Error deleting ingredient via tRPC: ${label}`);
        return of({} as DeleteIngredientResultDTO);
      }),
    );
  };

  public deleteMany = (
    ingredients: DeleteManyIngredientDTO,
  ): Observable<DeleteManyIngredientResultDTO> => {
    return this.trpc.ingredient.deleteMany.mutate(ingredients).pipe(
      catchError((error: Error) => {
        const label = ingredientLabelers.fromWhere(ingredients.where);

        console.error(
          error,
          `❌ Error deleting many ingredients via tRPC: ${label}`,
        );
        return of({} as DeleteManyIngredientResultDTO);
      }),
    );
  };

  public findMany = (
    ingredients: FindManyIngredientDTO,
  ): Observable<FindManyIngredientResultDTO> => {
    return this.trpc.ingredient.findMany.query(ingredients).pipe(
      catchError((error: Error) => {
        const label = ingredientLabelers.fromWhere(ingredients.where);

        console.error(
          error,
          `❌ Error finding many ingredients from tRPC: ${label}`,
        );
        return of({} as FindManyIngredientResultDTO);
      }),
    );
  };

  public findUnique = (
    ingredient: FindUniqueIngredientDTO,
  ): Observable<FindUniqueIngredientResultDTO> => {
    return this.trpc.ingredient.findUnique.query(ingredient).pipe(
      catchError((error: Error) => {
        const label = ingredientLabelers.fromWhere(ingredient.where);

        console.error(error, `❌ Error finding ingredient from tRPC: ${label}`);
        return of({} as FindUniqueIngredientResultDTO);
      }),
    );
  };

  public update = (
    ingredient: UpdateOneIngredientDTO,
  ): Observable<UpdateIngredientResultDTO> => {
    return this.trpc.ingredient.update.mutate(ingredient).pipe(
      catchError((error: Error) => {
        const label = ingredientLabelers.fromWhere(ingredient.where);

        console.error(error, `❌ Error updating ingredient via tRPC: ${label}`);
        return of({} as UpdateIngredientResultDTO);
      }),
    );
  };

  public updateMany = (
    ingredients: UpdateManyIngredientDTO,
  ): Observable<UpdateManyIngredientResultDTO> => {
    return this.trpc.ingredient.updateMany.mutate(ingredients).pipe(
      catchError((error: Error) => {
        const label = ingredientLabelers.fromWhere(ingredients.where);

        console.error(
          error,
          `❌ Error updating many ingredients via tRPC: ${label}`,
        );
        return of({} as UpdateManyIngredientResultDTO);
      }),
    );
  };
}
