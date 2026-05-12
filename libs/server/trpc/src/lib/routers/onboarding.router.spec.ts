import { afterEach, describe, expect, it, vi } from 'vitest';
import { TRPCError } from '@trpc/server';

import type { AuthSession } from '@kookio/prisma-client';

import type { Context } from '../context';
import { appRouter } from './index';

type TxMock = {
  user: {
    update: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
  };
  userProfile: {
    upsert: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
  };
  userDietaryRestriction: {
    deleteMany: ReturnType<typeof vi.fn>;
    createMany: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
  };
  userUtensil: {
    deleteMany: ReturnType<typeof vi.fn>;
    createMany: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
  };
  userPreferredCategory: {
    deleteMany: ReturnType<typeof vi.fn>;
    createMany: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
  };
  userPreferredArea: {
    deleteMany: ReturnType<typeof vi.fn>;
    createMany: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
  };
  pantryItem: {
    createMany: ReturnType<typeof vi.fn>;
  };
};

type PrismaMock = TxMock & {
  $transaction: ReturnType<typeof vi.fn>;
};

const PROFILE_ID = '11111111-1111-4111-8111-111111111111';
const USER_ID = 'user-123';
const CAT_A = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const CAT_B = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
const AREA_A = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
const UT_A = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
const UT_B = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
const DIET_A = 'ffffffff-ffff-4fff-8fff-ffffffffffff';

const makeSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: USER_ID,
  email: 'user@example.com',
  name: null,
  amr: ['password'],
  onboardingDone: false,
  ...overrides,
});

const makeTxMock = (): TxMock => ({
  user: {
    update: vi.fn(() => Promise.resolve({ id: USER_ID, name: 'Ana' })),
    findUnique: vi.fn(() => Promise.resolve({ name: null })),
  },
  userProfile: {
    upsert: vi.fn(() =>
      Promise.resolve({
        id: PROFILE_ID,
        userId: USER_ID,
        adultsCount: 2,
        childrenCount: 1,
        onboardingDone: true,
      }),
    ),
    findUnique: vi.fn(() => Promise.resolve(null)),
  },
  userDietaryRestriction: {
    deleteMany: vi.fn(() => Promise.resolve({ count: 0 })),
    createMany: vi.fn(() => Promise.resolve({ count: 0 })),
    findMany: vi.fn(() => Promise.resolve([])),
  },
  userUtensil: {
    deleteMany: vi.fn(() => Promise.resolve({ count: 0 })),
    createMany: vi.fn(() => Promise.resolve({ count: 0 })),
    findMany: vi.fn(() => Promise.resolve([])),
  },
  userPreferredCategory: {
    deleteMany: vi.fn(() => Promise.resolve({ count: 0 })),
    createMany: vi.fn(() => Promise.resolve({ count: 0 })),
    findMany: vi.fn(() => Promise.resolve([])),
  },
  userPreferredArea: {
    deleteMany: vi.fn(() => Promise.resolve({ count: 0 })),
    createMany: vi.fn(() => Promise.resolve({ count: 0 })),
    findMany: vi.fn(() => Promise.resolve([])),
  },
  pantryItem: {
    createMany: vi.fn(() => Promise.resolve({ count: 0 })),
  },
});

