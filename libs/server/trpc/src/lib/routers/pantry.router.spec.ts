import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  type AuthSession,
} from '@kookio/prisma-client';

import type { Context } from '../context';
import { appRouter } from './index';

const Unit = MeasureUnitSchema.enum;
const IngCategory = IngredientCategorySchema.enum;

type PrismaMock = {
  pantryItem: {
    findMany: ReturnType<typeof vi.fn>;
    findFirst: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    deleteMany: ReturnType<typeof vi.fn>;
  };
  ingredientCatalog: {
    findUnique: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
  };
};

const makeSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: 'user-123',
  email: 'user@example.com',
  name: null,
  roles: [],
  amr: ['password'],
  onboardingDone: true,
  ...overrides,
});

const makeCtx = (
  session: AuthSession | null,
  prismaMock: PrismaMock,
): Context =>
  ({
    token: session ? 'fake-token' : undefined,
    session,
    prisma: prismaMock,
  }) as unknown as Context;

const makePrismaMock = (): PrismaMock => ({
  pantryItem: {
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deleteMany: vi.fn(),
  },
  ingredientCatalog: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
  },
});

const ingredientRow = {
  id: 'ing-1',
  name: 'Tomato',
  imageUrl: null,
  category: IngCategory.PRODUCE,
};

