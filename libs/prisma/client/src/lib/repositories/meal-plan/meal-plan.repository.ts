import type {
  CountMealPlanDTO,
  CountMealPlanResultDTO,
  CreateOneMealPlanDTO,
  CreateMealPlanResultDTO,
  CreateManyMealPlanDTO,
  CreateManyMealPlanResultDTO,
  DeleteOneMealPlanDTO,
  DeleteMealPlanResultDTO,
  DeleteManyMealPlanDTO,
  DeleteManyMealPlanResultDTO,
  FindManyMealPlanDTO,
  FindManyMealPlanResultDTO,
  FindUniqueMealPlanDTO,
  FindUniqueMealPlanResultDTO,
  GroupByMealPlanDTO,
  GroupByMealPlanResultDTO,
  UpdateOneMealPlanDTO,
  UpdateMealPlanResultDTO,
  UpdateManyMealPlanDTO,
  UpdateManyMealPlanResultDTO,
  UpsertOneMealPlanDTO,
  UpsertMealPlanResultDTO,
} from '../../../dtos/meal-plan';

import { prisma, withTxRetry } from '../../prisma-client';

export interface MealPlanRepository {
  count(clause: CountMealPlanDTO): Promise<CountMealPlanResultDTO>;
  create(data: CreateOneMealPlanDTO): Promise<CreateMealPlanResultDTO>;
  createMany(data: CreateManyMealPlanDTO): Promise<CreateManyMealPlanResultDTO>;
  delete(clause: DeleteOneMealPlanDTO): Promise<DeleteMealPlanResultDTO>;
  deleteMany(
    clause: DeleteManyMealPlanDTO,
  ): Promise<DeleteManyMealPlanResultDTO>;
  findUnique(
    clause: FindUniqueMealPlanDTO,
  ): Promise<FindUniqueMealPlanResultDTO>;
  findMany(clause: FindManyMealPlanDTO): Promise<FindManyMealPlanResultDTO>;
  groupBy(clause: GroupByMealPlanDTO): Promise<GroupByMealPlanResultDTO>;
  update(clause: UpdateOneMealPlanDTO): Promise<UpdateMealPlanResultDTO>;
  updateMany(
    clause: UpdateManyMealPlanDTO,
  ): Promise<UpdateManyMealPlanResultDTO>;
  upsert(clause: UpsertOneMealPlanDTO): Promise<UpsertMealPlanResultDTO>;
}

export class PrismaMealPlanRepository implements MealPlanRepository {
  count = (clause: CountMealPlanDTO) => {
    return prisma.mealPlan.count(
      clause,
    ) as unknown as Promise<CountMealPlanResultDTO>;
  };

  create = (clause: CreateOneMealPlanDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealPlan.create(
          clause,
        ) as unknown as Promise<CreateMealPlanResultDTO>,
    );
  };

  createMany = (clause: CreateManyMealPlanDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealPlan.createMany(clause));
  };

  delete = (clause: DeleteOneMealPlanDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealPlan.delete(
          clause,
        ) as unknown as Promise<DeleteMealPlanResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyMealPlanDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealPlan.deleteMany(clause));
  };

  findMany = async (clause: FindManyMealPlanDTO) => {
    const items = await prisma.mealPlan.findMany(clause);
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
    } as FindManyMealPlanResultDTO;
  };

  findUnique = (clause: FindUniqueMealPlanDTO) => {
    return prisma.mealPlan.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueMealPlanResultDTO>;
  };

  groupBy = (clause: GroupByMealPlanDTO) => {
    return prisma.mealPlan.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByMealPlanResultDTO>;
  };

  update = (clause: UpdateOneMealPlanDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealPlan.update(
          clause,
        ) as unknown as Promise<UpdateMealPlanResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyMealPlanDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealPlan.updateMany(clause));
  };

  upsert = (clause: UpsertOneMealPlanDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealPlan.upsert(
          clause,
        ) as unknown as Promise<UpsertMealPlanResultDTO>,
    );
  };
}
