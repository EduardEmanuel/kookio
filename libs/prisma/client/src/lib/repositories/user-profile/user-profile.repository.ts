import type {
  CountUserProfileDTO,
  CountUserProfileResultDTO,
  CreateOneUserProfileDTO,
  CreateUserProfileResultDTO,
  CreateManyUserProfileDTO,
  CreateManyUserProfileResultDTO,
  DeleteOneUserProfileDTO,
  DeleteUserProfileResultDTO,
  DeleteManyUserProfileDTO,
  DeleteManyUserProfileResultDTO,
  FindManyUserProfileDTO,
  FindManyUserProfileResultDTO,
  FindUniqueUserProfileDTO,
  FindUniqueUserProfileResultDTO,
  GroupByUserProfileDTO,
  GroupByUserProfileResultDTO,
  UpdateOneUserProfileDTO,
  UpdateUserProfileResultDTO,
  UpdateManyUserProfileDTO,
  UpdateManyUserProfileResultDTO,
  UpsertOneUserProfileDTO,
  UpsertUserProfileResultDTO,
} from '../../../dtos/user-profile';

import { prisma, withTxRetry } from '../../prisma-client';

export interface UserProfileRepository {
  count(clause: CountUserProfileDTO): Promise<CountUserProfileResultDTO>;
  create(data: CreateOneUserProfileDTO): Promise<CreateUserProfileResultDTO>;
  createMany(
    data: CreateManyUserProfileDTO,
  ): Promise<CreateManyUserProfileResultDTO>;
  delete(clause: DeleteOneUserProfileDTO): Promise<DeleteUserProfileResultDTO>;
  deleteMany(
    clause: DeleteManyUserProfileDTO,
  ): Promise<DeleteManyUserProfileResultDTO>;
  findUnique(
    clause: FindUniqueUserProfileDTO,
  ): Promise<FindUniqueUserProfileResultDTO>;
  findMany(
    clause: FindManyUserProfileDTO,
  ): Promise<FindManyUserProfileResultDTO>;
  groupBy(clause: GroupByUserProfileDTO): Promise<GroupByUserProfileResultDTO>;
  update(clause: UpdateOneUserProfileDTO): Promise<UpdateUserProfileResultDTO>;
  updateMany(
    clause: UpdateManyUserProfileDTO,
  ): Promise<UpdateManyUserProfileResultDTO>;
  upsert(clause: UpsertOneUserProfileDTO): Promise<UpsertUserProfileResultDTO>;
}

export class PrismaUserProfileRepository implements UserProfileRepository {
  count = (clause: CountUserProfileDTO) => {
    return prisma.userProfile.count(
      clause,
    ) as unknown as Promise<CountUserProfileResultDTO>;
  };

  create = (clause: CreateOneUserProfileDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userProfile.create(
          clause,
        ) as unknown as Promise<CreateUserProfileResultDTO>,
    );
  };

  createMany = (clause: CreateManyUserProfileDTO) => {
    return withTxRetry(prisma, (tx) => tx.userProfile.createMany(clause));
  };

  delete = (clause: DeleteOneUserProfileDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userProfile.delete(
          clause,
        ) as unknown as Promise<DeleteUserProfileResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyUserProfileDTO) => {
    return withTxRetry(prisma, (tx) => tx.userProfile.deleteMany(clause));
  };

  findMany = async (clause: FindManyUserProfileDTO) => {
    const items = await prisma.userProfile.findMany(clause);
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
    } as FindManyUserProfileResultDTO;
  };

  findUnique = (clause: FindUniqueUserProfileDTO) => {
    return prisma.userProfile.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueUserProfileResultDTO>;
  };

  groupBy = (clause: GroupByUserProfileDTO) => {
    return prisma.userProfile.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByUserProfileResultDTO>;
  };

  update = (clause: UpdateOneUserProfileDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userProfile.update(
          clause,
        ) as unknown as Promise<UpdateUserProfileResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyUserProfileDTO) => {
    return withTxRetry(prisma, (tx) => tx.userProfile.updateMany(clause));
  };

  upsert = (clause: UpsertOneUserProfileDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userProfile.upsert(
          clause,
        ) as unknown as Promise<UpsertUserProfileResultDTO>,
    );
  };
}
