import type {
  CountMealAreaDTO,
  CountMealAreaResultDTO,
  CreateOneMealAreaDTO,
  CreateMealAreaResultDTO,
  CreateManyMealAreaDTO,
  CreateManyMealAreaResultDTO,
  DeleteOneMealAreaDTO,
  DeleteMealAreaResultDTO,
  DeleteManyMealAreaDTO,
  DeleteManyMealAreaResultDTO,
  FindManyMealAreaDTO,
  FindManyMealAreaResultDTO,
  FindUniqueMealAreaDTO,
  FindUniqueMealAreaResultDTO,
  GroupByMealAreaDTO,
  GroupByMealAreaResultDTO,
  UpdateOneMealAreaDTO,
  UpdateMealAreaResultDTO,
  UpdateManyMealAreaDTO,
  UpdateManyMealAreaResultDTO,
  UpsertOneMealAreaDTO,
  UpsertMealAreaResultDTO,
} from '../../../dtos/meal-area';

import { prisma, withTxRetry } from '../../prisma-client';

export interface MealAreaRepository {
  count(clause: CountMealAreaDTO): Promise<CountMealAreaResultDTO>;
  create(data: CreateOneMealAreaDTO): Promise<CreateMealAreaResultDTO>;
  createMany(data: CreateManyMealAreaDTO): Promise<CreateManyMealAreaResultDTO>;
  delete(clause: DeleteOneMealAreaDTO): Promise<DeleteMealAreaResultDTO>;
  deleteMany(
    clause: DeleteManyMealAreaDTO,
  ): Promise<DeleteManyMealAreaResultDTO>;
  findUnique(
    clause: FindUniqueMealAreaDTO,
  ): Promise<FindUniqueMealAreaResultDTO>;
  findMany(clause: FindManyMealAreaDTO): Promise<FindManyMealAreaResultDTO>;
  groupBy(clause: GroupByMealAreaDTO): Promise<GroupByMealAreaResultDTO>;
  update(clause: UpdateOneMealAreaDTO): Promise<UpdateMealAreaResultDTO>;
  updateMany(
    clause: UpdateManyMealAreaDTO,
  ): Promise<UpdateManyMealAreaResultDTO>;
  upsert(clause: UpsertOneMealAreaDTO): Promise<UpsertMealAreaResultDTO>;
}

export class PrismaMealAreaRepository implements MealAreaRepository {
  count = (clause: CountMealAreaDTO) => {
    return prisma.mealArea.count(
      clause,
    ) as unknown as Promise<CountMealAreaResultDTO>;
  };

  create = (clause: CreateOneMealAreaDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealArea.create(
          clause,
        ) as unknown as Promise<CreateMealAreaResultDTO>,
    );
  };

  createMany = (clause: CreateManyMealAreaDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealArea.createMany(clause));
  };

  delete = (clause: DeleteOneMealAreaDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealArea.delete(
          clause,
        ) as unknown as Promise<DeleteMealAreaResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyMealAreaDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealArea.deleteMany(clause));
  };

  findMany = async (clause: FindManyMealAreaDTO) => {
    const items = await prisma.mealArea.findMany(clause);
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
    } as FindManyMealAreaResultDTO;
  };

  findUnique = (clause: FindUniqueMealAreaDTO) => {
    return prisma.mealArea.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueMealAreaResultDTO>;
  };

  groupBy = (clause: GroupByMealAreaDTO) => {
    return prisma.mealArea.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByMealAreaResultDTO>;
  };

  update = (clause: UpdateOneMealAreaDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealArea.update(
          clause,
        ) as unknown as Promise<UpdateMealAreaResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyMealAreaDTO) => {
    return withTxRetry(prisma, (tx) => tx.mealArea.updateMany(clause));
  };

  upsert = (clause: UpsertOneMealAreaDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.mealArea.upsert(
          clause,
        ) as unknown as Promise<UpsertMealAreaResultDTO>,
    );
  };
}
