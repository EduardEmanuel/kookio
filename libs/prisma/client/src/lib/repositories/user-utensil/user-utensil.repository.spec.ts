import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountUserUtensilDTO,
  CountUserUtensilResultDTO,
  CreateOneUserUtensilDTO,
  FindUniqueUserUtensilDTO,
  FindManyUserUtensilDTO,
  FindManyUserUtensilResultDTO,
  GroupByUserUtensilDTO,
  GroupByUserUtensilResultDTO,
  UpdateOneUserUtensilDTO,
  DeleteOneUserUtensilDTO,
  UpsertOneUserUtensilDTO,
  UpsertUserUtensilResultDTO,
} from '../../../dtos/user-utensil';

const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  userUtensil: {
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

import { PrismaUserUtensilRepository } from './user-utensil.repository';

describe('PrismaUserUtensilRepository (unit, mocked Prisma)', () => {
  let repo: PrismaUserUtensilRepository;

  beforeEach(() => {
    repo = new PrismaUserUtensilRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      },
    } as unknown as CreateOneUserUtensilDTO;
    const created = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      utensil: null,
    } as unknown;

    prismaMock.userUtensil.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.userUtensil.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = {
      where: {
        userId_utensilId: {
          userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
    } as unknown as FindUniqueUserUtensilDTO;
    const found = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      utensil: null,
    } as unknown;

    prismaMock.userUtensil.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.userUtensil.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = {
      where: {
        userId_utensilId: {
          userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
    } as unknown as FindUniqueUserUtensilDTO;

    prismaMock.userUtensil.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.userUtensil.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyUserUtensilDTO;
    const row = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      utensil: null,
    } as unknown;
    const rows = [row];
    const expected: FindManyUserUtensilResultDTO = {
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

    prismaMock.userUtensil.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.userUtensil.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: {
        userId_utensilId: {
          userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
      data: {},
    } as unknown as UpdateOneUserUtensilDTO;
    const updated = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      utensil: null,
    } as unknown;

    prismaMock.userUtensil.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.userUtensil.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = {
      where: {
        userId_utensilId: {
          userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
    } as unknown as DeleteOneUserUtensilDTO;
    const deleted = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      utensil: null,
    } as unknown;

    prismaMock.userUtensil.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.userUtensil.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      },
    } as unknown as UpsertOneUserUtensilDTO;
    const upserted = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      utensil: null,
    } as unknown as UpsertUserUtensilResultDTO;

    prismaMock.userUtensil.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.userUtensil.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountUserUtensilDTO;

    prismaMock.userUtensil.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountUserUtensilResultDTO;

    expect(prismaMock.userUtensil.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByUserUtensilDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByUserUtensilResultDTO;

    prismaMock.userUtensil.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.userUtensil.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      },
    } as unknown as CreateOneUserUtensilDTO;
    prismaMock.userUtensil.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
