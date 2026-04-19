import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountMealPlanSlotDTO,
  CountMealPlanSlotResultDTO,
  CreateOneMealPlanSlotDTO,
  FindUniqueMealPlanSlotDTO,
  FindManyMealPlanSlotDTO,
  FindManyMealPlanSlotResultDTO,
  GroupByMealPlanSlotDTO,
  GroupByMealPlanSlotResultDTO,
  UpdateOneMealPlanSlotDTO,
  DeleteOneMealPlanSlotDTO,
  UpsertOneMealPlanSlotDTO,
  UpsertMealPlanSlotResultDTO,
} from '../../../dtos/meal-plan-slot';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  mealPlanSlot: {
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

import { PrismaMealPlanSlotRepository } from './meal-plan-slot.repository';

describe('PrismaMealPlanSlotRepository (unit, mocked Prisma)', () => {
  let repo: PrismaMealPlanSlotRepository;

  beforeEach(() => {
    repo = new PrismaMealPlanSlotRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        date: now,
        slotType: 'BREAKFAST',
        servings: 2,
      },
    } as unknown as CreateOneMealPlanSlotDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      date: now,
      slotType: 'BREAKFAST',
      servings: 2,
      mealPlan: null,
    } as unknown;

    prismaMock.mealPlanSlot.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.mealPlanSlot.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueMealPlanSlotDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      date: now,
      slotType: 'BREAKFAST',
      servings: 2,
      mealPlan: null,
    } as unknown;

    prismaMock.mealPlanSlot.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.mealPlanSlot.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueMealPlanSlotDTO;

    prismaMock.mealPlanSlot.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.mealPlanSlot.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyMealPlanSlotDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      date: now,
      slotType: 'BREAKFAST',
      servings: 2,
      mealPlan: null,
    } as unknown;
    const rows = [row];
    const expected: FindManyMealPlanSlotResultDTO = {
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

    prismaMock.mealPlanSlot.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.mealPlanSlot.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneMealPlanSlotDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      date: now,
      slotType: 'BREAKFAST',
      servings: 2,
      mealPlan: null,
    } as unknown;

    prismaMock.mealPlanSlot.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.mealPlanSlot.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneMealPlanSlotDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      date: now,
      slotType: 'BREAKFAST',
      servings: 2,
      mealPlan: null,
    } as unknown;

    prismaMock.mealPlanSlot.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.mealPlanSlot.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        date: now,
        slotType: 'BREAKFAST',
        servings: 2,
      },
    } as unknown as UpsertOneMealPlanSlotDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      date: now,
      slotType: 'BREAKFAST',
      servings: 2,
      mealPlan: null,
    } as unknown as UpsertMealPlanSlotResultDTO;

    prismaMock.mealPlanSlot.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.mealPlanSlot.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountMealPlanSlotDTO;

    prismaMock.mealPlanSlot.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountMealPlanSlotResultDTO;

    expect(prismaMock.mealPlanSlot.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByMealPlanSlotDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByMealPlanSlotResultDTO;

    prismaMock.mealPlanSlot.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.mealPlanSlot.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        date: now,
        slotType: 'BREAKFAST',
        servings: 2,
      },
    } as unknown as CreateOneMealPlanSlotDTO;
    prismaMock.mealPlanSlot.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
