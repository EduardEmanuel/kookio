import type {
  CountRecipeTagDTO,
  CountRecipeTagResultDTO,
  CreateOneRecipeTagDTO,
  CreateRecipeTagResultDTO,
  CreateManyRecipeTagDTO,
  CreateManyRecipeTagResultDTO,
  DeleteOneRecipeTagDTO,
  DeleteRecipeTagResultDTO,
  DeleteManyRecipeTagDTO,
  DeleteManyRecipeTagResultDTO,
  FindManyRecipeTagDTO,
  FindManyRecipeTagResultDTO,
  FindUniqueRecipeTagDTO,
  FindUniqueRecipeTagResultDTO,
  GroupByRecipeTagDTO,
  GroupByRecipeTagResultDTO,
  UpdateOneRecipeTagDTO,
  UpdateRecipeTagResultDTO,
  UpdateManyRecipeTagDTO,
  UpdateManyRecipeTagResultDTO,
  UpsertOneRecipeTagDTO,
  UpsertRecipeTagResultDTO,
} from '../../../dtos/recipe-tag';

import { prisma, withTxRetry } from '../../prisma-client';

export interface RecipeTagRepository {
  count(clause: CountRecipeTagDTO): Promise<CountRecipeTagResultDTO>;
  create(data: CreateOneRecipeTagDTO): Promise<CreateRecipeTagResultDTO>;
  createMany(
    data: CreateManyRecipeTagDTO,
  ): Promise<CreateManyRecipeTagResultDTO>;
  delete(clause: DeleteOneRecipeTagDTO): Promise<DeleteRecipeTagResultDTO>;
  deleteMany(
    clause: DeleteManyRecipeTagDTO,
  ): Promise<DeleteManyRecipeTagResultDTO>;
  findUnique(
    clause: FindUniqueRecipeTagDTO,
  ): Promise<FindUniqueRecipeTagResultDTO>;
  findMany(clause: FindManyRecipeTagDTO): Promise<FindManyRecipeTagResultDTO>;
  groupBy(clause: GroupByRecipeTagDTO): Promise<GroupByRecipeTagResultDTO>;
  update(clause: UpdateOneRecipeTagDTO): Promise<UpdateRecipeTagResultDTO>;
  updateMany(
    clause: UpdateManyRecipeTagDTO,
  ): Promise<UpdateManyRecipeTagResultDTO>;
  upsert(clause: UpsertOneRecipeTagDTO): Promise<UpsertRecipeTagResultDTO>;
}

export class PrismaRecipeTagRepository implements RecipeTagRepository {
  count = (clause: CountRecipeTagDTO) => {
    return prisma.recipeTag.count(
      clause,
    ) as unknown as Promise<CountRecipeTagResultDTO>;
  };

  create = (clause: CreateOneRecipeTagDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeTag.create(
          clause,
        ) as unknown as Promise<CreateRecipeTagResultDTO>,
    );
  };

  createMany = (clause: CreateManyRecipeTagDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipeTag.createMany(clause));
  };

  delete = (clause: DeleteOneRecipeTagDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeTag.delete(
          clause,
        ) as unknown as Promise<DeleteRecipeTagResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyRecipeTagDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipeTag.deleteMany(clause));
  };

  findMany = async (clause: FindManyRecipeTagDTO) => {
    const items = await prisma.recipeTag.findMany(clause);
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
    } as FindManyRecipeTagResultDTO;
  };

  findUnique = (clause: FindUniqueRecipeTagDTO) => {
    return prisma.recipeTag.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueRecipeTagResultDTO>;
  };

  groupBy = (clause: GroupByRecipeTagDTO) => {
    return prisma.recipeTag.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByRecipeTagResultDTO>;
  };

  update = (clause: UpdateOneRecipeTagDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeTag.update(
          clause,
        ) as unknown as Promise<UpdateRecipeTagResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyRecipeTagDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipeTag.updateMany(clause));
  };

  upsert = (clause: UpsertOneRecipeTagDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipeTag.upsert(
          clause,
        ) as unknown as Promise<UpsertRecipeTagResultDTO>,
    );
  };
}
