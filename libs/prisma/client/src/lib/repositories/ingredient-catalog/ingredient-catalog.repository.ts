import type {
  CountIngredientCatalogDTO,
  CountIngredientCatalogResultDTO,
  CreateOneIngredientCatalogDTO,
  CreateIngredientCatalogResultDTO,
  CreateManyIngredientCatalogDTO,
  CreateManyIngredientCatalogResultDTO,
  DeleteOneIngredientCatalogDTO,
  DeleteIngredientCatalogResultDTO,
  DeleteManyIngredientCatalogDTO,
  DeleteManyIngredientCatalogResultDTO,
  FindManyIngredientCatalogDTO,
  FindManyIngredientCatalogResultDTO,
  FindUniqueIngredientCatalogDTO,
  FindUniqueIngredientCatalogResultDTO,
  GroupByIngredientCatalogDTO,
  GroupByIngredientCatalogResultDTO,
  UpdateOneIngredientCatalogDTO,
  UpdateIngredientCatalogResultDTO,
  UpdateManyIngredientCatalogDTO,
  UpdateManyIngredientCatalogResultDTO,
  UpsertOneIngredientCatalogDTO,
  UpsertIngredientCatalogResultDTO,
} from '../../../dtos/ingredient-catalog';

import { prisma, withTxRetry } from '../../prisma-client';

export interface IngredientCatalogRepository {
  count(
    clause: CountIngredientCatalogDTO,
  ): Promise<CountIngredientCatalogResultDTO>;
  create(
    data: CreateOneIngredientCatalogDTO,
  ): Promise<CreateIngredientCatalogResultDTO>;
  createMany(
    data: CreateManyIngredientCatalogDTO,
  ): Promise<CreateManyIngredientCatalogResultDTO>;
  delete(
    clause: DeleteOneIngredientCatalogDTO,
  ): Promise<DeleteIngredientCatalogResultDTO>;
  deleteMany(
    clause: DeleteManyIngredientCatalogDTO,
  ): Promise<DeleteManyIngredientCatalogResultDTO>;
  findUnique(
    clause: FindUniqueIngredientCatalogDTO,
  ): Promise<FindUniqueIngredientCatalogResultDTO>;
  findMany(
    clause: FindManyIngredientCatalogDTO,
  ): Promise<FindManyIngredientCatalogResultDTO>;
  groupBy(
    clause: GroupByIngredientCatalogDTO,
  ): Promise<GroupByIngredientCatalogResultDTO>;
  update(
    clause: UpdateOneIngredientCatalogDTO,
  ): Promise<UpdateIngredientCatalogResultDTO>;
  updateMany(
    clause: UpdateManyIngredientCatalogDTO,
  ): Promise<UpdateManyIngredientCatalogResultDTO>;
  upsert(
    clause: UpsertOneIngredientCatalogDTO,
  ): Promise<UpsertIngredientCatalogResultDTO>;
}

export class PrismaIngredientCatalogRepository
  implements IngredientCatalogRepository
{
  count = (clause: CountIngredientCatalogDTO) => {
    return prisma.ingredientCatalog.count(
      clause,
    ) as unknown as Promise<CountIngredientCatalogResultDTO>;
  };

  create = (clause: CreateOneIngredientCatalogDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.ingredientCatalog.create(
          clause,
        ) as unknown as Promise<CreateIngredientCatalogResultDTO>,
    );
  };

  createMany = (clause: CreateManyIngredientCatalogDTO) => {
    return withTxRetry(prisma, (tx) => tx.ingredientCatalog.createMany(clause));
  };

  delete = (clause: DeleteOneIngredientCatalogDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.ingredientCatalog.delete(
          clause,
        ) as unknown as Promise<DeleteIngredientCatalogResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyIngredientCatalogDTO) => {
    return withTxRetry(prisma, (tx) => tx.ingredientCatalog.deleteMany(clause));
  };

  findMany = async (clause: FindManyIngredientCatalogDTO) => {
    const items = await prisma.ingredientCatalog.findMany(clause);
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
    } as FindManyIngredientCatalogResultDTO;
  };

  findUnique = (clause: FindUniqueIngredientCatalogDTO) => {
    return prisma.ingredientCatalog.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueIngredientCatalogResultDTO>;
  };

  groupBy = (clause: GroupByIngredientCatalogDTO) => {
    return prisma.ingredientCatalog.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByIngredientCatalogResultDTO>;
  };

  update = (clause: UpdateOneIngredientCatalogDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.ingredientCatalog.update(
          clause,
        ) as unknown as Promise<UpdateIngredientCatalogResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyIngredientCatalogDTO) => {
    return withTxRetry(prisma, (tx) => tx.ingredientCatalog.updateMany(clause));
  };

  upsert = (clause: UpsertOneIngredientCatalogDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.ingredientCatalog.upsert(
          clause,
        ) as unknown as Promise<UpsertIngredientCatalogResultDTO>,
    );
  };
}
