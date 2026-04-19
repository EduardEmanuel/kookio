import type {
  CountUserUtensilDTO,
  CountUserUtensilResultDTO,
  CreateOneUserUtensilDTO,
  CreateUserUtensilResultDTO,
  CreateManyUserUtensilDTO,
  CreateManyUserUtensilResultDTO,
  DeleteOneUserUtensilDTO,
  DeleteUserUtensilResultDTO,
  DeleteManyUserUtensilDTO,
  DeleteManyUserUtensilResultDTO,
  FindManyUserUtensilDTO,
  FindManyUserUtensilResultDTO,
  FindUniqueUserUtensilDTO,
  FindUniqueUserUtensilResultDTO,
  GroupByUserUtensilDTO,
  GroupByUserUtensilResultDTO,
  UpdateOneUserUtensilDTO,
  UpdateUserUtensilResultDTO,
  UpdateManyUserUtensilDTO,
  UpdateManyUserUtensilResultDTO,
  UpsertOneUserUtensilDTO,
  UpsertUserUtensilResultDTO,
} from '../../../dtos/user-utensil';

import { prisma, withTxRetry } from '../../prisma-client';

export interface UserUtensilRepository {
  count(clause: CountUserUtensilDTO): Promise<CountUserUtensilResultDTO>;
  create(data: CreateOneUserUtensilDTO): Promise<CreateUserUtensilResultDTO>;
  createMany(
    data: CreateManyUserUtensilDTO,
  ): Promise<CreateManyUserUtensilResultDTO>;
  delete(clause: DeleteOneUserUtensilDTO): Promise<DeleteUserUtensilResultDTO>;
  deleteMany(
    clause: DeleteManyUserUtensilDTO,
  ): Promise<DeleteManyUserUtensilResultDTO>;
  findUnique(
    clause: FindUniqueUserUtensilDTO,
  ): Promise<FindUniqueUserUtensilResultDTO>;
  findMany(
    clause: FindManyUserUtensilDTO,
  ): Promise<FindManyUserUtensilResultDTO>;
  groupBy(clause: GroupByUserUtensilDTO): Promise<GroupByUserUtensilResultDTO>;
  update(clause: UpdateOneUserUtensilDTO): Promise<UpdateUserUtensilResultDTO>;
  updateMany(
    clause: UpdateManyUserUtensilDTO,
  ): Promise<UpdateManyUserUtensilResultDTO>;
  upsert(clause: UpsertOneUserUtensilDTO): Promise<UpsertUserUtensilResultDTO>;
}

export class PrismaUserUtensilRepository implements UserUtensilRepository {
  count = (clause: CountUserUtensilDTO) => {
    return prisma.userUtensil.count(
      clause,
    ) as unknown as Promise<CountUserUtensilResultDTO>;
  };

  create = (clause: CreateOneUserUtensilDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userUtensil.create(
          clause,
        ) as unknown as Promise<CreateUserUtensilResultDTO>,
    );
  };

  createMany = (clause: CreateManyUserUtensilDTO) => {
    return withTxRetry(prisma, (tx) => tx.userUtensil.createMany(clause));
  };

  delete = (clause: DeleteOneUserUtensilDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userUtensil.delete(
          clause,
        ) as unknown as Promise<DeleteUserUtensilResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyUserUtensilDTO) => {
    return withTxRetry(prisma, (tx) => tx.userUtensil.deleteMany(clause));
  };

  findMany = async (clause: FindManyUserUtensilDTO) => {
    const items = await prisma.userUtensil.findMany(clause);
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
    } as FindManyUserUtensilResultDTO;
  };

  findUnique = (clause: FindUniqueUserUtensilDTO) => {
    return prisma.userUtensil.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueUserUtensilResultDTO>;
  };

  groupBy = (clause: GroupByUserUtensilDTO) => {
    return prisma.userUtensil.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByUserUtensilResultDTO>;
  };

  update = (clause: UpdateOneUserUtensilDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userUtensil.update(
          clause,
        ) as unknown as Promise<UpdateUserUtensilResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyUserUtensilDTO) => {
    return withTxRetry(prisma, (tx) => tx.userUtensil.updateMany(clause));
  };

  upsert = (clause: UpsertOneUserUtensilDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.userUtensil.upsert(
          clause,
        ) as unknown as Promise<UpsertUserUtensilResultDTO>,
    );
  };
}
