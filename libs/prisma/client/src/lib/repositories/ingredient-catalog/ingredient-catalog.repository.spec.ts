import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountIngredientCatalogDTO,
  CountIngredientCatalogResultDTO,
  CreateOneIngredientCatalogDTO,
  FindUniqueIngredientCatalogDTO,
  FindManyIngredientCatalogDTO,
  FindManyIngredientCatalogResultDTO,
  GroupByIngredientCatalogDTO,
  GroupByIngredientCatalogResultDTO,
  UpdateOneIngredientCatalogDTO,
  DeleteOneIngredientCatalogDTO,
  UpsertOneIngredientCatalogDTO,
  UpsertIngredientCatalogResultDTO,
} from '../../../dtos/ingredient-catalog';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  ingredientCatalog: {
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

import { PrismaIngredientCatalogRepository } from './ingredient-catalog.repository';

describe('PrismaIngredientCatalogRepository (unit, mocked Prisma)', () => {
  let repo: PrismaIngredientCatalogRepository;

  beforeEach(() => {
    repo = new PrismaIngredientCatalogRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: { name: 'Chicken', normalizedName: 'chicken' },
    } as unknown as CreateOneIngredientCatalogDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Chicken',
      normalizedName: 'chicken',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.ingredientCatalog.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.ingredientCatalog.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueIngredientCatalogDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Chicken',
      normalizedName: 'chicken',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.ingredientCatalog.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.ingredientCatalog.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueIngredientCatalogDTO;

    prismaMock.ingredientCatalog.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.ingredientCatalog.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyIngredientCatalogDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Chicken',
      normalizedName: 'chicken',
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyIngredientCatalogResultDTO = {
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

    prismaMock.ingredientCatalog.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.ingredientCatalog.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneIngredientCatalogDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Chicken',
      normalizedName: 'chicken',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.ingredientCatalog.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.ingredientCatalog.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = {
      where: { id },
    } as unknown as DeleteOneIngredientCatalogDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Chicken',
      normalizedName: 'chicken',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.ingredientCatalog.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.ingredientCatalog.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: { name: 'Chicken', normalizedName: 'chicken' },
    } as unknown as UpsertOneIngredientCatalogDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Chicken',
      normalizedName: 'chicken',
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertIngredientCatalogResultDTO;

    prismaMock.ingredientCatalog.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.ingredientCatalog.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountIngredientCatalogDTO;

    prismaMock.ingredientCatalog.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountIngredientCatalogResultDTO;

    expect(prismaMock.ingredientCatalog.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByIngredientCatalogDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByIngredientCatalogResultDTO;

    prismaMock.ingredientCatalog.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.ingredientCatalog.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: { name: 'Chicken', normalizedName: 'chicken' },
    } as unknown as CreateOneIngredientCatalogDTO;
    prismaMock.ingredientCatalog.create.mockRejectedValue(
      new Error('db error'),
    );

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
