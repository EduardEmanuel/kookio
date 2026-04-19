import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountUserDietaryRestrictionDTO,
  CountUserDietaryRestrictionResultDTO,
  CreateOneUserDietaryRestrictionDTO,
  FindUniqueUserDietaryRestrictionDTO,
  FindManyUserDietaryRestrictionDTO,
  FindManyUserDietaryRestrictionResultDTO,
  GroupByUserDietaryRestrictionDTO,
  GroupByUserDietaryRestrictionResultDTO,
  UpdateOneUserDietaryRestrictionDTO,
  DeleteOneUserDietaryRestrictionDTO,
  UpsertOneUserDietaryRestrictionDTO,
  UpsertUserDietaryRestrictionResultDTO,
} from '../../../dtos/user-dietary-restriction';

const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  userDietaryRestriction: {
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

import { PrismaUserDietaryRestrictionRepository } from './user-dietary-restriction.repository';

describe('PrismaUserDietaryRestrictionRepository (unit, mocked Prisma)', () => {
  let repo: PrismaUserDietaryRestrictionRepository;

  beforeEach(() => {
    repo = new PrismaUserDietaryRestrictionRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      },
    } as unknown as CreateOneUserDietaryRestrictionDTO;
    const created = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      restriction: null,
    } as unknown;

    prismaMock.userDietaryRestriction.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.userDietaryRestriction.create).toHaveBeenCalledWith(
      input,
    );
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = {
      where: {
        userId_dietaryRestrictionId: {
          userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
    } as unknown as FindUniqueUserDietaryRestrictionDTO;
    const found = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      restriction: null,
    } as unknown;

    prismaMock.userDietaryRestriction.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.userDietaryRestriction.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = {
      where: {
        userId_dietaryRestrictionId: {
          userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
    } as unknown as FindUniqueUserDietaryRestrictionDTO;

    prismaMock.userDietaryRestriction.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.userDietaryRestriction.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyUserDietaryRestrictionDTO;
    const row = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      restriction: null,
    } as unknown;
    const rows = [row];
    const expected: FindManyUserDietaryRestrictionResultDTO = {
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

    prismaMock.userDietaryRestriction.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.userDietaryRestriction.findMany).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: {
        userId_dietaryRestrictionId: {
          userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
      data: {},
    } as unknown as UpdateOneUserDietaryRestrictionDTO;
    const updated = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      restriction: null,
    } as unknown;

    prismaMock.userDietaryRestriction.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.userDietaryRestriction.update).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = {
      where: {
        userId_dietaryRestrictionId: {
          userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
    } as unknown as DeleteOneUserDietaryRestrictionDTO;
    const deleted = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      restriction: null,
    } as unknown;

    prismaMock.userDietaryRestriction.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.userDietaryRestriction.delete).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      },
    } as unknown as UpsertOneUserDietaryRestrictionDTO;
    const upserted = {
      userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      user: null,
      restriction: null,
    } as unknown as UpsertUserDietaryRestrictionResultDTO;

    prismaMock.userDietaryRestriction.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.userDietaryRestriction.upsert).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountUserDietaryRestrictionDTO;

    prismaMock.userDietaryRestriction.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountUserDietaryRestrictionResultDTO;

    expect(prismaMock.userDietaryRestriction.count).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = {
      by: ['id'],
    } as unknown as GroupByUserDietaryRestrictionDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByUserDietaryRestrictionResultDTO;

    prismaMock.userDietaryRestriction.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.userDietaryRestriction.groupBy).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      },
    } as unknown as CreateOneUserDietaryRestrictionDTO;
    prismaMock.userDietaryRestriction.create.mockRejectedValue(
      new Error('db error'),
    );

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
