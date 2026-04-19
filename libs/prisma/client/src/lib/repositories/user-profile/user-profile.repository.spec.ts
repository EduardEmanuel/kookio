import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  CountUserProfileDTO,
  CountUserProfileResultDTO,
  CreateOneUserProfileDTO,
  FindUniqueUserProfileDTO,
  FindManyUserProfileDTO,
  FindManyUserProfileResultDTO,
  GroupByUserProfileDTO,
  GroupByUserProfileResultDTO,
  UpdateOneUserProfileDTO,
  DeleteOneUserProfileDTO,
  UpsertOneUserProfileDTO,
  UpsertUserProfileResultDTO,
} from '../../../dtos/user-profile';

const now = new Date();
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  userProfile: {
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

import { PrismaUserProfileRepository } from './user-profile.repository';

describe('PrismaUserProfileRepository (unit, mocked Prisma)', () => {
  let repo: PrismaUserProfileRepository;

  beforeEach(() => {
    repo = new PrismaUserProfileRepository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        adultsCount: 1,
        childrenCount: 0,
        onboardingDone: false,
      },
    } as unknown as CreateOneUserProfileDTO;
    const created = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      adultsCount: 1,
      childrenCount: 0,
      onboardingDone: false,
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.userProfile.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.userProfile.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = { where: { id } } as unknown as FindUniqueUserProfileDTO;
    const found = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      adultsCount: 1,
      childrenCount: 0,
      onboardingDone: false,
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.userProfile.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.userProfile.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = { where: { id } } as unknown as FindUniqueUserProfileDTO;

    prismaMock.userProfile.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.userProfile.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindManyUserProfileDTO;
    const row = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      adultsCount: 1,
      childrenCount: 0,
      onboardingDone: false,
      createdAt: now,
      updatedAt: now,
    } as unknown;
    const rows = [row];
    const expected: FindManyUserProfileResultDTO = {
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

    prismaMock.userProfile.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.userProfile.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = {
      where: { id },
      data: {},
    } as unknown as UpdateOneUserProfileDTO;
    const updated = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      adultsCount: 1,
      childrenCount: 0,
      onboardingDone: false,
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.userProfile.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.userProfile.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = { where: { id } } as unknown as DeleteOneUserProfileDTO;
    const deleted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      adultsCount: 1,
      childrenCount: 0,
      onboardingDone: false,
      createdAt: now,
      updatedAt: now,
    } as unknown;

    prismaMock.userProfile.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.userProfile.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        adultsCount: 1,
        childrenCount: 0,
        onboardingDone: false,
      },
    } as unknown as UpsertOneUserProfileDTO;
    const upserted = {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: id,
      adultsCount: 1,
      childrenCount: 0,
      onboardingDone: false,
      createdAt: now,
      updatedAt: now,
    } as unknown as UpsertUserProfileResultDTO;

    prismaMock.userProfile.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.userProfile.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as CountUserProfileDTO;

    prismaMock.userProfile.count.mockResolvedValue(42);

    const result = (await repo.count(
      clause,
    )) as unknown as CountUserProfileResultDTO;

    expect(prismaMock.userProfile.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupByUserProfileDTO;
    const grouped = [
      { id, _count: { id: 1 } },
    ] as unknown as GroupByUserProfileResultDTO;

    prismaMock.userProfile.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.userProfile.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = {
      data: {
        userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        adultsCount: 1,
        childrenCount: 0,
        onboardingDone: false,
      },
    } as unknown as CreateOneUserProfileDTO;
    prismaMock.userProfile.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
