import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountMealCategoryDTO,
  CountMealCategoryResultDTO,
  CreateOneMealCategoryDTO,
  FindUniqueMealCategoryDTO,
  FindManyMealCategoryDTO,
  FindManyMealCategoryResultDTO,
  GroupByMealCategoryDTO,
  GroupByMealCategoryResultDTO,
  UpdateOneMealCategoryDTO,
  DeleteOneMealCategoryDTO,
  UpsertOneMealCategoryDTO,
  UpsertMealCategoryResultDTO,
} from '../../../dtos/meal-category';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  mealCategory: {
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

import { PrismaMealCategoryRepository } from './meal-category.repository';

describe('PrismaMealCategoryRepository (unit, mocked Prisma)', () => {
  let repo: PrismaMealCategoryRepository;

  beforeEach(() => {
    repo = new PrismaMealCategoryRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: { externalId: 'Beef', name: 'Beef' },
    } as unknown as CreateOneMealCategoryDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'Beef',
      name: 'Beef',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealCategory.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.mealCategory.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueMealCategoryDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'Beef',
      name: 'Beef',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealCategory.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.mealCategory.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueMealCategoryDTO;

    prismaMock.mealCategory.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.mealCategory.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyMealCategoryDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'Beef',
      name: 'Beef',
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyMealCategoryResultDTO = {
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

    prismaMock.mealCategory.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.mealCategory.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneMealCategoryDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'Beef',
      name: 'Beef',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealCategory.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.mealCategory.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneMealCategoryDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'Beef',
      name: 'Beef',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealCategory.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.mealCategory.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: { externalId: 'Beef', name: 'Beef' },
    } as unknown as UpsertOneMealCategoryDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      externalId: 'Beef',
      name: 'Beef',
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertMealCategoryResultDTO;

    prismaMock.mealCategory.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.mealCategory.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountMealCategoryDTO;

    prismaMock.mealCategory.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountMealCategoryResultDTO;

    expect(prismaMock.mealCategory.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByMealCategoryDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByMealCategoryResultDTO;

    prismaMock.mealCategory.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.mealCategory.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: { externalId: 'Beef', name: 'Beef' },
    } as unknown as CreateOneMealCategoryDTO;
    prismaMock.mealCategory.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
