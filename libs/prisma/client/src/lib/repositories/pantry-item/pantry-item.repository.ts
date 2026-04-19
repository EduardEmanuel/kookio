import type {
  CountPantryItemDTO,
  CountPantryItemResultDTO,
  CreateOnePantryItemDTO,
  CreatePantryItemResultDTO,
  CreateManyPantryItemDTO,
  CreateManyPantryItemResultDTO,
  DeleteOnePantryItemDTO,
  DeletePantryItemResultDTO,
  DeleteManyPantryItemDTO,
  DeleteManyPantryItemResultDTO,
  FindManyPantryItemDTO,
  FindManyPantryItemResultDTO,
  FindUniquePantryItemDTO,
  FindUniquePantryItemResultDTO,
  GroupByPantryItemDTO,
  GroupByPantryItemResultDTO,
  UpdateOnePantryItemDTO,
  UpdatePantryItemResultDTO,
  UpdateManyPantryItemDTO,
  UpdateManyPantryItemResultDTO,
  UpsertOnePantryItemDTO,
  UpsertPantryItemResultDTO,
} from '../../../dtos/pantry-item';

import { prisma, withTxRetry } from '../../prisma-client';

export interface PantryItemRepository {
  count(clause: CountPantryItemDTO): Promise<CountPantryItemResultDTO>;
  create(data: CreateOnePantryItemDTO): Promise<CreatePantryItemResultDTO>;
  createMany(
    data: CreateManyPantryItemDTO,
  ): Promise<CreateManyPantryItemResultDTO>;
  delete(clause: DeleteOnePantryItemDTO): Promise<DeletePantryItemResultDTO>;
  deleteMany(
    clause: DeleteManyPantryItemDTO,
  ): Promise<DeleteManyPantryItemResultDTO>;
  findUnique(
    clause: FindUniquePantryItemDTO,
  ): Promise<FindUniquePantryItemResultDTO>;
  findMany(clause: FindManyPantryItemDTO): Promise<FindManyPantryItemResultDTO>;
  groupBy(clause: GroupByPantryItemDTO): Promise<GroupByPantryItemResultDTO>;
  update(clause: UpdateOnePantryItemDTO): Promise<UpdatePantryItemResultDTO>;
  updateMany(
    clause: UpdateManyPantryItemDTO,
  ): Promise<UpdateManyPantryItemResultDTO>;
  upsert(clause: UpsertOnePantryItemDTO): Promise<UpsertPantryItemResultDTO>;
}

export class PrismaPantryItemRepository implements PantryItemRepository {
  count = (clause: CountPantryItemDTO) => {
    return prisma.pantryItem.count(
      clause,
    ) as unknown as Promise<CountPantryItemResultDTO>;
  };

  create = (clause: CreateOnePantryItemDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.pantryItem.create(
          clause,
        ) as unknown as Promise<CreatePantryItemResultDTO>,
    );
  };

  createMany = (clause: CreateManyPantryItemDTO) => {
    return withTxRetry(prisma, (tx) => tx.pantryItem.createMany(clause));
  };

  delete = (clause: DeleteOnePantryItemDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.pantryItem.delete(
          clause,
        ) as unknown as Promise<DeletePantryItemResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyPantryItemDTO) => {
    return withTxRetry(prisma, (tx) => tx.pantryItem.deleteMany(clause));
  };

  findMany = async (clause: FindManyPantryItemDTO) => {
    const items = await prisma.pantryItem.findMany(clause);
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
    } as FindManyPantryItemResultDTO;
  };

  findUnique = (clause: FindUniquePantryItemDTO) => {
    return prisma.pantryItem.findUnique(
      clause,
    ) as unknown as Promise<FindUniquePantryItemResultDTO>;
  };

  groupBy = (clause: GroupByPantryItemDTO) => {
    return prisma.pantryItem.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByPantryItemResultDTO>;
  };

  update = (clause: UpdateOnePantryItemDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.pantryItem.update(
          clause,
        ) as unknown as Promise<UpdatePantryItemResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyPantryItemDTO) => {
    return withTxRetry(prisma, (tx) => tx.pantryItem.updateMany(clause));
  };

  upsert = (clause: UpsertOnePantryItemDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.pantryItem.upsert(
          clause,
        ) as unknown as Promise<UpsertPantryItemResultDTO>,
    );
  };
}
