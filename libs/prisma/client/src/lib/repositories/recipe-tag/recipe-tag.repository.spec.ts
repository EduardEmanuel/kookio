import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountRecipeTagDTO,
  CountRecipeTagResultDTO,
  CreateOneRecipeTagDTO,
  FindUniqueRecipeTagDTO,
  FindManyRecipeTagDTO,
  FindManyRecipeTagResultDTO,
  GroupByRecipeTagDTO,
  GroupByRecipeTagResultDTO,
  UpdateOneRecipeTagDTO,
  DeleteOneRecipeTagDTO,
  UpsertOneRecipeTagDTO,
  UpsertRecipeTagResultDTO,
} from '../../../dtos/recipe-tag';

const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  recipeTag: {
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

import { PrismaRecipeTagRepository } from './recipe-tag.repository';

describe('PrismaRecipeTagRepository (unit, mocked Prisma)', () => {
  let repo: PrismaRecipeTagRepository;

  beforeEach(() => {
    repo = new PrismaRecipeTagRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        tag: 'healthy',
      },
    } as unknown as CreateOneRecipeTagDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      tag: 'healthy',
    } as unknown;

    prismaMock.recipeTag.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.recipeTag.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueRecipeTagDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      tag: 'healthy',
    } as unknown;

    prismaMock.recipeTag.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipeTag.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueRecipeTagDTO;

    prismaMock.recipeTag.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipeTag.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyRecipeTagDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      tag: 'healthy',
    } as unknown;
    const rows = [row];
    const expected: FindManyRecipeTagResultDTO = {
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

    prismaMock.recipeTag.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.recipeTag.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneRecipeTagDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      tag: 'healthy',
    } as unknown;

    prismaMock.recipeTag.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.recipeTag.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneRecipeTagDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      tag: 'healthy',
    } as unknown;

    prismaMock.recipeTag.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.recipeTag.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        tag: 'healthy',
      },
    } as unknown as UpsertOneRecipeTagDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      tag: 'healthy',
    } as unknown as UpsertRecipeTagResultDTO;

    prismaMock.recipeTag.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.recipeTag.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountRecipeTagDTO;

    prismaMock.recipeTag.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountRecipeTagResultDTO;

    expect(prismaMock.recipeTag.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByRecipeTagDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByRecipeTagResultDTO;

    prismaMock.recipeTag.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.recipeTag.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        tag: 'healthy',
      },
    } as unknown as CreateOneRecipeTagDTO;
    prismaMock.recipeTag.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
