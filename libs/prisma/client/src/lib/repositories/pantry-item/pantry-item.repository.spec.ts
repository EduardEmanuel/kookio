import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountPantryItemDTO,
  CountPantryItemResultDTO,
  CreateOnePantryItemDTO,
  FindUniquePantryItemDTO,
  FindManyPantryItemDTO,
  FindManyPantryItemResultDTO,
  GroupByPantryItemDTO,
  GroupByPantryItemResultDTO,
  UpdateOnePantryItemDTO,
  DeleteOnePantryItemDTO,
  UpsertOnePantryItemDTO,
  UpsertPantryItemResultDTO,
} from '../../../dtos/pantry-item';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  pantryItem: {
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

import { PrismaPantryItemRepository } from './pantry-item.repository';

describe('PrismaPantryItemRepository (unit, mocked Prisma)', () => {
  let repo: PrismaPantryItemRepository;

  beforeEach(() => {
    repo = new PrismaPantryItemRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
        quantity: 1,
      },
    } as unknown as CreateOnePantryItemDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      quantity: 1,
      addedAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.pantryItem.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.pantryItem.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniquePantryItemDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      quantity: 1,
      addedAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.pantryItem.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.pantryItem.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniquePantryItemDTO;

    prismaMock.pantryItem.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.pantryItem.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyPantryItemDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      quantity: 1,
      addedAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyPantryItemResultDTO = {
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

    prismaMock.pantryItem.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.pantryItem.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOnePantryItemDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      quantity: 1,
      addedAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.pantryItem.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.pantryItem.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOnePantryItemDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      quantity: 1,
      addedAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.pantryItem.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.pantryItem.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
        quantity: 1,
      },
    } as unknown as UpsertOnePantryItemDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      quantity: 1,
      addedAt: now,
      updatedAt: now,
    } as unknown as UpsertPantryItemResultDTO;

    prismaMock.pantryItem.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.pantryItem.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountPantryItemDTO;

    prismaMock.pantryItem.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountPantryItemResultDTO;

    expect(prismaMock.pantryItem.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByPantryItemDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByPantryItemResultDTO;

    prismaMock.pantryItem.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.pantryItem.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
        quantity: 1,
      },
    } as unknown as CreateOnePantryItemDTO;
    prismaMock.pantryItem.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
