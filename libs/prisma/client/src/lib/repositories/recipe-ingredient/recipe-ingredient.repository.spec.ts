import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountRecipeIngredientDTO,
  CountRecipeIngredientResultDTO,
  CreateOneRecipeIngredientDTO,
  FindUniqueRecipeIngredientDTO,
  FindManyRecipeIngredientDTO,
  FindManyRecipeIngredientResultDTO,
  GroupByRecipeIngredientDTO,
  GroupByRecipeIngredientResultDTO,
  UpdateOneRecipeIngredientDTO,
  DeleteOneRecipeIngredientDTO,
  UpsertOneRecipeIngredientDTO,
  UpsertRecipeIngredientResultDTO,
} from '../../../dtos/recipe-ingredient';

const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  recipeIngredient: {
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

import { PrismaRecipeIngredientRepository } from './recipe-ingredient.repository';

describe('PrismaRecipeIngredientRepository (unit, mocked Prisma)', () => {
  let repo: PrismaRecipeIngredientRepository;

  beforeEach(() => {
    repo = new PrismaRecipeIngredientRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      },
    } as unknown as CreateOneRecipeIngredientDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    } as unknown;

    prismaMock.recipeIngredient.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.recipeIngredient.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueRecipeIngredientDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    } as unknown;

    prismaMock.recipeIngredient.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipeIngredient.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueRecipeIngredientDTO;

    prismaMock.recipeIngredient.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipeIngredient.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyRecipeIngredientDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    } as unknown;
    const rows = [row];
    const expected: FindManyRecipeIngredientResultDTO = {
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

    prismaMock.recipeIngredient.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.recipeIngredient.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneRecipeIngredientDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    } as unknown;

    prismaMock.recipeIngredient.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.recipeIngredient.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneRecipeIngredientDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    } as unknown;

    prismaMock.recipeIngredient.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.recipeIngredient.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      },
    } as unknown as UpsertOneRecipeIngredientDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    } as unknown as UpsertRecipeIngredientResultDTO;

    prismaMock.recipeIngredient.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.recipeIngredient.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountRecipeIngredientDTO;

    prismaMock.recipeIngredient.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountRecipeIngredientResultDTO;

    expect(prismaMock.recipeIngredient.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByRecipeIngredientDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByRecipeIngredientResultDTO;

    prismaMock.recipeIngredient.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.recipeIngredient.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      },
    } as unknown as CreateOneRecipeIngredientDTO;
    prismaMock.recipeIngredient.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
