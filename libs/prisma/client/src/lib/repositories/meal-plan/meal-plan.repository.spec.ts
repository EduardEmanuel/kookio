import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountMealPlanDTO,
  CountMealPlanResultDTO,
  CreateOneMealPlanDTO,
  FindUniqueMealPlanDTO,
  FindManyMealPlanDTO,
  FindManyMealPlanResultDTO,
  GroupByMealPlanDTO,
  GroupByMealPlanResultDTO,
  UpdateOneMealPlanDTO,
  DeleteOneMealPlanDTO,
  UpsertOneMealPlanDTO,
  UpsertMealPlanResultDTO,
} from '../../../dtos/meal-plan';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  mealPlan: {
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

import { PrismaMealPlanRepository } from './meal-plan.repository';

describe('PrismaMealPlanRepository (unit, mocked Prisma)', () => {
  let repo: PrismaMealPlanRepository;

  beforeEach(() => {
    repo = new PrismaMealPlanRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        startDate: now,
        endDate: now,
      },
    } as unknown as CreateOneMealPlanDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      startDate: now,
      endDate: now,
      slots: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealPlan.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.mealPlan.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueMealPlanDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      startDate: now,
      endDate: now,
      slots: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealPlan.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.mealPlan.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueMealPlanDTO;

    prismaMock.mealPlan.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.mealPlan.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyMealPlanDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      startDate: now,
      endDate: now,
      slots: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyMealPlanResultDTO = {
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

    prismaMock.mealPlan.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.mealPlan.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneMealPlanDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      startDate: now,
      endDate: now,
      slots: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealPlan.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.mealPlan.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneMealPlanDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      startDate: now,
      endDate: now,
      slots: [],
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.mealPlan.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.mealPlan.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        startDate: now,
        endDate: now,
      },
    } as unknown as UpsertOneMealPlanDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      startDate: now,
      endDate: now,
      slots: [],
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertMealPlanResultDTO;

    prismaMock.mealPlan.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.mealPlan.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountMealPlanDTO;

    prismaMock.mealPlan.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountMealPlanResultDTO;

    expect(prismaMock.mealPlan.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByMealPlanDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByMealPlanResultDTO;

    prismaMock.mealPlan.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.mealPlan.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        startDate: now,
        endDate: now,
      },
    } as unknown as CreateOneMealPlanDTO;
    prismaMock.mealPlan.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
