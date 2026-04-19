import type {
  CountMealCategoryDTO,
  CountMealCategoryResultDTO,
  CreateOneMealCategoryDTO,
  CreateMealCategoryResultDTO,
  CreateManyMealCategoryDTO,
  CreateManyMealCategoryResultDTO,
  DeleteOneMealCategoryDTO,
  DeleteMealCategoryResultDTO,
  DeleteManyMealCategoryDTO,
  DeleteManyMealCategoryResultDTO,
  FindManyMealCategoryDTO,
  FindManyMealCategoryResultDTO,
  FindUniqueMealCategoryDTO,
  FindUniqueMealCategoryResultDTO,
  GroupByMealCategoryDTO,
  GroupByMealCategoryResultDTO,
  UpdateOneMealCategoryDTO,
  UpdateMealCategoryResultDTO,
  UpdateManyMealCategoryDTO,
  UpdateManyMealCategoryResultDTO,
  UpsertOneMealCategoryDTO,
  UpsertMealCategoryResultDTO,
} from '../../../dtos/meal-category';

import { prisma, withTxRetry } from '../../prisma-client';

export interface MealCategoryRepository {
  count(clause: CountMealCategoryDTO): Promise<CountMealCategoryResultDTO>;
  create(data: CreateOneMealCategoryDTO): Promise<CreateMealCategoryResultDTO>;
  createMany(
    data: CreateManyMealCategoryDTO,
  ): Promise<CreateManyMealCategoryResultDTO>;
  delete(
    clause: DeleteOneMealCategoryDTO,
  ): Promise<DeleteMealCategoryResultDTO>;
  deleteMany(
    clause: DeleteManyMealCategoryDTO,
  ): Promise<DeleteManyMealCategoryResultDTO>;
  findUnique(
    clause: FindUniqueMealCategoryDTO,
  ): Promise<FindUniqueMealCategoryResultDTO>;
  findMany(
    clause: FindManyMealCategoryDTO,
  ): Promise<FindManyMealCategoryResultDTO>;
  groupBy(
    clause: GroupByMealCategoryDTO,
  ): Promise<GroupByMealCategoryResultDTO>;
  update(
    clause: UpdateOneMealCategoryDTO,
  ): Promise<UpdateMealCategoryResultDTO>;
  updateMany(
    clause: UpdateManyMealCategoryDTO,
  ): Promise<UpdateManyMealCategoryResultDTO>;
  upsert(
    clause: UpsertOneMealCategoryDTO,
  ): Promise<UpsertMealCategoryResultDTO>;
}

export class PrismaMealCategoryRepository implements MealCategoryRepository {
  count = (clause: CountMealCategoryDTO) => {
    return prisma.mealCategory.count(
      clause,
    ) as unknown as Promise<CountMealCategoryResultDTO>;
  };

  create = (clause: CreateOneMealCategoryDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealCategory.create(
          clause,
        ) as unknown as Promise<CreateMealCategoryResultDTO>,
    );
  };

  createMany = (clause: CreateManyMealCategoryDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealCategory.createMany(clause));
  };

  delete = (clause: DeleteOneMealCategoryDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealCategory.delete(
          clause,
        ) as unknown as Promise<DeleteMealCategoryResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyMealCategoryDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealCategory.deleteMany(clause));
  };

  findMany = async (clause: FindManyMealCategoryDTO) => {
    const items = await prisma.mealCategory.findMany(clause);
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
    } as FindManyMealCategoryResultDTO;
  };

  findUnique = (clause: FindUniqueMealCategoryDTO) => {
    return prisma.mealCategory.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueMealCategoryResultDTO>;
  };

  groupBy = (clause: GroupByMealCategoryDTO) => {
    return prisma.mealCategory.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByMealCategoryResultDTO>;
  };

  update = (clause: UpdateOneMealCategoryDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealCategory.update(
          clause,
        ) as unknown as Promise<UpdateMealCategoryResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyMealCategoryDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealCategory.updateMany(clause));
  };

  upsert = (clause: UpsertOneMealCategoryDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealCategory.upsert(
          clause,
        ) as unknown as Promise<UpsertMealCategoryResultDTO>,
    );
  };
}
