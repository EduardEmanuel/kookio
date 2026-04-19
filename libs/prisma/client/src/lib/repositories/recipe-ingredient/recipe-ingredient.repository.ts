import type {
  CountRecipeIngredientDTO,
  CountRecipeIngredientResultDTO,
  CreateOneRecipeIngredientDTO,
  CreateRecipeIngredientResultDTO,
  CreateManyRecipeIngredientDTO,
  CreateManyRecipeIngredientResultDTO,
  DeleteOneRecipeIngredientDTO,
  DeleteRecipeIngredientResultDTO,
  DeleteManyRecipeIngredientDTO,
  DeleteManyRecipeIngredientResultDTO,
  FindManyRecipeIngredientDTO,
  FindManyRecipeIngredientResultDTO,
  FindUniqueRecipeIngredientDTO,
  FindUniqueRecipeIngredientResultDTO,
  GroupByRecipeIngredientDTO,
  GroupByRecipeIngredientResultDTO,
  UpdateOneRecipeIngredientDTO,
  UpdateRecipeIngredientResultDTO,
  UpdateManyRecipeIngredientDTO,
  UpdateManyRecipeIngredientResultDTO,
  UpsertOneRecipeIngredientDTO,
  UpsertRecipeIngredientResultDTO,
} from '../../../dtos/recipe-ingredient';

import { prisma, withTxRetry } from '../../prisma-client';

export interface RecipeIngredientRepository {
  count(
    clause: CountRecipeIngredientDTO,
  ): Promise<CountRecipeIngredientResultDTO>;
  create(
    data: CreateOneRecipeIngredientDTO,
  ): Promise<CreateRecipeIngredientResultDTO>;
  createMany(
    data: CreateManyRecipeIngredientDTO,
  ): Promise<CreateManyRecipeIngredientResultDTO>;
  delete(
    clause: DeleteOneRecipeIngredientDTO,
  ): Promise<DeleteRecipeIngredientResultDTO>;
  deleteMany(
    clause: DeleteManyRecipeIngredientDTO,
  ): Promise<DeleteManyRecipeIngredientResultDTO>;
  findUnique(
    clause: FindUniqueRecipeIngredientDTO,
  ): Promise<FindUniqueRecipeIngredientResultDTO>;
  findMany(
    clause: FindManyRecipeIngredientDTO,
  ): Promise<FindManyRecipeIngredientResultDTO>;
  groupBy(
    clause: GroupByRecipeIngredientDTO,
  ): Promise<GroupByRecipeIngredientResultDTO>;
  update(
    clause: UpdateOneRecipeIngredientDTO,
  ): Promise<UpdateRecipeIngredientResultDTO>;
  updateMany(
    clause: UpdateManyRecipeIngredientDTO,
  ): Promise<UpdateManyRecipeIngredientResultDTO>;
  upsert(
    clause: UpsertOneRecipeIngredientDTO,
  ): Promise<UpsertRecipeIngredientResultDTO>;
}

export class PrismaRecipeIngredientRepository
  implements RecipeIngredientRepository
{
  count = (clause: CountRecipeIngredientDTO) => {
    return prisma.recipeIngredient.count(
      clause,
    ) as unknown as Promise<CountRecipeIngredientResultDTO>;
  };

  create = (clause: CreateOneRecipeIngredientDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeIngredient.create(
          clause,
        ) as unknown as Promise<CreateRecipeIngredientResultDTO>,
    );
  };

  createMany = (clause: CreateManyRecipeIngredientDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipeIngredient.createMany(clause));
  };

  delete = (clause: DeleteOneRecipeIngredientDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeIngredient.delete(
          clause,
        ) as unknown as Promise<DeleteRecipeIngredientResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyRecipeIngredientDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipeIngredient.deleteMany(clause));
  };

  findMany = async (clause: FindManyRecipeIngredientDTO) => {
    const items = await prisma.recipeIngredient.findMany(clause);
    return {
      data: items,
      pagination: {
        page: 1,
        pageSize: items.length,
        total: items.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    } as FindManyRecipeIngredientResultDTO;
  };

  findUnique = (clause: FindUniqueRecipeIngredientDTO) => {
    return prisma.recipeIngredient.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueRecipeIngredientResultDTO>;
  };

  groupBy = (clause: GroupByRecipeIngredientDTO) => {
    return prisma.recipeIngredient.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByRecipeIngredientResultDTO>;
  };

  update = (clause: UpdateOneRecipeIngredientDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeIngredient.update(
          clause,
        ) as unknown as Promise<UpdateRecipeIngredientResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyRecipeIngredientDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipeIngredient.updateMany(clause));
  };

  upsert = (clause: UpsertOneRecipeIngredientDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeIngredient.upsert(
          clause,
        ) as unknown as Promise<UpsertRecipeIngredientResultDTO>,
    );
  };
}
