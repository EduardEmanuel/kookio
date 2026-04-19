import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountCookingSessionDTO,
  CountCookingSessionResultDTO,
  CreateOneCookingSessionDTO,
  FindUniqueCookingSessionDTO,
  FindManyCookingSessionDTO,
  FindManyCookingSessionResultDTO,
  GroupByCookingSessionDTO,
  GroupByCookingSessionResultDTO,
  UpdateOneCookingSessionDTO,
  DeleteOneCookingSessionDTO,
  UpsertOneCookingSessionDTO,
  UpsertCookingSessionResultDTO,
} from '../../../dtos/cooking-session';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  cookingSession: {
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

import { PrismaCookingSessionRepository } from './cooking-session.repository';

describe('PrismaCookingSessionRepository (unit, mocked Prisma)', () => {
  let repo: PrismaCookingSessionRepository;

  beforeEach(() => {
    repo = new PrismaCookingSessionRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
        servings: 2,
      },
    } as unknown as CreateOneCookingSessionDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      servings: 2,
      createdAt: now,
    } as unknown;

    prismaMock.cookingSession.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.cookingSession.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueCookingSessionDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      servings: 2,
      createdAt: now,
    } as unknown;

    prismaMock.cookingSession.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.cookingSession.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueCookingSessionDTO;

    prismaMock.cookingSession.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.cookingSession.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyCookingSessionDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      servings: 2,
      createdAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyCookingSessionResultDTO = {
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

    prismaMock.cookingSession.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.cookingSession.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneCookingSessionDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      servings: 2,
      createdAt: now,
    } as unknown;

    prismaMock.cookingSession.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.cookingSession.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneCookingSessionDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      servings: 2,
      createdAt: now,
    } as unknown;

    prismaMock.cookingSession.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.cookingSession.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
        servings: 2,
      },
    } as unknown as UpsertOneCookingSessionDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      servings: 2,
      createdAt: now,
    } as unknown as UpsertCookingSessionResultDTO;

    prismaMock.cookingSession.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.cookingSession.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountCookingSessionDTO;

    prismaMock.cookingSession.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountCookingSessionResultDTO;

    expect(prismaMock.cookingSession.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByCookingSessionDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByCookingSessionResultDTO;

    prismaMock.cookingSession.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.cookingSession.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
        servings: 2,
      },
    } as unknown as CreateOneCookingSessionDTO;
    prismaMock.cookingSession.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
