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

const USER_ID = 'user-123';
const OTHER_USER_ID = 'user-other';
const RECIPE_ID = '11111111-1111-4111-8111-111111111111';
const SESSION_ID = '22222222-2222-4222-8222-222222222222';
const PANTRY_ID_TOMATO = '33333333-3333-4333-8333-333333333333';
const PANTRY_ID_FLOUR = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const ING_TOMATO = '44444444-4444-4444-8444-444444444444';
const ING_FLOUR = '55555555-5555-4555-8555-555555555555';
const ING_SALT = '66666666-6666-4666-8666-666666666666';

const CREATED_AT = new Date('2026-05-12T10:00:00.000Z');
const COMPLETED_AT = new Date('2026-05-12T10:30:00.000Z');

type TxMock = {
  cookingSession: {
    findUnique: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };
  pantryItem: {
    findUnique: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

type PrismaMock = TxMock & {
  recipe: {
    findFirst: ReturnType<typeof vi.fn>;
  };
  cookingSession: TxMock['cookingSession'] & {
    create: ReturnType<typeof vi.fn>;
  };
  pantryItem: TxMock['pantryItem'] & {
    findMany: ReturnType<typeof vi.fn>;
  };
  $transaction: ReturnType<typeof vi.fn>;
};

const makeSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: USER_ID,
  email: 'user@example.com',
  roles: [],
  amr: ['password'],
  onboardingDone: true,
  ...overrides,
});

