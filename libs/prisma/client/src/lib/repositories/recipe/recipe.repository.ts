import type {
  CountRecipeDTO,
  CountRecipeResultDTO,
  CreateOneRecipeDTO,
  CreateRecipeResultDTO,
  CreateManyRecipeDTO,
  CreateManyRecipeResultDTO,
  DeleteOneRecipeDTO,
  DeleteRecipeResultDTO,
  DeleteManyRecipeDTO,
  DeleteManyRecipeResultDTO,
  FindManyRecipeDTO,
  FindManyRecipeResultDTO,
  FindUniqueRecipeDTO,
  FindUniqueRecipeResultDTO,
  GroupByRecipeDTO,
  GroupByRecipeResultDTO,
  UpdateOneRecipeDTO,
  UpdateRecipeResultDTO,
  UpdateManyRecipeDTO,
  UpdateManyRecipeResultDTO,
  UpsertOneRecipeDTO,
  UpsertRecipeResultDTO,
} from '../../../dtos/recipe';

import { prisma, withTxRetry } from '../../prisma-client';

export interface RecipeRepository {
  count(clause: CountRecipeDTO): Promise<CountRecipeResultDTO>;
  create(data: CreateOneRecipeDTO): Promise<CreateRecipeResultDTO>;
  createMany(data: CreateManyRecipeDTO): Promise<CreateManyRecipeResultDTO>;
  delete(clause: DeleteOneRecipeDTO): Promise<DeleteRecipeResultDTO>;
  deleteMany(clause: DeleteManyRecipeDTO): Promise<DeleteManyRecipeResultDTO>;
  findUnique(clause: FindUniqueRecipeDTO): Promise<FindUniqueRecipeResultDTO>;
  findMany(clause: FindManyRecipeDTO): Promise<FindManyRecipeResultDTO>;
  groupBy(clause: GroupByRecipeDTO): Promise<GroupByRecipeResultDTO>;
  update(clause: UpdateOneRecipeDTO): Promise<UpdateRecipeResultDTO>;
  updateMany(clause: UpdateManyRecipeDTO): Promise<UpdateManyRecipeResultDTO>;
  upsert(clause: UpsertOneRecipeDTO): Promise<UpsertRecipeResultDTO>;
}

export class PrismaRecipeRepository implements RecipeRepository {
  count = (clause: CountRecipeDTO) => {
    return prisma.recipe.count(
      clause,
    ) as unknown as Promise<CountRecipeResultDTO>;
  };

  create = (clause: CreateOneRecipeDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipe.create(clause) as unknown as Promise<CreateRecipeResultDTO>,
    );
  };

  createMany = (clause: CreateManyRecipeDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipe.createMany(clause));
  };

  delete = (clause: DeleteOneRecipeDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipe.delete(clause) as unknown as Promise<DeleteRecipeResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyRecipeDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipe.deleteMany(clause));
  };

  findMany = async (clause: FindManyRecipeDTO) => {
    const items = await prisma.recipe.findMany(clause);
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
    } as FindManyRecipeResultDTO;
  };

  findUnique = (clause: FindUniqueRecipeDTO) => {
    return prisma.recipe.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueRecipeResultDTO>;
  };

  groupBy = (clause: GroupByRecipeDTO) => {
    return prisma.recipe.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByRecipeResultDTO>;
  };

  update = (clause: UpdateOneRecipeDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipe.update(clause) as unknown as Promise<UpdateRecipeResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyRecipeDTO) => {
    return withTxRetry(prisma, (tx) => tx.recipe.updateMany(clause));
  };

  upsert = (clause: UpsertOneRecipeDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.recipe.upsert(clause) as unknown as Promise<UpsertRecipeResultDTO>,
    );
  };
}
