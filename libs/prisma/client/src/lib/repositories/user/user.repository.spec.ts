import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountUserDTO,
  CountUserResultDTO,
  CreateOneUserDTO,
  FindUniqueUserDTO,
  FindManyUserDTO,
  FindManyUserResultDTO,
  GroupByUserDTO,
  GroupByUserResultDTO,
  UpdateOneUserDTO,
  DeleteOneUserDTO,
  UpsertOneUserDTO,
  UpsertUserResultDTO,
} from '../../../dtos/user';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  user: {
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

import { PrismaUserRepository } from './user.repository';

describe('PrismaUserRepository (unit, mocked Prisma)', () => {
  let repo: PrismaUserRepository;

  beforeEach(() => {
    repo = new PrismaUserRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        email: 'user@test.com',
        name: 'Test User',
        roles: ['USER'],
        credentials: { create: [] },
        amr: ['password'],
        isDisabled: false,
      },
    } as unknown as CreateOneUserDTO;
    const created = {
      id,
      email: 'user@test.com',
      name: 'Test User',
      roles: ['USER'],
      amr: ['password'],
      isDisabled: false,
      credentials: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.user.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.user.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueUserDTO;
    const found = {
      id,
      email: 'user@test.com',
      name: 'Test User',
      roles: ['USER'],
      amr: ['password'],
      isDisabled: false,
      credentials: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.user.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueUserDTO;

    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyUserDTO;
    const row = {
      id,
      email: 'user@test.com',
      name: 'Test User',
      roles: ['USER'],
      amr: ['password'],
      isDisabled: false,
      credentials: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyUserResultDTO = {
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

    prismaMock.user.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.user.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = { where: { id }, data: {} } as unknown as UpdateOneUserDTO;
    const updated = {
      id,
      email: 'user@test.com',
      name: 'Test User',
      roles: ['USER'],
      amr: ['password'],
      isDisabled: false,
      credentials: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.user.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.user.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneUserDTO;
    const deleted = {
      id,
      email: 'user@test.com',
      name: 'Test User',
      roles: ['USER'],
      amr: ['password'],
      isDisabled: false,
      credentials: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.user.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.user.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        email: 'user@test.com',
        name: 'Test User',
        roles: ['USER'],
        credentials: { create: [] },
        amr: ['password'],
        isDisabled: false,
      },
    } as unknown as UpsertOneUserDTO;
    const upserted = {
      id,
      email: 'user@test.com',
      name: 'Test User',
      roles: ['USER'],
      amr: ['password'],
      isDisabled: false,
      credentials: [],
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertUserResultDTO;

    prismaMock.user.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.user.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountUserDTO;

    prismaMock.user.count.mockResolvedValue(42);

    const result = (await repo.count(clause)) as unknown as CountUserResultDTO;

    expect(prismaMock.user.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByUserDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByUserResultDTO;

    prismaMock.user.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.user.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        email: 'user@test.com',
        name: 'Test User',
        roles: ['USER'],
        credentials: { create: [] },
        amr: ['password'],
        isDisabled: false,
      },
    } as unknown as CreateOneUserDTO;
    prismaMock.user.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
