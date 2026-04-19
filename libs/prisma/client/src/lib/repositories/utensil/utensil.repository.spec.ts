import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountUtensilDTO,
  CountUtensilResultDTO,
  CreateOneUtensilDTO,
  FindUniqueUtensilDTO,
  FindManyUtensilDTO,
  FindManyUtensilResultDTO,
  GroupByUtensilDTO,
  GroupByUtensilResultDTO,
  UpdateOneUtensilDTO,
  DeleteOneUtensilDTO,
  UpsertOneUtensilDTO,
  UpsertUtensilResultDTO,
} from '../../../dtos/utensil';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  utensil: {
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

import { PrismaUtensilRepository } from './utensil.repository';

describe('PrismaUtensilRepository (unit, mocked Prisma)', () => {
  let repo: PrismaUtensilRepository;

  beforeEach(() => {
    repo = new PrismaUtensilRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: { slug: 'chef-knife', name: 'Chef Knife' },
    } as unknown as CreateOneUtensilDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chef-knife',
      name: 'Chef Knife',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.utensil.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.utensil.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueUtensilDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chef-knife',
      name: 'Chef Knife',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.utensil.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.utensil.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueUtensilDTO;

    prismaMock.utensil.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.utensil.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyUtensilDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chef-knife',
      name: 'Chef Knife',
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyUtensilResultDTO = {
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

    prismaMock.utensil.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.utensil.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneUtensilDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chef-knife',
      name: 'Chef Knife',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.utensil.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.utensil.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneUtensilDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chef-knife',
      name: 'Chef Knife',
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.utensil.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.utensil.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: { slug: 'chef-knife', name: 'Chef Knife' },
    } as unknown as UpsertOneUtensilDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      slug: 'chef-knife',
      name: 'Chef Knife',
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertUtensilResultDTO;

    prismaMock.utensil.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.utensil.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountUtensilDTO;

    prismaMock.utensil.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountUtensilResultDTO;

    expect(prismaMock.utensil.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByUtensilDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByUtensilResultDTO;

    prismaMock.utensil.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.utensil.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: { slug: 'chef-knife', name: 'Chef Knife' },
    } as unknown as CreateOneUtensilDTO;
    prismaMock.utensil.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
