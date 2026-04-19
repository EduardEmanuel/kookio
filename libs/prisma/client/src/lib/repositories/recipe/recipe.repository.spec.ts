import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountRecipeDTO,
  CountRecipeResultDTO,
  CreateOneRecipeDTO,
  FindUniqueRecipeDTO,
  FindManyRecipeDTO,
  FindManyRecipeResultDTO,
  GroupByRecipeDTO,
  GroupByRecipeResultDTO,
  UpdateOneRecipeDTO,
  DeleteOneRecipeDTO,
  UpsertOneRecipeDTO,
  UpsertRecipeResultDTO,
} from '../../../dtos/recipe';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  recipe: {
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

import { PrismaRecipeRepository } from './recipe.repository';

describe('PrismaRecipeRepository (unit, mocked Prisma)', () => {
  let repo: PrismaRecipeRepository;

  beforeEach(() => {
    repo = new PrismaRecipeRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        slug: 'chicken-tikka',
        title: 'Chicken Tikka',
        instructions: 'Cook it.',
        status: 'DRAFT',
        servings: 2,
      },
    } as unknown as CreateOneRecipeDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chicken-tikka',
      title: 'Chicken Tikka',
      instructions: 'Cook it.',
      status: 'DRAFT',
      servings: 2,
      ingredients: [],
      tags: [],
      collectionEntries: [],
      mealPlanSlots: [],
      cookingSessions: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.recipe.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.recipe.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueRecipeDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chicken-tikka',
      title: 'Chicken Tikka',
      instructions: 'Cook it.',
      status: 'DRAFT',
      servings: 2,
      ingredients: [],
      tags: [],
      collectionEntries: [],
      mealPlanSlots: [],
      cookingSessions: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.recipe.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipe.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueRecipeDTO;

    prismaMock.recipe.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.recipe.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyRecipeDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chicken-tikka',
      title: 'Chicken Tikka',
      instructions: 'Cook it.',
      status: 'DRAFT',
      servings: 2,
      ingredients: [],
      tags: [],
      collectionEntries: [],
      mealPlanSlots: [],
      cookingSessions: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyRecipeResultDTO = {
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

    prismaMock.recipe.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.recipe.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = { where: { id }, data: {} } as unknown as UpdateOneRecipeDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chicken-tikka',
      title: 'Chicken Tikka',
      instructions: 'Cook it.',
      status: 'DRAFT',
      servings: 2,
      ingredients: [],
      tags: [],
      collectionEntries: [],
      mealPlanSlots: [],
      cookingSessions: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.recipe.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.recipe.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneRecipeDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chicken-tikka',
      title: 'Chicken Tikka',
      instructions: 'Cook it.',
      status: 'DRAFT',
      servings: 2,
      ingredients: [],
      tags: [],
      collectionEntries: [],
      mealPlanSlots: [],
      cookingSessions: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.recipe.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.recipe.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        slug: 'chicken-tikka',
        title: 'Chicken Tikka',
        instructions: 'Cook it.',
        status: 'DRAFT',
        servings: 2,
      },
    } as unknown as UpsertOneRecipeDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chicken-tikka',
      title: 'Chicken Tikka',
      instructions: 'Cook it.',
      status: 'DRAFT',
      servings: 2,
      ingredients: [],
      tags: [],
      collectionEntries: [],
      mealPlanSlots: [],
      cookingSessions: [],
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertRecipeResultDTO;

    prismaMock.recipe.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.recipe.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountRecipeDTO;

    prismaMock.recipe.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountRecipeResultDTO;

    expect(prismaMock.recipe.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByRecipeDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByRecipeResultDTO;

    prismaMock.recipe.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.recipe.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        slug: 'chicken-tikka',
        title: 'Chicken Tikka',
        instructions: 'Cook it.',
        status: 'DRAFT',
        servings: 2,
      },
    } as unknown as CreateOneRecipeDTO;
    prismaMock.recipe.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
