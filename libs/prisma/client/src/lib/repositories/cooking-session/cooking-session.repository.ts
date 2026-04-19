import type {
  CountCookingSessionDTO,
  CountCookingSessionResultDTO,
  CreateOneCookingSessionDTO,
  CreateCookingSessionResultDTO,
  CreateManyCookingSessionDTO,
  CreateManyCookingSessionResultDTO,
  DeleteOneCookingSessionDTO,
  DeleteCookingSessionResultDTO,
  DeleteManyCookingSessionDTO,
  DeleteManyCookingSessionResultDTO,
  FindManyCookingSessionDTO,
  FindManyCookingSessionResultDTO,
  FindUniqueCookingSessionDTO,
  FindUniqueCookingSessionResultDTO,
  GroupByCookingSessionDTO,
  GroupByCookingSessionResultDTO,
  UpdateOneCookingSessionDTO,
  UpdateCookingSessionResultDTO,
  UpdateManyCookingSessionDTO,
  UpdateManyCookingSessionResultDTO,
  UpsertOneCookingSessionDTO,
  UpsertCookingSessionResultDTO,
} from '../../../dtos/cooking-session';

import { prisma, withTxRetry } from '../../prisma-client';

export interface CookingSessionRepository {
  count(clause: CountCookingSessionDTO): Promise<CountCookingSessionResultDTO>;
  create(
    data: CreateOneCookingSessionDTO,
  ): Promise<CreateCookingSessionResultDTO>;
  createMany(
    data: CreateManyCookingSessionDTO,
  ): Promise<CreateManyCookingSessionResultDTO>;
  delete(
    clause: DeleteOneCookingSessionDTO,
  ): Promise<DeleteCookingSessionResultDTO>;
  deleteMany(
    clause: DeleteManyCookingSessionDTO,
  ): Promise<DeleteManyCookingSessionResultDTO>;
  findUnique(
    clause: FindUniqueCookingSessionDTO,
  ): Promise<FindUniqueCookingSessionResultDTO>;
  findMany(
    clause: FindManyCookingSessionDTO,
  ): Promise<FindManyCookingSessionResultDTO>;
  groupBy(
    clause: GroupByCookingSessionDTO,
  ): Promise<GroupByCookingSessionResultDTO>;
  update(
    clause: UpdateOneCookingSessionDTO,
  ): Promise<UpdateCookingSessionResultDTO>;
  updateMany(
    clause: UpdateManyCookingSessionDTO,
  ): Promise<UpdateManyCookingSessionResultDTO>;
  upsert(
    clause: UpsertOneCookingSessionDTO,
  ): Promise<UpsertCookingSessionResultDTO>;
}

export class PrismaCookingSessionRepository
  implements CookingSessionRepository
{
  count = (clause: CountCookingSessionDTO) => {
    return prisma.cookingSession.count(
      clause,
    ) as unknown as Promise<CountCookingSessionResultDTO>;
  };

  create = (clause: CreateOneCookingSessionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.cookingSession.create(
          clause,
        ) as unknown as Promise<CreateCookingSessionResultDTO>,
    );
  };

  createMany = (clause: CreateManyCookingSessionDTO) => {
    return withTxRetry(prisma, (tx) => tx.cookingSession.createMany(clause));
  };

  delete = (clause: DeleteOneCookingSessionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.cookingSession.delete(
          clause,
        ) as unknown as Promise<DeleteCookingSessionResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyCookingSessionDTO) => {
    return withTxRetry(prisma, (tx) => tx.cookingSession.deleteMany(clause));
  };

  findMany = async (clause: FindManyCookingSessionDTO) => {
    const items = await prisma.cookingSession.findMany(clause);
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
    } as FindManyCookingSessionResultDTO;
  };

  findUnique = (clause: FindUniqueCookingSessionDTO) => {
    return prisma.cookingSession.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueCookingSessionResultDTO>;
  };

  groupBy = (clause: GroupByCookingSessionDTO) => {
    return prisma.cookingSession.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByCookingSessionResultDTO>;
  };

  update = (clause: UpdateOneCookingSessionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.cookingSession.update(
          clause,
        ) as unknown as Promise<UpdateCookingSessionResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyCookingSessionDTO) => {
    return withTxRetry(prisma, (tx) => tx.cookingSession.updateMany(clause));
  };

  upsert = (clause: UpsertOneCookingSessionDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.cookingSession.upsert(
          clause,
        ) as unknown as Promise<UpsertCookingSessionResultDTO>,
    );
  };
}
