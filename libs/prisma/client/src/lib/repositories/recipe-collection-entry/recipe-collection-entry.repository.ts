import type {
  CountRecipeCollectionEntryDTO,
  CountRecipeCollectionEntryResultDTO,
  CreateOneRecipeCollectionEntryDTO,
  CreateRecipeCollectionEntryResultDTO,
  CreateManyRecipeCollectionEntryDTO,
  CreateManyRecipeCollectionEntryResultDTO,
  DeleteOneRecipeCollectionEntryDTO,
  DeleteRecipeCollectionEntryResultDTO,
  DeleteManyRecipeCollectionEntryDTO,
  DeleteManyRecipeCollectionEntryResultDTO,
  FindManyRecipeCollectionEntryDTO,
  FindManyRecipeCollectionEntryResultDTO,
  FindUniqueRecipeCollectionEntryDTO,
  FindUniqueRecipeCollectionEntryResultDTO,
  GroupByRecipeCollectionEntryDTO,
  GroupByRecipeCollectionEntryResultDTO,
  UpdateOneRecipeCollectionEntryDTO,
  UpdateRecipeCollectionEntryResultDTO,
  UpdateManyRecipeCollectionEntryDTO,
  UpdateManyRecipeCollectionEntryResultDTO,
  UpsertOneRecipeCollectionEntryDTO,
  UpsertRecipeCollectionEntryResultDTO,
} from '../../../dtos/recipe-collection-entry';

import { prisma, withTxRetry } from '../../prisma-client';

export interface RecipeCollectionEntryRepository {
  count(
    clause: CountRecipeCollectionEntryDTO,
  ): Promise<CountRecipeCollectionEntryResultDTO>;
  create(
    data: CreateOneRecipeCollectionEntryDTO,
  ): Promise<CreateRecipeCollectionEntryResultDTO>;
  createMany(
    data: CreateManyRecipeCollectionEntryDTO,
  ): Promise<CreateManyRecipeCollectionEntryResultDTO>;
  delete(
    clause: DeleteOneRecipeCollectionEntryDTO,
  ): Promise<DeleteRecipeCollectionEntryResultDTO>;
  deleteMany(
    clause: DeleteManyRecipeCollectionEntryDTO,
  ): Promise<DeleteManyRecipeCollectionEntryResultDTO>;
  findUnique(
    clause: FindUniqueRecipeCollectionEntryDTO,
  ): Promise<FindUniqueRecipeCollectionEntryResultDTO>;
  findMany(
    clause: FindManyRecipeCollectionEntryDTO,
  ): Promise<FindManyRecipeCollectionEntryResultDTO>;
  groupBy(
    clause: GroupByRecipeCollectionEntryDTO,
  ): Promise<GroupByRecipeCollectionEntryResultDTO>;
  update(
    clause: UpdateOneRecipeCollectionEntryDTO,
  ): Promise<UpdateRecipeCollectionEntryResultDTO>;
  updateMany(
    clause: UpdateManyRecipeCollectionEntryDTO,
  ): Promise<UpdateManyRecipeCollectionEntryResultDTO>;
  upsert(
    clause: UpsertOneRecipeCollectionEntryDTO,
  ): Promise<UpsertRecipeCollectionEntryResultDTO>;
}

export class PrismaRecipeCollectionEntryRepository
  implements RecipeCollectionEntryRepository
{
  count = (clause: CountRecipeCollectionEntryDTO) => {
    return prisma.recipeCollectionEntry.count(
      clause,
    ) as unknown as Promise<CountRecipeCollectionEntryResultDTO>;
  };

  create = (clause: CreateOneRecipeCollectionEntryDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeCollectionEntry.create(
          clause,
        ) as unknown as Promise<CreateRecipeCollectionEntryResultDTO>,
    );
  };

  createMany = (clause: CreateManyRecipeCollectionEntryDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.recipeCollectionEntry.createMany(clause),
    );
  };

  delete = (clause: DeleteOneRecipeCollectionEntryDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeCollectionEntry.delete(
          clause,
        ) as unknown as Promise<DeleteRecipeCollectionEntryResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyRecipeCollectionEntryDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.recipeCollectionEntry.deleteMany(clause),
    );
  };

  findMany = async (clause: FindManyRecipeCollectionEntryDTO) => {
    const items = await prisma.recipeCollectionEntry.findMany(clause);
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
    } as FindManyRecipeCollectionEntryResultDTO;
  };

  findUnique = (clause: FindUniqueRecipeCollectionEntryDTO) => {
    return prisma.recipeCollectionEntry.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueRecipeCollectionEntryResultDTO>;
  };

  groupBy = (clause: GroupByRecipeCollectionEntryDTO) => {
    return prisma.recipeCollectionEntry.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByRecipeCollectionEntryResultDTO>;
  };

  update = (clause: UpdateOneRecipeCollectionEntryDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeCollectionEntry.update(
          clause,
        ) as unknown as Promise<UpdateRecipeCollectionEntryResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyRecipeCollectionEntryDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.recipeCollectionEntry.updateMany(clause),
    );
  };

  upsert = (clause: UpsertOneRecipeCollectionEntryDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeCollectionEntry.upsert(
          clause,
        ) as unknown as Promise<UpsertRecipeCollectionEntryResultDTO>,
    );
  };
}
