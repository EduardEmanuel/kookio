import type {
  CountDietaryRestrictionDTO,
  CountDietaryRestrictionResultDTO,
  CreateOneDietaryRestrictionDTO,
  CreateDietaryRestrictionResultDTO,
  CreateManyDietaryRestrictionDTO,
  CreateManyDietaryRestrictionResultDTO,
  DeleteOneDietaryRestrictionDTO,
  DeleteDietaryRestrictionResultDTO,
  DeleteManyDietaryRestrictionDTO,
  DeleteManyDietaryRestrictionResultDTO,
  FindManyDietaryRestrictionDTO,
  FindManyDietaryRestrictionResultDTO,
  FindUniqueDietaryRestrictionDTO,
  FindUniqueDietaryRestrictionResultDTO,
  GroupByDietaryRestrictionDTO,
  GroupByDietaryRestrictionResultDTO,
  UpdateOneDietaryRestrictionDTO,
  UpdateDietaryRestrictionResultDTO,
  UpdateManyDietaryRestrictionDTO,
  UpdateManyDietaryRestrictionResultDTO,
  UpsertOneDietaryRestrictionDTO,
  UpsertDietaryRestrictionResultDTO,
} from '../../../dtos/dietary-restriction';

import { prisma, withTxRetry } from '../../prisma-client';

export interface DietaryRestrictionRepository {
  count(
    clause: CountDietaryRestrictionDTO,
  ): Promise<CountDietaryRestrictionResultDTO>;
  create(
    data: CreateOneDietaryRestrictionDTO,
  ): Promise<CreateDietaryRestrictionResultDTO>;
  createMany(
    data: CreateManyDietaryRestrictionDTO,
  ): Promise<CreateManyDietaryRestrictionResultDTO>;
  delete(
    clause: DeleteOneDietaryRestrictionDTO,
  ): Promise<DeleteDietaryRestrictionResultDTO>;
  deleteMany(
    clause: DeleteManyDietaryRestrictionDTO,
  ): Promise<DeleteManyDietaryRestrictionResultDTO>;
  findUnique(
    clause: FindUniqueDietaryRestrictionDTO,
  ): Promise<FindUniqueDietaryRestrictionResultDTO>;
  findMany(
    clause: FindManyDietaryRestrictionDTO,
  ): Promise<FindManyDietaryRestrictionResultDTO>;
  groupBy(
    clause: GroupByDietaryRestrictionDTO,
  ): Promise<GroupByDietaryRestrictionResultDTO>;
  update(
    clause: UpdateOneDietaryRestrictionDTO,
  ): Promise<UpdateDietaryRestrictionResultDTO>;
  updateMany(
    clause: UpdateManyDietaryRestrictionDTO,
  ): Promise<UpdateManyDietaryRestrictionResultDTO>;
  upsert(
    clause: UpsertOneDietaryRestrictionDTO,
  ): Promise<UpsertDietaryRestrictionResultDTO>;
}

export class PrismaDietaryRestrictionRepository
  implements DietaryRestrictionRepository
{
  count = (clause: CountDietaryRestrictionDTO) => {
    return prisma.dietaryRestriction.count(
      clause,
    ) as unknown as Promise<CountDietaryRestrictionResultDTO>;
  };

  create = (clause: CreateOneDietaryRestrictionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.dietaryRestriction.create(
          clause,
        ) as unknown as Promise<CreateDietaryRestrictionResultDTO>,
    );
  };

  createMany = (clause: CreateManyDietaryRestrictionDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.dietaryRestriction.createMany(clause),
    );
  };

  delete = (clause: DeleteOneDietaryRestrictionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.dietaryRestriction.delete(
          clause,
        ) as unknown as Promise<DeleteDietaryRestrictionResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyDietaryRestrictionDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.dietaryRestriction.deleteMany(clause),
    );
  };

  findMany = async (clause: FindManyDietaryRestrictionDTO) => {
    const items = await prisma.dietaryRestriction.findMany(clause);
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
    } as FindManyDietaryRestrictionResultDTO;
  };

  findUnique = (clause: FindUniqueDietaryRestrictionDTO) => {
    return prisma.dietaryRestriction.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueDietaryRestrictionResultDTO>;
  };

  groupBy = (clause: GroupByDietaryRestrictionDTO) => {
    return prisma.dietaryRestriction.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByDietaryRestrictionResultDTO>;
  };

  update = (clause: UpdateOneDietaryRestrictionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.dietaryRestriction.update(
          clause,
        ) as unknown as Promise<UpdateDietaryRestrictionResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyDietaryRestrictionDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.dietaryRestriction.updateMany(clause),
    );
  };

  upsert = (clause: UpsertOneDietaryRestrictionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.dietaryRestriction.upsert(
          clause,
        ) as unknown as Promise<UpsertDietaryRestrictionResultDTO>,
    );
  };
}
