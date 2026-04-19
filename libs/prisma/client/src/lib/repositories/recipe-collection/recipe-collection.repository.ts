import type {
  CountRecipeCollectionDTO,
  CountRecipeCollectionResultDTO,
  CreateOneRecipeCollectionDTO,
  CreateRecipeCollectionResultDTO,
  CreateManyRecipeCollectionDTO,
  CreateManyRecipeCollectionResultDTO,
  DeleteOneRecipeCollectionDTO,
  DeleteRecipeCollectionResultDTO,
  DeleteManyRecipeCollectionDTO,
  DeleteManyRecipeCollectionResultDTO,
  FindManyRecipeCollectionDTO,
  FindManyRecipeCollectionResultDTO,
  FindUniqueRecipeCollectionDTO,
  FindUniqueRecipeCollectionResultDTO,
  GroupByRecipeCollectionDTO,
  GroupByRecipeCollectionResultDTO,
  UpdateOneRecipeCollectionDTO,
  UpdateRecipeCollectionResultDTO,
  UpdateManyRecipeCollectionDTO,
  UpdateManyRecipeCollectionResultDTO,
  UpsertOneRecipeCollectionDTO,
  UpsertRecipeCollectionResultDTO,
} from '../../../dtos/recipe-collection';

import { prisma, withTxRetry } from '../../prisma-client';

export interface RecipeCollectionRepository {
  count(
    clause: CountRecipeCollectionDTO,
  ): Promise<CountRecipeCollectionResultDTO>;
  create(
    data: CreateOneRecipeCollectionDTO,
  ): Promise<CreateRecipeCollectionResultDTO>;
  createMany(
    data: CreateManyRecipeCollectionDTO,
  ): Promise<CreateManyRecipeCollectionResultDTO>;
  delete(
    clause: DeleteOneRecipeCollectionDTO,
  ): Promise<DeleteRecipeCollectionResultDTO>;
  deleteMany(
    clause: DeleteManyRecipeCollectionDTO,
  ): Promise<DeleteManyRecipeCollectionResultDTO>;
  findUnique(
    clause: FindUniqueRecipeCollectionDTO,
  ): Promise<FindUniqueRecipeCollectionResultDTO>;
  findMany(
    clause: FindManyRecipeCollectionDTO,
  ): Promise<FindManyRecipeCollectionResultDTO>;
  groupBy(
    clause: GroupByRecipeCollectionDTO,
  ): Promise<GroupByRecipeCollectionResultDTO>;
  update(
    clause: UpdateOneRecipeCollectionDTO,
  ): Promise<UpdateRecipeCollectionResultDTO>;
  updateMany(
    clause: UpdateManyRecipeCollectionDTO,
  ): Promise<UpdateManyRecipeCollectionResultDTO>;
  upsert(
    clause: UpsertOneRecipeCollectionDTO,
  ): Promise<UpsertRecipeCollectionResultDTO>;
}

export class PrismaRecipeCollectionRepository
  implements RecipeCollectionRepository
{
  count = (clause: CountRecipeCollectionDTO) => {
    return prisma.recipeCollection.count(
      clause,
    ) as unknown as Promise<CountRecipeCollectionResultDTO>;
  };

  create = (clause: CreateOneRecipeCollectionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeCollection.create(
          clause,
        ) as unknown as Promise<CreateRecipeCollectionResultDTO>,
    );
  };

  createMany = (clause: CreateManyRecipeCollectionDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipeCollection.createMany(clause));
  };

  delete = (clause: DeleteOneRecipeCollectionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeCollection.delete(
          clause,
        ) as unknown as Promise<DeleteRecipeCollectionResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyRecipeCollectionDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipeCollection.deleteMany(clause));
  };

  findMany = async (clause: FindManyRecipeCollectionDTO) => {
    const items = await prisma.recipeCollection.findMany(clause);
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
    } as FindManyRecipeCollectionResultDTO;
  };

  findUnique = (clause: FindUniqueRecipeCollectionDTO) => {
    return prisma.recipeCollection.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueRecipeCollectionResultDTO>;
  };

  groupBy = (clause: GroupByRecipeCollectionDTO) => {
    return prisma.recipeCollection.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByRecipeCollectionResultDTO>;
  };

  update = (clause: UpdateOneRecipeCollectionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeCollection.update(
          clause,
        ) as unknown as Promise<UpdateRecipeCollectionResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyRecipeCollectionDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipeCollection.updateMany(clause));
  };

  upsert = (clause: UpsertOneRecipeCollectionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeCollection.upsert(
          clause,
        ) as unknown as Promise<UpsertRecipeCollectionResultDTO>,
    );
  };
}