const makePrismaMock = (txOverride?: TxMock): PrismaMock => {
  const tx = txOverride ?? makeTxMock();
  return {
    ...tx,
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

describe('onboarding router', () => {
  describe('commit', () => {
    it('upserts profile and replaces all four M:N selection sets', async () => {
      const tx = makeTxMock();
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.onboarding.commit({
        name: 'Ana',
        adultsCount: 2,
        childrenCount: 1,
        preferredCategoryIds: [CAT_A, CAT_B],
        preferredAreaIds: [AREA_A],
        utensilIds: [UT_A, UT_B],
        dietaryRestrictionIds: [DIET_A],
      });

      expect(tx.userProfile.upsert).toHaveBeenCalledWith({
        where: { userId: USER_ID },
        create: {
          userId: USER_ID,
          adultsCount: 2,
          childrenCount: 1,
          onboardingDone: true,
        },
        update: {
          adultsCount: 2,
          childrenCount: 1,
          onboardingDone: true,
        },
      });

      // Profile-scoped M:N keyed on UserProfile.id
      expect(tx.userDietaryRestriction.deleteMany).toHaveBeenCalledWith({
        where: { userId: PROFILE_ID },
      });
      expect(tx.userDietaryRestriction.createMany).toHaveBeenCalledWith({
        data: [{ userId: PROFILE_ID, dietaryRestrictionId: DIET_A }],
        skipDuplicates: true,
      });
      expect(tx.userUtensil.deleteMany).toHaveBeenCalledWith({
        where: { userId: PROFILE_ID },
      });
      expect(tx.userUtensil.createMany).toHaveBeenCalledWith({
        data: [
          { userId: PROFILE_ID, utensilId: UT_A },
          { userId: PROFILE_ID, utensilId: UT_B },
        ],
        skipDuplicates: true,
      });

      // User-scoped M:N keyed on User.id
      expect(tx.userPreferredCategory.deleteMany).toHaveBeenCalledWith({
        where: { userId: USER_ID },
      });
      expect(tx.userPreferredCategory.createMany).toHaveBeenCalledWith({
        data: [
          { userId: USER_ID, mealCategoryId: CAT_A },
          { userId: USER_ID, mealCategoryId: CAT_B },
        ],
        skipDuplicates: true,
      });
      expect(tx.userPreferredArea.deleteMany).toHaveBeenCalledWith({
        where: { userId: USER_ID },
      });
      expect(tx.userPreferredArea.createMany).toHaveBeenCalledWith({
        data: [{ userId: USER_ID, mealAreaId: AREA_A }],
        skipDuplicates: true,
      });

      expect(result).toEqual({ onboardingDone: true });
    });

    it('skips createMany calls when selection arrays are empty', async () => {
      const tx = makeTxMock();
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.onboarding.commit({
        name: 'Ana',
        adultsCount: 1,
        childrenCount: 0,
      });

      expect(tx.userProfile.upsert).toHaveBeenCalledTimes(1);
      expect(tx.userDietaryRestriction.deleteMany).toHaveBeenCalledTimes(1);
      expect(tx.userDietaryRestriction.createMany).not.toHaveBeenCalled();
      expect(tx.userUtensil.deleteMany).toHaveBeenCalledTimes(1);
      expect(tx.userUtensil.createMany).not.toHaveBeenCalled();
      expect(tx.userPreferredCategory.deleteMany).toHaveBeenCalledTimes(1);
      expect(tx.userPreferredCategory.createMany).not.toHaveBeenCalled();
      expect(tx.userPreferredArea.deleteMany).toHaveBeenCalledTimes(1);
      expect(tx.userPreferredArea.createMany).not.toHaveBeenCalled();
      expect(tx.pantryItem.createMany).not.toHaveBeenCalled();
      expect(result).toEqual({ onboardingDone: true });
    });

    it('seeds the pantry when pantrySeed items are passed', async () => {
      const tx = makeTxMock();
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const ING_TOMATO = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1';
      const ING_OLIVE = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2';
      const expiry = '2026-12-01T00:00:00.000Z';

      const result = await caller.onboarding.commit({
        name: 'Ana',
        adultsCount: 1,
        childrenCount: 0,
        pantrySeed: [
          {
            ingredientCatalogId: ING_TOMATO,
            quantity: 250,
            unit: 'G',
            expiresAt: expiry,
          },
          {
            ingredientCatalogId: ING_OLIVE,
            quantity: 500,
            unit: 'ML',
            expiresAt: null,
          },
        ],
      });

      expect(tx.pantryItem.createMany).toHaveBeenCalledWith({
        data: [
          {
            userId: USER_ID,
            ingredientCatalogId: ING_TOMATO,
            quantity: 250,
            unit: 'G',
            expiresAt: new Date(expiry),
          },
          {
            userId: USER_ID,
            ingredientCatalogId: ING_OLIVE,
            quantity: 500,
            unit: 'ML',
            expiresAt: null,
          },
        ],
        skipDuplicates: true,
      });
      expect(result).toEqual({ onboardingDone: true });
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(
        caller.onboarding.commit({
          name: 'Ana',
          adultsCount: 1,
          childrenCount: 0,
        }),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('rejects out-of-range adultsCount via Zod', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.onboarding.commit({
          name: 'Ana',
          adultsCount: 0,
          childrenCount: 0,
        }),
      ).rejects.toBeInstanceOf(TRPCError);
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('rejects empty-string IDs via Zod', async () => {
      // Catalog IDs are intentionally not constrained to UUID format because
      // seed fixtures use semantic IDs (`utensil_chef_knife`, `dr_vegan`).
      // The schema floor is `z.string().min(1)` — anything stricter would
      // reject valid seeded data. Empty strings stay rejected since they
      // cannot point at a real DB row.
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.onboarding.commit({
          name: 'Ana',
          adultsCount: 1,
          childrenCount: 0,
          preferredCategoryIds: [''],
        }),
      ).rejects.toBeInstanceOf(TRPCError);
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('translates transaction failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.$transaction.mockRejectedValue(
        new Error('serialization conflict'),
      );
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.onboarding.commit({
          name: 'Ana',
          adultsCount: 1,
          childrenCount: 0,
        }),
      ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
    });
  });

  describe('reset', () => {
    it('flips onboardingDone to false without touching M:N data', async () => {
      const tx = makeTxMock();
      tx.userProfile.upsert.mockResolvedValue({
        id: PROFILE_ID,
        userId: USER_ID,
        adultsCount: 2,
        childrenCount: 1,
        onboardingDone: false,
      });
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.onboarding.reset();

      expect(tx.userProfile.upsert).toHaveBeenCalledWith({
        where: { userId: USER_ID },
        create: { userId: USER_ID, onboardingDone: false },
        update: { onboardingDone: false },
      });
      expect(tx.userDietaryRestriction.deleteMany).not.toHaveBeenCalled();
      expect(tx.userUtensil.deleteMany).not.toHaveBeenCalled();
      expect(tx.userPreferredCategory.deleteMany).not.toHaveBeenCalled();
      expect(tx.userPreferredArea.deleteMany).not.toHaveBeenCalled();
      expect(result).toEqual({ onboardingDone: false });
    });

    it('rejects unauthenticated callers', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.onboarding.reset()).rejects.toMatchObject({
        code: 'UNAUTHORIZED',
      });
    });
  });

  describe('current', () => {
    it('returns existing selections and counts when profile is set up', async () => {
      const tx = makeTxMock();
      tx.user.findUnique.mockResolvedValue({ name: 'Ana' });
      tx.userProfile.findUnique.mockResolvedValue({
        id: PROFILE_ID,
        adultsCount: 3,
        childrenCount: 2,
      });
      tx.userPreferredCategory.findMany.mockResolvedValue([
        { mealCategoryId: 'cat-a' },
        { mealCategoryId: 'cat-b' },
      ]);
      tx.userPreferredArea.findMany.mockResolvedValue([
        { mealAreaId: 'area-a' },
      ]);
      tx.userUtensil.findMany.mockResolvedValue([{ utensilId: 'ut-a' }]);
      tx.userDietaryRestriction.findMany.mockResolvedValue([
        { dietaryRestrictionId: 'diet-a' },
        { dietaryRestrictionId: 'diet-b' },
      ]);
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.onboarding.current();

      expect(tx.userProfile.findUnique).toHaveBeenCalledWith({
        where: { userId: USER_ID },
        select: { id: true, adultsCount: true, childrenCount: true },
      });
      expect(tx.userPreferredCategory.findMany).toHaveBeenCalledWith({
        where: { userId: USER_ID },
        select: { mealCategoryId: true },
      });
      expect(tx.userPreferredArea.findMany).toHaveBeenCalledWith({
        where: { userId: USER_ID },
        select: { mealAreaId: true },
      });
      expect(tx.userUtensil.findMany).toHaveBeenCalledWith({
        where: { userId: PROFILE_ID },
        select: { utensilId: true },
      });
      expect(tx.userDietaryRestriction.findMany).toHaveBeenCalledWith({
        where: { userId: PROFILE_ID },
        select: { dietaryRestrictionId: true },
      });

      expect(result).toEqual({
        name: 'Ana',
        adultsCount: 3,
        childrenCount: 2,
        preferredCategoryIds: ['cat-a', 'cat-b'],
        preferredAreaIds: ['area-a'],
        utensilIds: ['ut-a'],
        dietaryRestrictionIds: ['diet-a', 'diet-b'],
      });
    });

    it('returns sensible defaults when no profile exists yet', async () => {
      const tx = makeTxMock();
      tx.user.findUnique.mockResolvedValue(null);
      tx.userProfile.findUnique.mockResolvedValue(null);
      const prismaMock = makePrismaMock(tx);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.onboarding.current();

      // Profile-scoped lookups must be skipped when no profile exists
      expect(tx.userUtensil.findMany).not.toHaveBeenCalled();
      expect(tx.userDietaryRestriction.findMany).not.toHaveBeenCalled();

      expect(result).toEqual({
        name: null,
        adultsCount: 1,
        childrenCount: 0,
        preferredCategoryIds: [],
        preferredAreaIds: [],
        utensilIds: [],
        dietaryRestrictionIds: [],
      });
    });

    it('rejects unauthenticated callers', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.onboarding.current()).rejects.toMatchObject({
        code: 'UNAUTHORIZED',
      });
    });
  });
});
