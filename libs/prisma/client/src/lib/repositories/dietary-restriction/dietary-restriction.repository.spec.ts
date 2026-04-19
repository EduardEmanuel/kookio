import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountDietaryRestrictionDTO,
  CountDietaryRestrictionResultDTO,
  CreateOneDietaryRestrictionDTO,
  FindUniqueDietaryRestrictionDTO,
  FindManyDietaryRestrictionDTO,
  FindManyDietaryRestrictionResultDTO,
  GroupByDietaryRestrictionDTO,
  GroupByDietaryRestrictionResultDTO,
  UpdateOneDietaryRestrictionDTO,
  DeleteOneDietaryRestrictionDTO,
  UpsertOneDietaryRestrictionDTO,
  UpsertDietaryRestrictionResultDTO,
} from '../../../dtos/dietary-restriction';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  dietaryRestriction: {
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

import { PrismaDietaryRestrictionRepository } from './dietary-restriction.repository';

describe('PrismaDietaryRestrictionRepository (unit, mocked Prisma)', () => {
  let repo: PrismaDietaryRestrictionRepository;

  beforeEach(() => {
    repo = new PrismaDietaryRestrictionRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: { slug: 'gluten-free', label: 'Gluten Free' },
    } as unknown as CreateOneDietaryRestrictionDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'gluten-free',
      label: 'Gluten Free',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.dietaryRestriction.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.dietaryRestriction.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueDietaryRestrictionDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'gluten-free',
      label: 'Gluten Free',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.dietaryRestriction.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.dietaryRestriction.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = {
      where: { id },
    } as unknown as FindUniqueDietaryRestrictionDTO;

    prismaMock.dietaryRestriction.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.dietaryRestriction.findUnique).toHaveBeenCalledWith(
      clause,
    );
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyDietaryRestrictionDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'gluten-free',
      label: 'Gluten Free',
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyDietaryRestrictionResultDTO = {
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

    prismaMock.dietaryRestriction.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.dietaryRestriction.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneDietaryRestrictionDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'gluten-free',
      label: 'Gluten Free',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.dietaryRestriction.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.dietaryRestriction.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = {
      where: { id },
    } as unknown as DeleteOneDietaryRestrictionDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'gluten-free',
      label: 'Gluten Free',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.dietaryRestriction.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.dietaryRestriction.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: { slug: 'gluten-free', label: 'Gluten Free' },
    } as unknown as UpsertOneDietaryRestrictionDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'gluten-free',
      label: 'Gluten Free',
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertDietaryRestrictionResultDTO;

    prismaMock.dietaryRestriction.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.dietaryRestriction.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountDietaryRestrictionDTO;

    prismaMock.dietaryRestriction.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountDietaryRestrictionResultDTO;

    expect(prismaMock.dietaryRestriction.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByDietaryRestrictionDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByDietaryRestrictionResultDTO;

    prismaMock.dietaryRestriction.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.dietaryRestriction.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: { slug: 'gluten-free', label: 'Gluten Free' },
    } as unknown as CreateOneDietaryRestrictionDTO;
    prismaMock.dietaryRestriction.create.mockRejectedValue(
      new Error('db error'),
    );

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
