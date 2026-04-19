import type {
  CountUserDietaryRestrictionDTO,
  CountUserDietaryRestrictionResultDTO,
  CreateOneUserDietaryRestrictionDTO,
  CreateUserDietaryRestrictionResultDTO,
  CreateManyUserDietaryRestrictionDTO,
  CreateManyUserDietaryRestrictionResultDTO,
  DeleteOneUserDietaryRestrictionDTO,
  DeleteUserDietaryRestrictionResultDTO,
  DeleteManyUserDietaryRestrictionDTO,
  DeleteManyUserDietaryRestrictionResultDTO,
  FindManyUserDietaryRestrictionDTO,
  FindManyUserDietaryRestrictionResultDTO,
  FindUniqueUserDietaryRestrictionDTO,
  FindUniqueUserDietaryRestrictionResultDTO,
  GroupByUserDietaryRestrictionDTO,
  GroupByUserDietaryRestrictionResultDTO,
  UpdateOneUserDietaryRestrictionDTO,
  UpdateUserDietaryRestrictionResultDTO,
  UpdateManyUserDietaryRestrictionDTO,
  UpdateManyUserDietaryRestrictionResultDTO,
  UpsertOneUserDietaryRestrictionDTO,
  UpsertUserDietaryRestrictionResultDTO,
} from '../../../dtos/user-dietary-restriction';

import { prisma, withTxRetry } from '../../prisma-client';

export interface UserDietaryRestrictionRepository {
  count(
    clause: CountUserDietaryRestrictionDTO,
  ): Promise<CountUserDietaryRestrictionResultDTO>;
  create(
    data: CreateOneUserDietaryRestrictionDTO,
  ): Promise<CreateUserDietaryRestrictionResultDTO>;
  createMany(
    data: CreateManyUserDietaryRestrictionDTO,
  ): Promise<CreateManyUserDietaryRestrictionResultDTO>;
  delete(
    clause: DeleteOneUserDietaryRestrictionDTO,
  ): Promise<DeleteUserDietaryRestrictionResultDTO>;
  deleteMany(
    clause: DeleteManyUserDietaryRestrictionDTO,
  ): Promise<DeleteManyUserDietaryRestrictionResultDTO>;
  findUnique(
    clause: FindUniqueUserDietaryRestrictionDTO,
  ): Promise<FindUniqueUserDietaryRestrictionResultDTO>;
  findMany(
    clause: FindManyUserDietaryRestrictionDTO,
  ): Promise<FindManyUserDietaryRestrictionResultDTO>;
  groupBy(
    clause: GroupByUserDietaryRestrictionDTO,
  ): Promise<GroupByUserDietaryRestrictionResultDTO>;
  update(
    clause: UpdateOneUserDietaryRestrictionDTO,
  ): Promise<UpdateUserDietaryRestrictionResultDTO>;
  updateMany(
    clause: UpdateManyUserDietaryRestrictionDTO,
  ): Promise<UpdateManyUserDietaryRestrictionResultDTO>;
  upsert(
    clause: UpsertOneUserDietaryRestrictionDTO,
  ): Promise<UpsertUserDietaryRestrictionResultDTO>;
}

export class PrismaUserDietaryRestrictionRepository
  implements UserDietaryRestrictionRepository
{
  count = (clause: CountUserDietaryRestrictionDTO) => {
    return prisma.userDietaryRestriction.count(
      clause,
    ) as unknown as Promise<CountUserDietaryRestrictionResultDTO>;
  };

  create = (clause: CreateOneUserDietaryRestrictionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userDietaryRestriction.create(
          clause,
        ) as unknown as Promise<CreateUserDietaryRestrictionResultDTO>,
    );
  };

  createMany = (clause: CreateManyUserDietaryRestrictionDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.userDietaryRestriction.createMany(clause),
    );
  };

  delete = (clause: DeleteOneUserDietaryRestrictionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userDietaryRestriction.delete(
          clause,
        ) as unknown as Promise<DeleteUserDietaryRestrictionResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyUserDietaryRestrictionDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.userDietaryRestriction.deleteMany(clause),
    );
  };

  findMany = async (clause: FindManyUserDietaryRestrictionDTO) => {
    const items = await prisma.userDietaryRestriction.findMany(clause);
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
    } as FindManyUserDietaryRestrictionResultDTO;
  };

  findUnique = (clause: FindUniqueUserDietaryRestrictionDTO) => {
    return prisma.userDietaryRestriction.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueUserDietaryRestrictionResultDTO>;
  };

  groupBy = (clause: GroupByUserDietaryRestrictionDTO) => {
    return prisma.userDietaryRestriction.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByUserDietaryRestrictionResultDTO>;
  };

  update = (clause: UpdateOneUserDietaryRestrictionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userDietaryRestriction.update(
          clause,
        ) as unknown as Promise<UpdateUserDietaryRestrictionResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyUserDietaryRestrictionDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.userDietaryRestriction.updateMany(clause),
    );
  };

  upsert = (clause: UpsertOneUserDietaryRestrictionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userDietaryRestriction.upsert(
          clause,
        ) as unknown as Promise<UpsertUserDietaryRestrictionResultDTO>,
    );
  };
}
