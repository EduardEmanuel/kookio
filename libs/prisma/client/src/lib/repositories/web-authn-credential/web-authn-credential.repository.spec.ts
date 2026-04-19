import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountWebAuthnCredentialDTO,
  CountWebAuthnCredentialResultDTO,
  CreateOneWebAuthnCredentialDTO,
  FindUniqueWebAuthnCredentialDTO,
  FindManyWebAuthnCredentialDTO,
  FindManyWebAuthnCredentialResultDTO,
  GroupByWebAuthnCredentialDTO,
  GroupByWebAuthnCredentialResultDTO,
  UpdateOneWebAuthnCredentialDTO,
  DeleteOneWebAuthnCredentialDTO,
  UpsertOneWebAuthnCredentialDTO,
  UpsertWebAuthnCredentialResultDTO,
} from '../../../dtos/web-authn-credential';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  webAuthnCredential: {
    count: vi.fn(),
    create: vi.fn(),
    createMany: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
    findUnique: vi.fn(),
    findMany: vi.fn(),
    groupBy: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    upsert: vi.fn(),
  },
}));

vi.mock('../../prisma-client', async (importActual) => {
  const actual = await importActual<typeof import('../../prisma-client')>();
  return {
    ...actual,
    prisma: prismaMock,
    withTxRetry: async (
      _prisma: PrismaClient,
      fn: (tx: typeof prismaMock) => Promise<unknown>,
    ) => fn(prismaMock),
  };
});

import { PrismaWebAuthnCredentialRepository } from './web-authn-credential.repository';

describe('PrismaWebAuthnCredentialRepository (unit, mocked Prisma)', () => {
  let repo: PrismaWebAuthnCredentialRepository;

  beforeEach(() => {
    repo = new PrismaWebAuthnCredentialRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        credentialId: new Uint8Array(),
        publicKey: new Uint8Array(),
        counter: 0,
        transports: [],
        backupEligible: false,
        backupState: false,
      },
    } as unknown as CreateOneWebAuthnCredentialDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      credentialId: new Uint8Array(),
      publicKey: new Uint8Array(),
      counter: 0,
      transports: [],
      backupEligible: false,
      backupState: false,
      createdAt: now,
      updatedAt: now,
      user: null,
    } as unknown;

    prismaMock.webAuthnCredential.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.webAuthnCredential.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueWebAuthnCredentialDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      credentialId: new Uint8Array(),
      publicKey: new Uint8Array(),
      counter: 0,
      transports: [],
      backupEligible: false,
      backupState: false,
      createdAt: now,
      updatedAt: now,
      user: null,
    } as unknown;

    prismaMock.webAuthnCredential.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.webAuthnCredential.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueWebAuthnCredentialDTO;

    prismaMock.webAuthnCredential.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.webAuthnCredential.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyWebAuthnCredentialDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      credentialId: new Uint8Array(),
      publicKey: new Uint8Array(),
      counter: 0,
      transports: [],
      backupEligible: false,
      backupState: false,
      createdAt: now,
      updatedAt: now,
      user: null,
    } as unknown;
    const rows = [row];
    const expected: FindManyWebAuthnCredentialResultDTO = {
      data: rows as never,
      pagination: {
        page: 1,
        pageSize: 1,
        total: 1,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };

    prismaMock.webAuthnCredential.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.webAuthnCredential.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneWebAuthnCredentialDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      credentialId: new Uint8Array(),
      publicKey: new Uint8Array(),
      counter: 0,
      transports: [],
      backupEligible: false,
      backupState: false,
      createdAt: now,
      updatedAt: now,
      user: null,
    } as unknown;

    prismaMock.webAuthnCredential.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.webAuthnCredential.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = {
      where: { id },
    } as unknown as DeleteOneWebAuthnCredentialDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      credentialId: new Uint8Array(),
      publicKey: new Uint8Array(),
      counter: 0,
      transports: [],
      backupEligible: false,
      backupState: false,
      createdAt: now,
      updatedAt: now,
      user: null,
    } as unknown;

    prismaMock.webAuthnCredential.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.webAuthnCredential.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        credentialId: new Uint8Array(),
        publicKey: new Uint8Array(),
        counter: 0,
        transports: [],
        backupEligible: false,
        backupState: false,
      },
    } as unknown as UpsertOneWebAuthnCredentialDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      credentialId: new Uint8Array(),
      publicKey: new Uint8Array(),
      counter: 0,
      transports: [],
      backupEligible: false,
      backupState: false,
      createdAt: now,
      updatedAt: now,
      user: null,
    } as unknown as UpsertWebAuthnCredentialResultDTO;

    prismaMock.webAuthnCredential.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.webAuthnCredential.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountWebAuthnCredentialDTO;

    prismaMock.webAuthnCredential.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountWebAuthnCredentialResultDTO;

    expect(prismaMock.webAuthnCredential.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByWebAuthnCredentialDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByWebAuthnCredentialResultDTO;

    prismaMock.webAuthnCredential.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.webAuthnCredential.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        credentialId: new Uint8Array(),
        publicKey: new Uint8Array(),
        counter: 0,
        transports: [],
        backupEligible: false,
        backupState: false,
      },
    } as unknown as CreateOneWebAuthnCredentialDTO;
    prismaMock.webAuthnCredential.create.mockRejectedValue(
      new Error('db error'),
    );

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
