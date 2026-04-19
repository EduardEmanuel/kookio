import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountMealAreaDTO,
  CountMealAreaResultDTO,
  CreateOneMealAreaDTO,
  FindUniqueMealAreaDTO,
  FindManyMealAreaDTO,
  FindManyMealAreaResultDTO,
  GroupByMealAreaDTO,
  GroupByMealAreaResultDTO,
  UpdateOneMealAreaDTO,
  DeleteOneMealAreaDTO,
  UpsertOneMealAreaDTO,
  UpsertMealAreaResultDTO,
} from '../../../dtos/meal-area';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  mealArea: {
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

import { PrismaMealAreaRepository } from './meal-area.repository';

describe('PrismaMealAreaRepository (unit, mocked Prisma)', () => {
  let repo: PrismaMealAreaRepository;

  beforeEach(() => {
    repo = new PrismaMealAreaRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: { externalId: 'American', name: 'American' },
    } as unknown as CreateOneMealAreaDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'American',
      name: 'American',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealArea.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.mealArea.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueMealAreaDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'American',
      name: 'American',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealArea.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.mealArea.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueMealAreaDTO;

    prismaMock.mealArea.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.mealArea.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyMealAreaDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'American',
      name: 'American',
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyMealAreaResultDTO = {
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

    prismaMock.mealArea.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.mealArea.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneMealAreaDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'American',
      name: 'American',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealArea.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.mealArea.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneMealAreaDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'American',
      name: 'American',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealArea.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.mealArea.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: { externalId: 'American', name: 'American' },
    } as unknown as UpsertOneMealAreaDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'American',
      name: 'American',
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertMealAreaResultDTO;

    prismaMock.mealArea.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.mealArea.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountMealAreaDTO;

    prismaMock.mealArea.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountMealAreaResultDTO;

    expect(prismaMock.mealArea.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByMealAreaDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByMealAreaResultDTO;

    prismaMock.mealArea.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.mealArea.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: { externalId: 'American', name: 'American' },
    } as unknown as CreateOneMealAreaDTO;
    prismaMock.mealArea.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
