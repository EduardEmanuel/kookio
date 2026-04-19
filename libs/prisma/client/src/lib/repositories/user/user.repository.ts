import type {
  CountUserDTO,
  CountUserResultDTO,
  CreateOneUserDTO,
  CreateUserResultDTO,
  CreateManyUserDTO,
  CreateManyUserResultDTO,
  DeleteOneUserDTO,
  DeleteUserResultDTO,
  DeleteManyUserDTO,
  DeleteManyUserResultDTO,
  FindManyUserDTO,
  FindManyUserResultDTO,
  FindUniqueUserDTO,
  FindUniqueUserResultDTO,
  GroupByUserDTO,
  GroupByUserResultDTO,
  UpdateOneUserDTO,
  UpdateUserResultDTO,
  UpdateManyUserDTO,
  UpdateManyUserResultDTO,
  UpsertOneUserDTO,
  UpsertUserResultDTO,
} from '../../../dtos/user';

import { prisma, withTxRetry } from '../../prisma-client';

export interface UserRepository {
  count(clause: CountUserDTO): Promise<CountUserResultDTO>;
  create(data: CreateOneUserDTO): Promise<CreateUserResultDTO>;
  createMany(data: CreateManyUserDTO): Promise<CreateManyUserResultDTO>;
  delete(clause: DeleteOneUserDTO): Promise<DeleteUserResultDTO>;
  deleteMany(clause: DeleteManyUserDTO): Promise<DeleteManyUserResultDTO>;
  findUnique(clause: FindUniqueUserDTO): Promise<FindUniqueUserResultDTO>;
  findMany(clause: FindManyUserDTO): Promise<FindManyUserResultDTO>;
  groupBy(clause: GroupByUserDTO): Promise<GroupByUserResultDTO>;
  update(clause: UpdateOneUserDTO): Promise<UpdateUserResultDTO>;
  updateMany(clause: UpdateManyUserDTO): Promise<UpdateManyUserResultDTO>;
  upsert(clause: UpsertOneUserDTO): Promise<UpsertUserResultDTO>;
}

export class PrismaUserRepository implements UserRepository {
  count = (clause: CountUserDTO) => {
    return prisma.user.count(clause) as unknown as Promise<CountUserResultDTO>;
  };

  create = (clause: CreateOneUserDTO) => {
    return withTxRetry(
      prisma,
      (tx) => tx.user.create(clause) as unknown as Promise<CreateUserResultDTO>,
    );
  };

  createMany = (clause: CreateManyUserDTO) => {
    return withTxRetry(prisma, (tx) => tx.user.createMany(clause));
  };

  delete = (clause: DeleteOneUserDTO) => {
    return withTxRetry(
      prisma,
      (tx) => tx.user.delete(clause) as unknown as Promise<DeleteUserResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyUserDTO) => {
    return withTxRetry(prisma, (tx) => tx.user.deleteMany(clause));
  };

  findMany = async (clause: FindManyUserDTO) => {
    const items = await prisma.user.findMany(clause);
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
    } as FindManyUserResultDTO;
  };

  findUnique = (clause: FindUniqueUserDTO) => {
    return prisma.user.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueUserResultDTO>;
  };

  groupBy = (clause: GroupByUserDTO) => {
    return prisma.user.groupBy(
      clause as unknown as Parameters<typeof prisma.user.groupBy>[0],
    ) as unknown as Promise<GroupByUserResultDTO>;
  };

  update = (clause: UpdateOneUserDTO) => {
    return withTxRetry(
      prisma,
      (tx) => tx.user.update(clause) as unknown as Promise<UpdateUserResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyUserDTO) => {
    return withTxRetry(prisma, (tx) => tx.user.updateMany(clause));
  };

  upsert = (clause: UpsertOneUserDTO) => {
    return withTxRetry(
      prisma,
      (tx) => tx.user.upsert(clause) as unknown as Promise<UpsertUserResultDTO>,
    );
  };
}
