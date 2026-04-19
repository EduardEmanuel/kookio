import type {
  CountUtensilDTO,
  CountUtensilResultDTO,
  CreateOneUtensilDTO,
  CreateUtensilResultDTO,
  CreateManyUtensilDTO,
  CreateManyUtensilResultDTO,
  DeleteOneUtensilDTO,
  DeleteUtensilResultDTO,
  DeleteManyUtensilDTO,
  DeleteManyUtensilResultDTO,
  FindManyUtensilDTO,
  FindManyUtensilResultDTO,
  FindUniqueUtensilDTO,
  FindUniqueUtensilResultDTO,
  GroupByUtensilDTO,
  GroupByUtensilResultDTO,
  UpdateOneUtensilDTO,
  UpdateUtensilResultDTO,
  UpdateManyUtensilDTO,
  UpdateManyUtensilResultDTO,
  UpsertOneUtensilDTO,
  UpsertUtensilResultDTO,
} from '../../../dtos/utensil';

import { prisma, withTxRetry } from '../../prisma-client';

export interface UtensilRepository {
  count(clause: CountUtensilDTO): Promise<CountUtensilResultDTO>;
  create(data: CreateOneUtensilDTO): Promise<CreateUtensilResultDTO>;
  createMany(data: CreateManyUtensilDTO): Promise<CreateManyUtensilResultDTO>;
  delete(clause: DeleteOneUtensilDTO): Promise<DeleteUtensilResultDTO>;
  deleteMany(clause: DeleteManyUtensilDTO): Promise<DeleteManyUtensilResultDTO>;
  findUnique(clause: FindUniqueUtensilDTO): Promise<FindUniqueUtensilResultDTO>;
  findMany(clause: FindManyUtensilDTO): Promise<FindManyUtensilResultDTO>;
  groupBy(clause: GroupByUtensilDTO): Promise<GroupByUtensilResultDTO>;
  update(clause: UpdateOneUtensilDTO): Promise<UpdateUtensilResultDTO>;
  updateMany(clause: UpdateManyUtensilDTO): Promise<UpdateManyUtensilResultDTO>;
  upsert(clause: UpsertOneUtensilDTO): Promise<UpsertUtensilResultDTO>;
}

export class PrismaUtensilRepository implements UtensilRepository {
  count = (clause: CountUtensilDTO) => {
    return prisma.utensil.count(
      clause,
    ) as unknown as Promise<CountUtensilResultDTO>;
  };

  create = (clause: CreateOneUtensilDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.utensil.create(clause) as unknown as Promise<CreateUtensilResultDTO>,
    );
  };

  createMany = (clause: CreateManyUtensilDTO) => {
    return withTxRetry(prisma, (tx) => tx.utensil.createMany(clause));
  };

  delete = (clause: DeleteOneUtensilDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.utensil.delete(clause) as unknown as Promise<DeleteUtensilResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyUtensilDTO) => {
    return withTxRetry(prisma, (tx) => tx.utensil.deleteMany(clause));
  };

  findMany = async (clause: FindManyUtensilDTO) => {
    const items = await prisma.utensil.findMany(clause);
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
    } as FindManyUtensilResultDTO;
  };

  findUnique = (clause: FindUniqueUtensilDTO) => {
    return prisma.utensil.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueUtensilResultDTO>;
  };

  groupBy = (clause: GroupByUtensilDTO) => {
    return prisma.utensil.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByUtensilResultDTO>;
  };

  update = (clause: UpdateOneUtensilDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.utensil.update(clause) as unknown as Promise<UpdateUtensilResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyUtensilDTO) => {
    return withTxRetry(prisma, (tx) => tx.utensil.updateMany(clause));
  };

  upsert = (clause: UpsertOneUtensilDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.utensil.upsert(clause) as unknown as Promise<UpsertUtensilResultDTO>,
    );
  };
}