const makeTxMock = (): TxMock => ({
  cookingSession: {
    findUnique: vi.fn(),
    update: vi.fn(),
  },
  pantryItem: {
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
});

const makePrismaMock = (txOverride?: TxMock): PrismaMock => {
  const tx = txOverride ?? makeTxMock();
  return {
    recipe: { findFirst: vi.fn() },
    cookingSession: {
      ...tx.cookingSession,
      create: vi.fn(),
    },
    pantryItem: {
      ...tx.pantryItem,
      findMany: vi.fn(),
    },
    $transaction: vi.fn((fn: (innerTx: TxMock) => Promise<unknown>) => fn(tx)),
  };
};

const makeCtx = (
  session: AuthSession | null,
  prismaMock: PrismaMock,
): Context =>
  ({
    token: session ? 'fake-token' : undefined,
    session,
    prisma: prismaMock,
  }) as unknown as Context;

afterEach(() => {
  vi.restoreAllMocks();
});

describe('cookingSession router', () => {
  describe('start', () => {
    it('creates a session for a PUBLIC recipe and returns id + createdAt', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue({ id: RECIPE_ID });
      prismaMock.cookingSession.create.mockResolvedValue({
        id: SESSION_ID,
        createdAt: CREATED_AT,
      });
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.cookingSession.start({
        recipeId: RECIPE_ID,
        servings: 4,
      });

      expect(result).toEqual({
        sessionId: SESSION_ID,
        createdAt: CREATED_AT,
      });
      expect(prismaMock.recipe.findFirst).toHaveBeenCalledWith({
        where: { id: RECIPE_ID, status: 'PUBLIC' },
        select: { id: true },
      });
      expect(prismaMock.cookingSession.create).toHaveBeenCalledWith({
        data: { userId: USER_ID, recipeId: RECIPE_ID, servings: 4 },
        select: { id: true, createdAt: true },
      });
    });

    it('throws NOT_FOUND when the recipe does not exist', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue(null);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.cookingSession.start({ recipeId: RECIPE_ID, servings: 2 }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
      expect(prismaMock.cookingSession.create).not.toHaveBeenCalled();
    });

    it('does not leak existence of PRIVATE recipes (treated as NOT_FOUND)', async () => {
      const prismaMock = makePrismaMock();
      // findFirst with `status: 'PUBLIC'` returns null for PRIVATE rows.
      prismaMock.recipe.findFirst.mockResolvedValue(null);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.cookingSession.start({ recipeId: RECIPE_ID, servings: 2 }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
    });

    it('translates Prisma create failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue({ id: RECIPE_ID });
      prismaMock.cookingSession.create.mockRejectedValue(new Error('db down'));
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.cookingSession.start({ recipeId: RECIPE_ID, servings: 2 }),
      ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(
        caller.cookingSession.start({ recipeId: RECIPE_ID, servings: 2 }),
      ).rejects.toMatchObject({ code: 'PRECONDITION_FAILED' });
      expect(prismaMock.recipe.findFirst).not.toHaveBeenCalled();
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(
        caller.cookingSession.start({ recipeId: RECIPE_ID, servings: 2 }),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
    });
  });

  describe('complete', () => {
    const validSession = {
      id: SESSION_ID,
      userId: USER_ID,
      completedAt: null,
    };

    it('decrements pantry and marks the session completed in one transaction', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue(validSession);
      tx.pantryItem.findUnique.mockResolvedValueOnce({
        id: PANTRY_ID_TOMATO,
        quantity: 500,
        unit: Unit.G,
      });
      tx.pantryItem.update.mockResolvedValue({});
      tx.cookingSession.update.mockResolvedValue({
        id: SESSION_ID,
        completedAt: COMPLETED_AT,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.cookingSession.complete({
        sessionId: SESSION_ID,
        consumed: [
          { ingredientCatalogId: ING_TOMATO, quantity: 200, unit: Unit.G },
        ],
      });

      expect(result).toEqual({
        sessionId: SESSION_ID,
        completedAt: COMPLETED_AT,
      });
      expect(tx.pantryItem.update).toHaveBeenCalledWith({
        where: { id: PANTRY_ID_TOMATO },
        data: { quantity: 300 },
      });
      expect(tx.pantryItem.delete).not.toHaveBeenCalled();
      expect(tx.cookingSession.update).toHaveBeenCalledWith({
        where: { id: SESSION_ID },
        data: { completedAt: expect.any(Date) },
        select: { id: true, completedAt: true },
      });
    });

    it('deletes the pantry row when remaining quantity drops to zero', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue(validSession);
      tx.pantryItem.findUnique.mockResolvedValue({
        id: PANTRY_ID_TOMATO,
        quantity: 200,
        unit: Unit.G,
      });
      tx.cookingSession.update.mockResolvedValue({
        id: SESSION_ID,
        completedAt: COMPLETED_AT,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.cookingSession.complete({
        sessionId: SESSION_ID,
        consumed: [
          { ingredientCatalogId: ING_TOMATO, quantity: 200, unit: Unit.G },
        ],
      });

      expect(tx.pantryItem.delete).toHaveBeenCalledWith({
        where: { id: PANTRY_ID_TOMATO },
      });
      expect(tx.pantryItem.update).not.toHaveBeenCalled();
    });

    it('clamps over-consumption to zero and deletes the row', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue(validSession);
      tx.pantryItem.findUnique.mockResolvedValue({
        id: PANTRY_ID_FLOUR,
        quantity: 100,
        unit: Unit.G,
      });
      tx.cookingSession.update.mockResolvedValue({
        id: SESSION_ID,
        completedAt: COMPLETED_AT,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.cookingSession.complete({
        sessionId: SESSION_ID,
        consumed: [
          { ingredientCatalogId: ING_FLOUR, quantity: 250, unit: Unit.G },
        ],
      });

      expect(tx.pantryItem.delete).toHaveBeenCalledWith({
        where: { id: PANTRY_ID_FLOUR },
      });
      expect(tx.pantryItem.update).not.toHaveBeenCalled();
    });

    it('skips silently when the pantry row is missing', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue(validSession);
      tx.pantryItem.findUnique.mockResolvedValue(null);
      tx.cookingSession.update.mockResolvedValue({
        id: SESSION_ID,
        completedAt: COMPLETED_AT,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.cookingSession.complete({
        sessionId: SESSION_ID,
        consumed: [
          { ingredientCatalogId: ING_SALT, quantity: 5, unit: Unit.G },
        ],
      });

      expect(tx.pantryItem.update).not.toHaveBeenCalled();
      expect(tx.pantryItem.delete).not.toHaveBeenCalled();
      // Session is still marked completed even when nothing got decremented.
      expect(tx.cookingSession.update).toHaveBeenCalled();
    });

    it('skips silently when recipe-side and pantry-side units differ', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue(validSession);
      tx.pantryItem.findUnique.mockResolvedValue({
        id: PANTRY_ID_FLOUR,
        quantity: 0.5,
        unit: Unit.KG,
      });
      tx.cookingSession.update.mockResolvedValue({
        id: SESSION_ID,
        completedAt: COMPLETED_AT,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.cookingSession.complete({
        sessionId: SESSION_ID,
        consumed: [
          { ingredientCatalogId: ING_FLOUR, quantity: 200, unit: Unit.G },
        ],
      });

      expect(tx.pantryItem.update).not.toHaveBeenCalled();
      expect(tx.pantryItem.delete).not.toHaveBeenCalled();
      expect(tx.cookingSession.update).toHaveBeenCalled();
    });

    it('skips items with quantity = 0 without touching the pantry', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue(validSession);
      tx.cookingSession.update.mockResolvedValue({
        id: SESSION_ID,
        completedAt: COMPLETED_AT,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.cookingSession.complete({
        sessionId: SESSION_ID,
        consumed: [
          { ingredientCatalogId: ING_SALT, quantity: 0, unit: Unit.G },
        ],
      });

      expect(tx.pantryItem.findUnique).not.toHaveBeenCalled();
      expect(tx.pantryItem.update).not.toHaveBeenCalled();
      expect(tx.pantryItem.delete).not.toHaveBeenCalled();
      expect(tx.cookingSession.update).toHaveBeenCalled();
    });

    it('handles a mixed batch — decrement, delete, and skip in one call', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue(validSession);
      tx.pantryItem.findUnique
        .mockResolvedValueOnce({
          id: PANTRY_ID_TOMATO,
          quantity: 500,
          unit: Unit.G,
        })
        .mockResolvedValueOnce({
          id: PANTRY_ID_FLOUR,
          quantity: 200,
          unit: Unit.G,
        })
        .mockResolvedValueOnce(null);
      tx.cookingSession.update.mockResolvedValue({
        id: SESSION_ID,
        completedAt: COMPLETED_AT,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.cookingSession.complete({
        sessionId: SESSION_ID,
        consumed: [
          { ingredientCatalogId: ING_TOMATO, quantity: 200, unit: Unit.G },
          { ingredientCatalogId: ING_FLOUR, quantity: 200, unit: Unit.G },
          { ingredientCatalogId: ING_SALT, quantity: 5, unit: Unit.G },
        ],
      });

      expect(tx.pantryItem.update).toHaveBeenCalledTimes(1);
      expect(tx.pantryItem.update).toHaveBeenCalledWith({
        where: { id: PANTRY_ID_TOMATO },
        data: { quantity: 300 },
      });
      expect(tx.pantryItem.delete).toHaveBeenCalledTimes(1);
      expect(tx.pantryItem.delete).toHaveBeenCalledWith({
        where: { id: PANTRY_ID_FLOUR },
      });
    });

    it('throws NOT_FOUND when the session id does not exist', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue(null);
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.cookingSession.complete({
          sessionId: SESSION_ID,
          consumed: [],
        }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
      expect(tx.cookingSession.update).not.toHaveBeenCalled();
    });

    it('throws NOT_FOUND when the session belongs to another user (no leak)', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue({
        id: SESSION_ID,
        userId: OTHER_USER_ID,
        completedAt: null,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.cookingSession.complete({
          sessionId: SESSION_ID,
          consumed: [],
        }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
      expect(tx.cookingSession.update).not.toHaveBeenCalled();
    });

    it('throws NOT_FOUND when the session is already completed', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockResolvedValue({
        id: SESSION_ID,
        userId: USER_ID,
        completedAt: COMPLETED_AT,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.cookingSession.complete({
          sessionId: SESSION_ID,
          consumed: [],
        }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
      expect(tx.cookingSession.update).not.toHaveBeenCalled();
    });

    it('translates transaction failures to INTERNAL_SERVER_ERROR', async () => {
      const tx = makeTxMock();
      tx.cookingSession.findUnique.mockRejectedValue(new Error('db down'));
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.cookingSession.complete({
          sessionId: SESSION_ID,
          consumed: [],
        }),
      ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(
        caller.cookingSession.complete({
          sessionId: SESSION_ID,
          consumed: [],
        }),
      ).rejects.toMatchObject({ code: 'PRECONDITION_FAILED' });
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(
        caller.cookingSession.complete({
          sessionId: SESSION_ID,
          consumed: [],
        }),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
    });
  });

  describe('getRecipeForSession', () => {
    const recipeRow = {
      id: RECIPE_ID,
      title: 'Tomato Pasta',
      instructions: 'Boil pasta\nMake sauce',
      servings: 4,
      ingredients: [
        {
          id: 'ri-1',
          ingredientCatalogId: ING_TOMATO,
          quantity: 400,
          unit: Unit.G,
          notes: null,
          ingredient: {
            id: ING_TOMATO,
            name: 'Tomato',
            imageUrl: null,
            category: IngCategory.PRODUCE,
          },
        },
        {
          id: 'ri-2',
          ingredientCatalogId: ING_SALT,
          quantity: null,
          unit: Unit.TO_TASTE,
          notes: null,
          ingredient: {
            id: ING_SALT,
            name: 'Salt',
            imageUrl: null,
            category: IngCategory.SPICES,
          },
        },
      ],
    };

    it('augments each ingredient with pantry availability', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue(recipeRow);
      prismaMock.pantryItem.findMany.mockResolvedValue([
        {
          ingredientCatalogId: ING_TOMATO,
          quantity: 500,
          unit: Unit.G,
        },
      ]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.cookingSession.getRecipeForSession({
        recipeId: RECIPE_ID,
      });

      expect(result.id).toBe(RECIPE_ID);
      expect(result.ingredients[0].pantryAvailable).toEqual({
        quantity: 500,
        unit: Unit.G,
      });
      expect(result.ingredients[1].pantryAvailable).toBeNull();
      expect(prismaMock.recipe.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: RECIPE_ID, status: 'PUBLIC' },
        }),
      );
    });

    it('returns null pantryAvailable for every ingredient when pantry is empty', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue(recipeRow);
      prismaMock.pantryItem.findMany.mockResolvedValue([]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.cookingSession.getRecipeForSession({
        recipeId: RECIPE_ID,
      });

      for (const ri of result.ingredients) {
        expect(ri.pantryAvailable).toBeNull();
      }
    });

    it('throws NOT_FOUND when the recipe does not exist or is PRIVATE', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue(null);
      prismaMock.pantryItem.findMany.mockResolvedValue([]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.cookingSession.getRecipeForSession({ recipeId: RECIPE_ID }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
    });

    it('translates Prisma failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockRejectedValue(new Error('db down'));
      prismaMock.pantryItem.findMany.mockResolvedValue([]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.cookingSession.getRecipeForSession({ recipeId: RECIPE_ID }),
      ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(
        caller.cookingSession.getRecipeForSession({ recipeId: RECIPE_ID }),
      ).rejects.toMatchObject({ code: 'PRECONDITION_FAILED' });
      expect(prismaMock.recipe.findFirst).not.toHaveBeenCalled();
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(
        caller.cookingSession.getRecipeForSession({ recipeId: RECIPE_ID }),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
    });
  });
});
