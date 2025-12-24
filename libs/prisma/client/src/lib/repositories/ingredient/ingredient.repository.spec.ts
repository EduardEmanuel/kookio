import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { 
  CreateIngredientResultDTO,
  CreateOneIngredientDTO,
  DeleteIngredientResultDTO,
  DeleteOneIngredientDTO,
  FindManyIngredientDTO,
  FindManyIngredientResultDTO,
  FindUniqueIngredientDTO,
  FindUniqueIngredientResultDTO,
  UpdateIngredientResultDTO,
  UpdateOneIngredientDTO, 
} from '@kookio/prisma-validator';

const now = new Date();
const prismaMock = vi.hoisted(() => ({
  ingredient: {
    create: vi.fn(),
    createMany: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
    findUnique: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
  },
}));

vi.mock('../../prisma-client', async (importActual) => {
  const actual = await importActual<typeof import('../../prisma-client')>();
  const prisma = prismaMock;

  return {
    ...actual,
    prisma,
    withTxRetry: async (prisma: PrismaClient, fn: (tx: typeof prismaMock) => Promise<unknown>) => fn(prismaMock),
  };
});

import { PrismaIngredientRepository } from './ingredient.repository';

describe('PrismaIngredientRepository (unit, mocked Prisma)', () => {
  let repo: PrismaIngredientRepository;

  beforeEach(() => {
    repo = new PrismaIngredientRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const data = { userId: 'u1', name: 'Apple', quantity: 2, unit: 'pcs', optional: true };
    const input: CreateOneIngredientDTO = { data };
    const created: CreateIngredientResultDTO = {
      id: '11111111-1111-4111-8111-111111111111',
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    prismaMock.ingredient.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.ingredient.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause: FindUniqueIngredientDTO = { where: { id: '22222222-2222-4222-8222-222222222222' } };
    const found: FindUniqueIngredientResultDTO = {
      id: clause.where.id as string,
      userId: 'u1',
      name: 'Banana',
      quantity: 3,
      unit: 'pcs',
      optional: false,
      createdAt: now,
      updatedAt: now,
    };

    prismaMock.ingredient.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.ingredient.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause: FindUniqueIngredientDTO = { where: { id: '33333333-3333-4333-8333-333333333333' } };

    prismaMock.ingredient.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.ingredient.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: returns array of ingredients', async () => {
    const data = [{
      id: '44444444-4444-4444-8444-444444444444',
      userId: 'u1',
      name: 'Carrot',
      quantity: 5,
      unit: 'pcs',
      optional: false,
      createdAt: now,
      updatedAt: now,
    }];
    const input = {} as FindManyIngredientDTO;
    const pagination = {
        page: 1,
        pageSize: data.length,
        total: data.length,
        totalPages: 1,
        hasPrev: false,
        hasNext: false,
      }
    const rows: FindManyIngredientResultDTO = { data, pagination };

    prismaMock.ingredient.findMany.mockResolvedValue(data);

    const result = await repo.findMany(input);

    expect(prismaMock.ingredient.findMany).toHaveBeenCalledWith(input);
    expect(result).toEqual(rows);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause: UpdateOneIngredientDTO = {
      where: { id: '55555555-5555-4555-8555-555555555555' },
      data: { quantity: 10, optional: true },
    };
    const updated: UpdateIngredientResultDTO = {
      id: clause.where?.id as string,
      userId: 'u1',
      name: 'Dates',
      quantity: 10,
      unit: 'pcs',
      optional: true,
      createdAt: now,
      updatedAt: now,
    };

    prismaMock.ingredient.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.ingredient.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause: DeleteOneIngredientDTO = { where: { id: '66666666-6666-4666-8666-666666666666' } };
    const deleted: DeleteIngredientResultDTO = {
      id: clause.where.id as string,
      userId: 'u1',
      name: 'Eggplant',
      quantity: 1,
      unit: 'pcs',
      optional: false,
      createdAt: now,
      updatedAt: now,
    };
    prismaMock.ingredient.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.ingredient.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('propagates errors from Prisma (e.g., on create)', async () => {
    const input: CreateOneIngredientDTO = { data: { userId: 'u1', name: 'Fig', quantity: 1, unit: 'pcs', optional: false } };
    const err = new Error('boom');

    prismaMock.ingredient.create.mockRejectedValue(err);

    await expect(repo.create(input)).rejects.toThrow('boom');
  });
});