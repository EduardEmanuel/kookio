import type {
  CountMealPlanSlotDTO,
  CountMealPlanSlotResultDTO,
  CreateOneMealPlanSlotDTO,
  CreateMealPlanSlotResultDTO,
  CreateManyMealPlanSlotDTO,
  CreateManyMealPlanSlotResultDTO,
  DeleteOneMealPlanSlotDTO,
  DeleteMealPlanSlotResultDTO,
  DeleteManyMealPlanSlotDTO,
  DeleteManyMealPlanSlotResultDTO,
  FindManyMealPlanSlotDTO,
  FindManyMealPlanSlotResultDTO,
  FindUniqueMealPlanSlotDTO,
  FindUniqueMealPlanSlotResultDTO,
  GroupByMealPlanSlotDTO,
  GroupByMealPlanSlotResultDTO,
  UpdateOneMealPlanSlotDTO,
  UpdateMealPlanSlotResultDTO,
  UpdateManyMealPlanSlotDTO,
  UpdateManyMealPlanSlotResultDTO,
  UpsertOneMealPlanSlotDTO,
  UpsertMealPlanSlotResultDTO,
} from '../../../dtos/meal-plan-slot';

import { prisma, withTxRetry } from '../../prisma-client';

export interface MealPlanSlotRepository {
  count(clause: CountMealPlanSlotDTO): Promise<CountMealPlanSlotResultDTO>;
  create(data: CreateOneMealPlanSlotDTO): Promise<CreateMealPlanSlotResultDTO>;
  createMany(
    data: CreateManyMealPlanSlotDTO,
  ): Promise<CreateManyMealPlanSlotResultDTO>;
  delete(
    clause: DeleteOneMealPlanSlotDTO,
  ): Promise<DeleteMealPlanSlotResultDTO>;
  deleteMany(
    clause: DeleteManyMealPlanSlotDTO,
  ): Promise<DeleteManyMealPlanSlotResultDTO>;
  findUnique(
    clause: FindUniqueMealPlanSlotDTO,
  ): Promise<FindUniqueMealPlanSlotResultDTO>;
  findMany(
    clause: FindManyMealPlanSlotDTO,
  ): Promise<FindManyMealPlanSlotResultDTO>;
  groupBy(
    clause: GroupByMealPlanSlotDTO,
  ): Promise<GroupByMealPlanSlotResultDTO>;
  update(
    clause: UpdateOneMealPlanSlotDTO,
  ): Promise<UpdateMealPlanSlotResultDTO>;
  updateMany(
    clause: UpdateManyMealPlanSlotDTO,
  ): Promise<UpdateManyMealPlanSlotResultDTO>;
  upsert(
    clause: UpsertOneMealPlanSlotDTO,
  ): Promise<UpsertMealPlanSlotResultDTO>;
}

export class PrismaMealPlanSlotRepository implements MealPlanSlotRepository {
  count = (clause: CountMealPlanSlotDTO) => {
    return prisma.mealPlanSlot.count(
      clause,
    ) as unknown as Promise<CountMealPlanSlotResultDTO>;
  };

  create = (clause: CreateOneMealPlanSlotDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealPlanSlot.create(
          clause,
        ) as unknown as Promise<CreateMealPlanSlotResultDTO>,
    );
  };

  createMany = (clause: CreateManyMealPlanSlotDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealPlanSlot.createMany(clause));
  };

  delete = (clause: DeleteOneMealPlanSlotDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealPlanSlot.delete(
          clause,
        ) as unknown as Promise<DeleteMealPlanSlotResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyMealPlanSlotDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealPlanSlot.deleteMany(clause));
  };

  findMany = async (clause: FindManyMealPlanSlotDTO) => {
    const items = await prisma.mealPlanSlot.findMany(clause);
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
    } as FindManyMealPlanSlotResultDTO;
  };

  findUnique = (clause: FindUniqueMealPlanSlotDTO) => {
    return prisma.mealPlanSlot.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueMealPlanSlotResultDTO>;
  };

  groupBy = (clause: GroupByMealPlanSlotDTO) => {
    return prisma.mealPlanSlot.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByMealPlanSlotResultDTO>;
  };

  update = (clause: UpdateOneMealPlanSlotDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealPlanSlot.update(
          clause,
        ) as unknown as Promise<UpdateMealPlanSlotResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyMealPlanSlotDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealPlanSlot.updateMany(clause));
  };

  upsert = (clause: UpsertOneMealPlanSlotDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealPlanSlot.upsert(
          clause,
        ) as unknown as Promise<UpsertMealPlanSlotResultDTO>,
    );
  };
}