const pantryRow = {
  id: 'pi-1',
  userId: 'user-123',
  ingredientCatalogId: 'ing-1',
  quantity: 500,
  unit: Unit.G,
  expiresAt: null as Date | null,
  addedAt: new Date('2026-05-01T00:00:00.000Z'),
  updatedAt: new Date('2026-05-01T00:00:00.000Z'),
  ingredient: ingredientRow,
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('pantry router', () => {
  describe('list', () => {
    it('returns items ordered by expiresAt asc then addedAt desc', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.pantryItem.findMany.mockResolvedValue([pantryRow]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.pantry.list();

      expect(result).toEqual([pantryRow]);
      expect(prismaMock.pantryItem.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        include: {
          ingredient: {
            select: { id: true, name: true, imageUrl: true, category: true },
          },
        },
        orderBy: [{ expiresAt: 'asc' }, { addedAt: 'desc' }],
      });
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(caller.pantry.list()).rejects.toMatchObject({
        code: 'PRECONDITION_FAILED',
      });
      expect(prismaMock.pantryItem.findMany).not.toHaveBeenCalled();
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.pantry.list()).rejects.toMatchObject({
        code: 'UNAUTHORIZED',
      });
    });

    it('translates Prisma failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.pantryItem.findMany.mockRejectedValue(new Error('db down'));
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(caller.pantry.list()).rejects.toMatchObject({
        code: 'INTERNAL_SERVER_ERROR',
      });
    });
  });

  describe('add', () => {
    it('creates a pantry item when the catalog id resolves', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.ingredientCatalog.findUnique.mockResolvedValue({
        id: 'ing-1',
      });
      prismaMock.pantryItem.create.mockResolvedValue(pantryRow);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.pantry.add({
        ingredientCatalogId: 'a4b6f2c0-0000-0000-0000-000000000001',
        quantity: 500,
        unit: Unit.G,
        expiresAt: null,
      });

      expect(result).toEqual(pantryRow);
      expect(prismaMock.pantryItem.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          ingredientCatalogId: 'a4b6f2c0-0000-0000-0000-000000000001',
          quantity: 500,
          unit: Unit.G,
          expiresAt: null,
        },
        include: {
          ingredient: {
            select: { id: true, name: true, imageUrl: true, category: true },
          },
        },
      });
    });

    it('coerces an ISO expiresAt string to a Date', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.ingredientCatalog.findUnique.mockResolvedValue({
        id: 'ing-1',
      });
      prismaMock.pantryItem.create.mockResolvedValue({
        ...pantryRow,
        expiresAt: new Date('2026-06-01T00:00:00.000Z'),
      });
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.pantry.add({
        ingredientCatalogId: 'a4b6f2c0-0000-0000-0000-000000000001',
        quantity: 500,
        unit: Unit.G,
        expiresAt: '2026-06-01T00:00:00.000Z',
      });

      const createArgs = prismaMock.pantryItem.create.mock.calls[0][0];
      expect(createArgs.data.expiresAt).toBeInstanceOf(Date);
      expect((createArgs.data.expiresAt as Date).toISOString()).toBe(
        '2026-06-01T00:00:00.000Z',
      );
    });

    it('throws NOT_FOUND when the ingredient catalog id does not resolve', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.ingredientCatalog.findUnique.mockResolvedValue(null);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.pantry.add({
          ingredientCatalogId: 'a4b6f2c0-0000-0000-0000-000000000099',
          quantity: 100,
          unit: Unit.G,
        }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
      expect(prismaMock.pantryItem.create).not.toHaveBeenCalled();
    });

    it('translates Prisma P2002 to CONFLICT (duplicate pantry entry)', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.ingredientCatalog.findUnique.mockResolvedValue({
        id: 'ing-1',
      });
      prismaMock.pantryItem.create.mockRejectedValue({
        code: 'P2002',
        message: 'Unique constraint failed',
      });
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.pantry.add({
          ingredientCatalogId: 'a4b6f2c0-0000-0000-0000-000000000001',
          quantity: 500,
          unit: Unit.G,
        }),
      ).rejects.toMatchObject({ code: 'CONFLICT' });
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(
        caller.pantry.add({
          ingredientCatalogId: 'a4b6f2c0-0000-0000-0000-000000000001',
          quantity: 500,
          unit: Unit.G,
        }),
      ).rejects.toMatchObject({ code: 'PRECONDITION_FAILED' });
      expect(prismaMock.ingredientCatalog.findUnique).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('updates only the fields present in the input', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.pantryItem.findFirst.mockResolvedValue({ id: 'pi-1' });
      prismaMock.pantryItem.update.mockResolvedValue({
        ...pantryRow,
        quantity: 750,
      });
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.pantry.update({
        id: 'a4b6f2c0-0000-0000-0000-000000000001',
        quantity: 750,
      });

      expect(result.quantity).toBe(750);
      expect(prismaMock.pantryItem.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'a4b6f2c0-0000-0000-0000-000000000001',
          userId: 'user-123',
        },
        select: { id: true },
      });
      expect(prismaMock.pantryItem.update).toHaveBeenCalledWith({
        where: { id: 'a4b6f2c0-0000-0000-0000-000000000001' },
        data: { quantity: 750 },
        include: {
          ingredient: {
            select: { id: true, name: true, imageUrl: true, category: true },
          },
        },
      });
    });

    it('clears expiresAt when the input is explicitly null', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.pantryItem.findFirst.mockResolvedValue({ id: 'pi-1' });
      prismaMock.pantryItem.update.mockResolvedValue(pantryRow);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.pantry.update({
        id: 'a4b6f2c0-0000-0000-0000-000000000001',
        expiresAt: null,
      });

      expect(prismaMock.pantryItem.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { expiresAt: null },
        }),
      );
    });

    it('throws NOT_FOUND when the item belongs to another user', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.pantryItem.findFirst.mockResolvedValue(null);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.pantry.update({
          id: 'a4b6f2c0-0000-0000-0000-000000000001',
          quantity: 100,
        }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
      expect(prismaMock.pantryItem.update).not.toHaveBeenCalled();
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(
        caller.pantry.update({
          id: 'a4b6f2c0-0000-0000-0000-000000000001',
          quantity: 100,
        }),
      ).rejects.toMatchObject({ code: 'PRECONDITION_FAILED' });
    });
  });

  describe('remove', () => {
    it('deletes the item when it belongs to the caller', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.pantryItem.deleteMany.mockResolvedValue({ count: 1 });
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.pantry.remove({
        id: 'a4b6f2c0-0000-0000-0000-000000000001',
      });

      expect(result).toEqual({ id: 'a4b6f2c0-0000-0000-0000-000000000001' });
      expect(prismaMock.pantryItem.deleteMany).toHaveBeenCalledWith({
        where: {
          id: 'a4b6f2c0-0000-0000-0000-000000000001',
          userId: 'user-123',
        },
      });
    });

    it('throws NOT_FOUND when no row matches the caller', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.pantryItem.deleteMany.mockResolvedValue({ count: 0 });
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.pantry.remove({
          id: 'a4b6f2c0-0000-0000-0000-000000000001',
        }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(
        caller.pantry.remove({
          id: 'a4b6f2c0-0000-0000-0000-000000000001',
        }),
      ).rejects.toMatchObject({ code: 'PRECONDITION_FAILED' });
      expect(prismaMock.pantryItem.deleteMany).not.toHaveBeenCalled();
    });
  });

  describe('searchIngredients', () => {
    it('queries the catalog with a normalized contains filter', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.ingredientCatalog.findMany.mockResolvedValue([ingredientRow]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.pantry.searchIngredients({
        query: '  Tomato  ',
        limit: 10,
      });

      expect(result).toEqual([ingredientRow]);
      expect(prismaMock.ingredientCatalog.findMany).toHaveBeenCalledWith({
        where: {
          normalizedName: {
            contains: 'tomato',
            mode: 'insensitive',
          },
        },
        take: 10,
        orderBy: { name: 'asc' },
        select: { id: true, name: true, imageUrl: true, category: true },
      });
    });

    it('does NOT require completed onboarding (used during onboarding step)', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.ingredientCatalog.findMany.mockResolvedValue([]);
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(
        caller.pantry.searchIngredients({ query: 'tomato' }),
      ).resolves.toEqual([]);
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(
        caller.pantry.searchIngredients({ query: 'tomato' }),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
    });
  });
});
