import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountRecipeCollectionEntryDTO,
  CountRecipeCollectionEntryResultDTO,
  CreateOneRecipeCollectionEntryDTO,
  FindUniqueRecipeCollectionEntryDTO,
  FindManyRecipeCollectionEntryDTO,
  FindManyRecipeCollectionEntryResultDTO,
  GroupByRecipeCollectionEntryDTO,
  GroupByRecipeCollectionEntryResultDTO,
  UpdateOneRecipeCollectionEntryDTO,
  DeleteOneRecipeCollectionEntryDTO,
  UpsertOneRecipeCollectionEntryDTO,
  UpsertRecipeCollectionEntryResultDTO,
} from '../../../dtos/recipe-collection-entry';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  recipeCollectionEntry: {
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

import { PrismaRecipeCollectionEntryRepository } from './recipe-collection-entry.repository';

describe('PrismaRecipeCollectionEntryRepository (unit, mocked Prisma)', () => {
  let repo: PrismaRecipeCollectionEntryRepository;

  beforeEach(() => {
    repo = new PrismaRecipeCollectionEntryRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      },
    } as unknown as CreateOneRecipeCollectionEntryDTO;
    const created = {
      collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      addedAt: now,
      collection: null,
      recipe: null,
    } as unknown;

    prismaMock.recipeCollectionEntry.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.recipeCollectionEntry.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = {
      where: {
        collectionId_recipeId: {
          collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
    } as unknown as FindUniqueRecipeCollectionEntryDTO;
    const found = {
      collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      addedAt: now,
      collection: null,
      recipe: null,
    } as unknown;

    prismaMock.recipeCollectionEntry.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipeCollectionEntry.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = {
      where: {
        collectionId_recipeId: {
          collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
    } as unknown as FindUniqueRecipeCollectionEntryDTO;

    prismaMock.recipeCollectionEntry.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipeCollectionEntry.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyRecipeCollectionEntryDTO;
    const row = {
      collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      addedAt: now,
      collection: null,
      recipe: null,
    } as unknown;
    const rows = [row];
    const expected: FindManyRecipeCollectionEntryResultDTO = {
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

    prismaMock.recipeCollectionEntry.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.recipeCollectionEntry.findMany).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: {
        collectionId_recipeId: {
          collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
      data: {},
    } as unknown as UpdateOneRecipeCollectionEntryDTO;
    const updated = {
      collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      addedAt: now,
      collection: null,
      recipe: null,
    } as unknown;

    prismaMock.recipeCollectionEntry.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.recipeCollectionEntry.update).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = {
      where: {
        collectionId_recipeId: {
          collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
          recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        },
      },
    } as unknown as DeleteOneRecipeCollectionEntryDTO;
    const deleted = {
      collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      addedAt: now,
      collection: null,
      recipe: null,
    } as unknown;

    prismaMock.recipeCollectionEntry.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.recipeCollectionEntry.delete).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      },
    } as unknown as UpsertOneRecipeCollectionEntryDTO;
    const upserted = {
      collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      addedAt: now,
      collection: null,
      recipe: null,
    } as unknown as UpsertRecipeCollectionEntryResultDTO;

    prismaMock.recipeCollectionEntry.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.recipeCollectionEntry.upsert).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountRecipeCollectionEntryDTO;

    prismaMock.recipeCollectionEntry.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountRecipeCollectionEntryResultDTO;

    expect(prismaMock.recipeCollectionEntry.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByRecipeCollectionEntryDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByRecipeCollectionEntryResultDTO;

    prismaMock.recipeCollectionEntry.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.recipeCollectionEntry.groupBy).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      },
    } as unknown as CreateOneRecipeCollectionEntryDTO;
    prismaMock.recipeCollectionEntry.create.mockRejectedValue(
      new Error('db error'),
    );

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
