import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountRecipeCollectionDTO,
  CountRecipeCollectionResultDTO,
  CreateOneRecipeCollectionDTO,
  FindUniqueRecipeCollectionDTO,
  FindManyRecipeCollectionDTO,
  FindManyRecipeCollectionResultDTO,
  GroupByRecipeCollectionDTO,
  GroupByRecipeCollectionResultDTO,
  UpdateOneRecipeCollectionDTO,
  DeleteOneRecipeCollectionDTO,
  UpsertOneRecipeCollectionDTO,
  UpsertRecipeCollectionResultDTO,
} from '../../../dtos/recipe-collection';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  recipeCollection: {
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

import { PrismaRecipeCollectionRepository } from './recipe-collection.repository';

describe('PrismaRecipeCollectionRepository (unit, mocked Prisma)', () => {
  let repo: PrismaRecipeCollectionRepository;

  beforeEach(() => {
    repo = new PrismaRecipeCollectionRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        name: 'Favourites',
      },
    } as unknown as CreateOneRecipeCollectionDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      name: 'Favourites',
      entries: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.recipeCollection.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.recipeCollection.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueRecipeCollectionDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      name: 'Favourites',
      entries: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.recipeCollection.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipeCollection.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueRecipeCollectionDTO;

    prismaMock.recipeCollection.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipeCollection.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyRecipeCollectionDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      name: 'Favourites',
      entries: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyRecipeCollectionResultDTO = {
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

    prismaMock.recipeCollection.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.recipeCollection.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneRecipeCollectionDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      name: 'Favourites',
      entries: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.recipeCollection.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.recipeCollection.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneRecipeCollectionDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      name: 'Favourites',
      entries: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.recipeCollection.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.recipeCollection.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        name: 'Favourites',
      },
    } as unknown as UpsertOneRecipeCollectionDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      name: 'Favourites',
      entries: [],
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertRecipeCollectionResultDTO;

    prismaMock.recipeCollection.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.recipeCollection.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountRecipeCollectionDTO;

    prismaMock.recipeCollection.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountRecipeCollectionResultDTO;

    expect(prismaMock.recipeCollection.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByRecipeCollectionDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByRecipeCollectionResultDTO;

    prismaMock.recipeCollection.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.recipeCollection.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        name: 'Favourites',
      },
    } as unknown as CreateOneRecipeCollectionDTO;
    prismaMock.recipeCollection.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
