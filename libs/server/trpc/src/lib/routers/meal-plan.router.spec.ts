import { afterEach, describe, expect, it, vi } from 'vitest';

import { MealSlotTypeSchema, type AuthSession } from '@kookio/prisma-client';

import type { Context } from '../context';
import { appRouter } from './index';

const Slot = MealSlotTypeSchema.enum;

type PrismaMock = {
  mealSlot: {
    findMany: ReturnType<typeof vi.fn>;
    deleteMany: ReturnType<typeof vi.fn>;
    createMany: ReturnType<typeof vi.fn>;
  };
  recipe: {
    findMany: ReturnType<typeof vi.fn>;
  };
  $transaction: ReturnType<typeof vi.fn>;
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

const makePrismaMock = (): PrismaMock => {
  const mock: PrismaMock = {
    mealSlot: {
      findMany: vi.fn(),
      deleteMany: vi.fn(),
      createMany: vi.fn(),
    },
    recipe: {
      findMany: vi.fn(),
    },
    // Default `$transaction` impl forwards the same mock as the `tx` arg —
    // every method we call inside the transaction also exists on the
    // top-level mock, so re-using it keeps assertions in one place.
    $transaction: vi.fn((fn: (tx: unknown) => unknown) => fn(mock)),
  };
  return mock;
};

const RECIPE_ID_1 = 'a4b6f2c0-0000-0000-0000-000000000001';
const RECIPE_ID_2 = 'a4b6f2c0-0000-0000-0000-000000000002';

const builtSlot = {
  id: 'ms-1',
  userId: 'user-123',
  recipeId: RECIPE_ID_1,
  date: new Date('2026-05-04T00:00:00.000Z'),
  slotType: Slot.LUNCH,
  servings: 2,
  createdAt: new Date('2026-05-01T00:00:00.000Z'),
  updatedAt: new Date('2026-05-01T00:00:00.000Z'),
  recipe: null,
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('mealPlan router', () => {
  describe('getCurrent', () => {
    it("returns all of the caller's slots ordered by date then slotType", async () => {
      const prismaMock = makePrismaMock();
      prismaMock.mealSlot.findMany.mockResolvedValue([builtSlot]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.mealPlan.getCurrent();

      expect(result).toEqual([builtSlot]);
      expect(prismaMock.mealSlot.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-123' },
          orderBy: [{ date: 'asc' }, { slotType: 'asc' }],
        }),
      );
    });

    it('returns an empty array when the user has no slots', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.mealSlot.findMany.mockResolvedValue([]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.mealPlan.getCurrent();

      expect(result).toEqual([]);
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(caller.mealPlan.getCurrent()).rejects.toMatchObject({
        code: 'PRECONDITION_FAILED',
      });
      expect(prismaMock.mealSlot.findMany).not.toHaveBeenCalled();
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.mealPlan.getCurrent()).rejects.toMatchObject({
        code: 'UNAUTHORIZED',
      });
    });

    it('translates Prisma failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.mealSlot.findMany.mockRejectedValue(new Error('db down'));
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(caller.mealPlan.getCurrent()).rejects.toMatchObject({
        code: 'INTERNAL_SERVER_ERROR',
      });
    });
  });

  describe('setMealPlan', () => {
    const VALID_INPUT = {
      slots: [
        {
          date: '2026-05-04T00:00:00.000Z',
          slotType: Slot.LUNCH,
          recipeId: RECIPE_ID_1,
          servings: 2,
        },
        {
          date: '2026-05-05T00:00:00.000Z',
          slotType: Slot.DINNER,
          recipeId: RECIPE_ID_2,
          servings: 4,
        },
      ],
    };

    it("replaces the caller's slot timeline atomically and returns it", async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findMany.mockResolvedValue([
        { id: RECIPE_ID_1 },
        { id: RECIPE_ID_2 },
      ]);
      prismaMock.mealSlot.deleteMany.mockResolvedValue({ count: 0 });
      prismaMock.mealSlot.createMany.mockResolvedValue({ count: 2 });
      prismaMock.mealSlot.findMany.mockResolvedValue([builtSlot]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.mealPlan.setMealPlan(VALID_INPUT);

      expect(result).toEqual([builtSlot]);
      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
      expect(prismaMock.mealSlot.deleteMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
      });
      expect(prismaMock.mealSlot.createMany).toHaveBeenCalledWith({
        data: [
          {
            userId: 'user-123',
            date: new Date('2026-05-04T00:00:00.000Z'),
            slotType: Slot.LUNCH,
            recipeId: RECIPE_ID_1,
            servings: 2,
          },
          {
            userId: 'user-123',
            date: new Date('2026-05-05T00:00:00.000Z'),
            slotType: Slot.DINNER,
            recipeId: RECIPE_ID_2,
            servings: 4,
          },
        ],
      });
    });

    it('accepts an empty slots array (clears the timeline)', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.mealSlot.deleteMany.mockResolvedValue({ count: 21 });
      prismaMock.mealSlot.findMany.mockResolvedValue([]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.mealPlan.setMealPlan({ slots: [] });

      expect(result).toEqual([]);
      expect(prismaMock.recipe.findMany).not.toHaveBeenCalled();
      expect(prismaMock.mealSlot.createMany).not.toHaveBeenCalled();
      expect(prismaMock.mealSlot.deleteMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
      });
    });

    it('rejects duplicate (date, slotType) pairs as BAD_REQUEST', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.mealPlan.setMealPlan({
          slots: [
            {
              date: '2026-05-04T00:00:00.000Z',
              slotType: Slot.LUNCH,
              recipeId: RECIPE_ID_1,
              servings: 2,
            },
            {
              date: '2026-05-04T00:00:00.000Z',
              slotType: Slot.LUNCH,
              recipeId: RECIPE_ID_2,
              servings: 2,
            },
          ],
        }),
      ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('accepts slots far in the past or future (no range enforcement)', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findMany.mockResolvedValue([{ id: RECIPE_ID_1 }]);
      prismaMock.mealSlot.deleteMany.mockResolvedValue({ count: 0 });
      prismaMock.mealSlot.createMany.mockResolvedValue({ count: 1 });
      prismaMock.mealSlot.findMany.mockResolvedValue([]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      // A slot 6 months from now must be accepted.
      await expect(
        caller.mealPlan.setMealPlan({
          slots: [
            {
              date: '2026-11-04T00:00:00.000Z',
              slotType: Slot.LUNCH,
              recipeId: RECIPE_ID_1,
              servings: 2,
            },
          ],
        }),
      ).resolves.toEqual([]);
    });

    it('rejects unknown recipe ids as NOT_FOUND', async () => {
      const prismaMock = makePrismaMock();
      // recipe.findMany returns 1 of the 2 requested ids → mismatch.
      prismaMock.recipe.findMany.mockResolvedValue([{ id: RECIPE_ID_1 }]);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.mealPlan.setMealPlan(VALID_INPUT),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(
        caller.mealPlan.setMealPlan(VALID_INPUT),
      ).rejects.toMatchObject({ code: 'PRECONDITION_FAILED' });
      expect(prismaMock.recipe.findMany).not.toHaveBeenCalled();
    });

    it('rejects servings out of [1, 20] via zod input validation', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.mealPlan.setMealPlan({
          slots: [
            {
              date: '2026-05-04T00:00:00.000Z',
              slotType: Slot.LUNCH,
              recipeId: RECIPE_ID_1,
              servings: 0,
            },
          ],
        }),
      ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
    });

    it('translates unexpected Prisma failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findMany.mockResolvedValue([
        { id: RECIPE_ID_1 },
        { id: RECIPE_ID_2 },
      ]);
      prismaMock.mealSlot.deleteMany.mockRejectedValue(
        new Error('connection lost'),
      );
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.mealPlan.setMealPlan(VALID_INPUT),
      ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
    });
  });
});
