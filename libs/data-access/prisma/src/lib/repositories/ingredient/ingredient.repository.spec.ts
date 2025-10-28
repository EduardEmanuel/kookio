import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaIngredientRepository } from './ingredient.repository';

const now = new Date();

type Ingredient = {
  id: string;
  userId: string;
  name: string;
  quantity: number;
  unit: string;
  optional: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};

function createMockPrisma() {
  return {
    ingredient: {
      create: vi.fn(),
      delete: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
    },
  };
}

describe('PrismaIngredientRepository (unit, mocked Prisma)', () => {
  let prisma: ReturnType<typeof createMockPrisma>;
  let repo: PrismaIngredientRepository;

  beforeEach(() => {
    prisma = createMockPrisma();
    // forțăm cast-ul pentru a satisface constructorul (nu folosim alte proprietăți)
    repo = new PrismaIngredientRepository(prisma as any);
    vi.clearAllMocks();
  });

  it('create: forwards { data } and returns created record', async () => {
    const input = { userId: 'u1', name: 'Apple', quantity: 2, unit: 'pcs', optional: true };
    const created: Ingredient = {
      id: '11111111-1111-4111-8111-111111111111',
      ...input,
      createdAt: now,
      updatedAt: null,
    };
    prisma.ingredient.create.mockResolvedValue(created);

    const result = await repo.create(input as any);

    expect(prisma.ingredient.create).toHaveBeenCalledWith({ data: input });
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id: '22222222-2222-4222-8222-222222222222' } };
    const found: Ingredient = {
      id: clause.where.id,
      userId: 'u1',
      name: 'Banana',
      quantity: 3,
      unit: 'pcs',
      optional: false,
      createdAt: now,
      updatedAt: null,
    };
    prisma.ingredient.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause as any);

    expect(prisma.ingredient.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id: '33333333-3333-4333-8333-333333333333' } };
    prisma.ingredient.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause as any);

    expect(prisma.ingredient.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('list: returns array of ingredients', async () => {
    const rows: Ingredient[] = [
      {
        id: '44444444-4444-4444-8444-444444444444',
        userId: 'u1',
        name: 'Carrot',
        quantity: 5,
        unit: 'pcs',
        optional: false,
        createdAt: now,
        updatedAt: null,
      },
    ];
    prisma.ingredient.findMany.mockResolvedValue(rows);

    const result = await repo.list();

    expect(prisma.ingredient.findMany).toHaveBeenCalledWith();
    expect(result).toEqual(rows);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id: '55555555-5555-4555-8555-555555555555' },
      data: { quantity: 10, optional: true },
    };
    const updated: Ingredient = {
      id: clause.where.id,
      userId: 'u1',
      name: 'Dates',
      quantity: 10,
      unit: 'pcs',
      optional: true,
      createdAt: now,
      updatedAt: now,
    };
    prisma.ingredient.update.mockResolvedValue(updated);

    const result = await repo.update(clause as any);

    expect(prisma.ingredient.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id: '66666666-6666-4666-8666-666666666666' } };
    const deleted: Ingredient = {
      id: clause.where.id,
      userId: 'u1',
      name: 'Eggplant',
      quantity: 1,
      unit: 'pcs',
      optional: false,
      createdAt: now,
      updatedAt: null,
    };
    prisma.ingredient.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause as any);

    expect(prisma.ingredient.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('propagates errors from Prisma (e.g., on create)', async () => {
    const input = { userId: 'u1', name: 'Fig', quantity: 1, unit: 'pcs' };
    const err = new Error('boom');
    prisma.ingredient.create.mockRejectedValue(err);

    await expect(repo.create(input as any)).rejects.toThrow('boom');
  });
});