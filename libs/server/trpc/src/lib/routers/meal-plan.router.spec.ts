import { afterEach, describe, expect, it, vi } from 'vitest';

import { MealSlotTypeSchema, type AuthSession } from '@kookio/prisma-client';

import type { Context } from '../context';
import { appRouter } from './index';
import { isoWeekRange } from './meal-plan.router';

const Slot = MealSlotTypeSchema.enum;

type PrismaMock = {
  mealPlan: {
    findFirst: ReturnType<typeof vi.fn>;
    findUniqueOrThrow: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };
  mealPlanSlot: {
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
    mealPlan: {
      findFirst: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    mealPlanSlot: {
      deleteMany: vi.fn(),
      createMany: vi.fn(),
    },
    recipe: {
      findMany: vi.fn(),
    },
    // Default `$transaction` impl forwards the same mock as the `tx` arg —
    // every router we test happens to call only methods that exist on the
    // top-level mock, so re-using it keeps the assertions in one place.
    $transaction: vi.fn((fn: (tx: unknown) => unknown) => fn(mock)),
  };
  return mock;
};

const RECIPE_ID_1 = 'a4b6f2c0-0000-0000-0000-000000000001';
const RECIPE_ID_2 = 'a4b6f2c0-0000-0000-0000-000000000002';

const populatedPlan = {
  id: 'mp-1',
  userId: 'user-123',
  name: null,
  startDate: new Date('2026-05-04T00:00:00.000Z'),
  endDate: new Date('2026-05-10T23:59:59.999Z'),
  createdAt: new Date('2026-05-01T00:00:00.000Z'),
  updatedAt: new Date('2026-05-01T00:00:00.000Z'),
  slots: [],
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('mealPlan router', () => {
  describe('getCurrent', () => {
    it('returns the existing active plan when one is present', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.mealPlan.findFirst.mockResolvedValue(populatedPlan);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.mealPlan.getCurrent();

      expect(result).toEqual(populatedPlan);
      expect(prismaMock.mealPlan.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ userId: 'user-123' }),
          orderBy: { createdAt: 'desc' },
        }),
      );
      expect(prismaMock.mealPlan.create).not.toHaveBeenCalled();
    });

    it('lazily creates an empty current-week plan when none exists', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.mealPlan.findFirst.mockResolvedValue(null);
      prismaMock.mealPlan.create.mockResolvedValue(populatedPlan);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.mealPlan.getCurrent();

      expect(prismaMock.mealPlan.create).toHaveBeenCalledTimes(1);
      const createArgs = prismaMock.mealPlan.create.mock.calls[0][0];
      expect(createArgs.data.userId).toBe('user-123');
      // Asserts the lazy-init range matches `isoWeekRange(now)` exactly —
      // tolerates the millisecond drift between the test's `new Date()` and
      // the router's by anchoring on the same week.
      const expected = isoWeekRange(new Date());
      expect(createArgs.data.startDate.toISOString()).toBe(
        expected.startDate.toISOString(),
      );
      expect(createArgs.data.endDate.toISOString()).toBe(
        expected.endDate.toISOString(),
      );
    });

    it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(caller.mealPlan.getCurrent()).rejects.toMatchObject({
        code: 'PRECONDITION_FAILED',
      });
      expect(prismaMock.mealPlan.findFirst).not.toHaveBeenCalled();
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
      prismaMock.mealPlan.findFirst.mockRejectedValue(new Error('db down'));
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(caller.mealPlan.getCurrent()).rejects.toMatchObject({
        code: 'INTERNAL_SERVER_ERROR',
      });
    });
  });

  describe('setMealPlan', () => {
    const VALID_INPUT = {
      startDate: '2026-05-04T00:00:00.000Z',
      endDate: '2026-05-10T23:59:59.999Z',
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

    it('replaces the active plan slots atomically and returns the populated plan', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.mealPlan.findFirst.mockResolvedValue({ id: 'mp-1' });
      prismaMock.recipe.findMany.mockResolvedValue([
        { id: RECIPE_ID_1 },
        { id: RECIPE_ID_2 },
      ]);
      prismaMock.mealPlanSlot.deleteMany.mockResolvedValue({ count: 0 });
      prismaMock.mealPlanSlot.createMany.mockResolvedValue({ count: 2 });
      prismaMock.mealPlan.update.mockResolvedValue({ id: 'mp-1' });
      prismaMock.mealPlan.findUniqueOrThrow.mockResolvedValue(populatedPlan);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.mealPlan.setMealPlan(VALID_INPUT);

      expect(result).toEqual(populatedPlan);
      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
      expect(prismaMock.mealPlanSlot.deleteMany).toHaveBeenCalledWith({
        where: { mealPlanId: 'mp-1' },
      });
      expect(prismaMock.mealPlanSlot.createMany).toHaveBeenCalledWith({
        data: [
          {
            mealPlanId: 'mp-1',
            date: new Date('2026-05-04T00:00:00.000Z'),
            slotType: Slot.LUNCH,
            recipeId: RECIPE_ID_1,
            servings: 2,
          },
          {
            mealPlanId: 'mp-1',
            date: new Date('2026-05-05T00:00:00.000Z'),
            slotType: Slot.DINNER,
            recipeId: RECIPE_ID_2,
            servings: 4,
          },
        ],
      });
    });

    it('creates a plan inside the transaction when no active plan exists', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.mealPlan.findFirst.mockResolvedValue(null);
      prismaMock.mealPlan.create.mockResolvedValue({ id: 'mp-new' });
      prismaMock.recipe.findMany.mockResolvedValue([
        { id: RECIPE_ID_1 },
        { id: RECIPE_ID_2 },
      ]);
      prismaMock.mealPlanSlot.deleteMany.mockResolvedValue({ count: 0 });
      prismaMock.mealPlanSlot.createMany.mockResolvedValue({ count: 2 });
      prismaMock.mealPlan.findUniqueOrThrow.mockResolvedValue(populatedPlan);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.mealPlan.setMealPlan(VALID_INPUT);

      expect(prismaMock.mealPlan.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          startDate: new Date('2026-05-04T00:00:00.000Z'),
          endDate: new Date('2026-05-10T23:59:59.999Z'),
        },
        select: { id: true },
      });
      expect(prismaMock.mealPlan.update).not.toHaveBeenCalled();
    });

    it('accepts an empty slots array (clears the week)', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.mealPlan.findFirst.mockResolvedValue({ id: 'mp-1' });
      prismaMock.mealPlanSlot.deleteMany.mockResolvedValue({ count: 21 });
      prismaMock.mealPlan.update.mockResolvedValue({ id: 'mp-1' });
      prismaMock.mealPlan.findUniqueOrThrow.mockResolvedValue({
        ...populatedPlan,
        slots: [],
      });
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.mealPlan.setMealPlan({
        startDate: VALID_INPUT.startDate,
        endDate: VALID_INPUT.endDate,
        slots: [],
      });

      expect(prismaMock.recipe.findMany).not.toHaveBeenCalled();
      expect(prismaMock.mealPlanSlot.createMany).not.toHaveBeenCalled();
      expect(prismaMock.mealPlanSlot.deleteMany).toHaveBeenCalledWith({
        where: { mealPlanId: 'mp-1' },
      });
    });

    it('rejects endDate before startDate as BAD_REQUEST', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.mealPlan.setMealPlan({
          ...VALID_INPUT,
          startDate: '2026-05-10T00:00:00.000Z',
          endDate: '2026-05-04T00:00:00.000Z',
          slots: [],
        }),
      ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('rejects duplicate (date, slotType) pairs as BAD_REQUEST', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.mealPlan.setMealPlan({
          ...VALID_INPUT,
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

    it('rejects slot dates outside [startDate, endDate] as BAD_REQUEST', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.mealPlan.setMealPlan({
          ...VALID_INPUT,
          slots: [
            {
              date: '2026-04-30T00:00:00.000Z', // before startDate
              slotType: Slot.LUNCH,
              recipeId: RECIPE_ID_1,
              servings: 2,
            },
          ],
        }),
      ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
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
          ...VALID_INPUT,
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
      prismaMock.mealPlan.findFirst.mockResolvedValue({ id: 'mp-1' });
      prismaMock.recipe.findMany.mockResolvedValue([
        { id: RECIPE_ID_1 },
        { id: RECIPE_ID_2 },
      ]);
      prismaMock.mealPlanSlot.deleteMany.mockRejectedValue(
        new Error('connection lost'),
      );
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.mealPlan.setMealPlan(VALID_INPUT),
      ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
    });
  });
});
