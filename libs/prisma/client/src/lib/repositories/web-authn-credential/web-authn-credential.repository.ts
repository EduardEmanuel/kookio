import type {
  CountWebAuthnCredentialDTO,
  CountWebAuthnCredentialResultDTO,
  CreateOneWebAuthnCredentialDTO,
  CreateWebAuthnCredentialResultDTO,
  CreateManyWebAuthnCredentialDTO,
  CreateManyWebAuthnCredentialResultDTO,
  DeleteOneWebAuthnCredentialDTO,
  DeleteWebAuthnCredentialResultDTO,
  DeleteManyWebAuthnCredentialDTO,
  DeleteManyWebAuthnCredentialResultDTO,
  FindManyWebAuthnCredentialDTO,
  FindManyWebAuthnCredentialResultDTO,
  FindUniqueWebAuthnCredentialDTO,
  FindUniqueWebAuthnCredentialResultDTO,
  GroupByWebAuthnCredentialDTO,
  GroupByWebAuthnCredentialResultDTO,
  UpdateOneWebAuthnCredentialDTO,
  UpdateWebAuthnCredentialResultDTO,
  UpdateManyWebAuthnCredentialDTO,
  UpdateManyWebAuthnCredentialResultDTO,
  UpsertOneWebAuthnCredentialDTO,
  UpsertWebAuthnCredentialResultDTO,
} from '../../../dtos/web-authn-credential';

import { prisma, withTxRetry } from '../../prisma-client';

export interface WebAuthnCredentialRepository {
  count(
    clause: CountWebAuthnCredentialDTO,
  ): Promise<CountWebAuthnCredentialResultDTO>;
  create(
    data: CreateOneWebAuthnCredentialDTO,
  ): Promise<CreateWebAuthnCredentialResultDTO>;
  createMany(
    data: CreateManyWebAuthnCredentialDTO,
  ): Promise<CreateManyWebAuthnCredentialResultDTO>;
  delete(
    clause: DeleteOneWebAuthnCredentialDTO,
  ): Promise<DeleteWebAuthnCredentialResultDTO>;
  deleteMany(
    clause: DeleteManyWebAuthnCredentialDTO,
  ): Promise<DeleteManyWebAuthnCredentialResultDTO>;
  findUnique(
    clause: FindUniqueWebAuthnCredentialDTO,
  ): Promise<FindUniqueWebAuthnCredentialResultDTO>;
  findMany(
    clause: FindManyWebAuthnCredentialDTO,
  ): Promise<FindManyWebAuthnCredentialResultDTO>;
  groupBy(
    clause: GroupByWebAuthnCredentialDTO,
  ): Promise<GroupByWebAuthnCredentialResultDTO>;
  update(
    clause: UpdateOneWebAuthnCredentialDTO,
  ): Promise<UpdateWebAuthnCredentialResultDTO>;
  updateMany(
    clause: UpdateManyWebAuthnCredentialDTO,
  ): Promise<UpdateManyWebAuthnCredentialResultDTO>;
  upsert(
    clause: UpsertOneWebAuthnCredentialDTO,
  ): Promise<UpsertWebAuthnCredentialResultDTO>;
}

export class PrismaWebAuthnCredentialRepository
  implements WebAuthnCredentialRepository
{
  count = (clause: CountWebAuthnCredentialDTO) => {
    return prisma.webAuthnCredential.count(
      clause,
    ) as unknown as Promise<CountWebAuthnCredentialResultDTO>;
  };

  create = (clause: CreateOneWebAuthnCredentialDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.webAuthnCredential.create(
          clause,
        ) as unknown as Promise<CreateWebAuthnCredentialResultDTO>,
    );
  };

  createMany = (clause: CreateManyWebAuthnCredentialDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.webAuthnCredential.createMany(clause),
    );
  };

  delete = (clause: DeleteOneWebAuthnCredentialDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.webAuthnCredential.delete(
          clause,
        ) as unknown as Promise<DeleteWebAuthnCredentialResultDTO>,
    );
  };

  deleteMany = (clause: DeleteManyWebAuthnCredentialDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.webAuthnCredential.deleteMany(clause),
    );
  };

  findMany = async (clause: FindManyWebAuthnCredentialDTO) => {
    const items = await prisma.webAuthnCredential.findMany(clause);
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
    } as FindManyWebAuthnCredentialResultDTO;
  };

  findUnique = (clause: FindUniqueWebAuthnCredentialDTO) => {
    return prisma.webAuthnCredential.findUnique(
      clause,
    ) as unknown as Promise<FindUniqueWebAuthnCredentialResultDTO>;
  };

  groupBy = (clause: GroupByWebAuthnCredentialDTO) => {
    return prisma.webAuthnCredential.groupBy(
      clause as any,
    ) as unknown as Promise<GroupByWebAuthnCredentialResultDTO>;
  };

  update = (clause: UpdateOneWebAuthnCredentialDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.webAuthnCredential.update(
          clause,
        ) as unknown as Promise<UpdateWebAuthnCredentialResultDTO>,
    );
  };

  updateMany = (clause: UpdateManyWebAuthnCredentialDTO) => {
    return withTxRetry(prisma, (tx) =>
      tx.webAuthnCredential.updateMany(clause),
    );
  };

  upsert = (clause: UpsertOneWebAuthnCredentialDTO) => {
    return withTxRetry(
      prisma,
      (tx) =>
        tx.webAuthnCredential.upsert(
          clause,
        ) as unknown as Promise<UpsertWebAuthnCredentialResultDTO>,
    );
  };
}
