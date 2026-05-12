import { afterEach, describe, expect, it, vi } from 'vitest';

import type { AuthSession } from '@kookio/prisma-client';

import type { Context } from '../context';
import { appRouter } from './index';

type PrismaMock = {
  dietaryRestriction: { findMany: ReturnType<typeof vi.fn> };
  utensil: { findMany: ReturnType<typeof vi.fn> };
  mealCategory: { findMany: ReturnType<typeof vi.fn> };
  mealArea: { findMany: ReturnType<typeof vi.fn> };
};

const makeSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: 'user-123',
  email: 'user@example.com',
  name: null,
  amr: ['password'],
  onboardingDone: false,
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
  dietaryRestriction: { findMany: vi.fn(() => Promise.resolve([])) },
  utensil: { findMany: vi.fn(() => Promise.resolve([])) },
  mealCategory: { findMany: vi.fn(() => Promise.resolve([])) },
  mealArea: { findMany: vi.fn(() => Promise.resolve([])) },
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('onboardingCatalogs router', () => {
  describe('dietaryRestrictions', () => {
    it('orders by label ascending', async () => {
      const prismaMock = makePrismaMock();
      const rows = [
        {
          id: 'd1',
          slug: 'gluten-free',
          label: 'Gluten-free',
          emoji: null,
          description: null,
        },
      ];
      prismaMock.dietaryRestriction.findMany.mockResolvedValue(rows);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.onboardingCatalogs.dietaryRestrictions();

      expect(prismaMock.dietaryRestriction.findMany).toHaveBeenCalledWith({
        orderBy: { label: 'asc' },
      });
      expect(result).toEqual(rows);
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(
        caller.onboardingCatalogs.dietaryRestrictions(),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
      expect(prismaMock.dietaryRestriction.findMany).not.toHaveBeenCalled();
    });

    it('translates Prisma failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.dietaryRestriction.findMany.mockRejectedValue(
        new Error('db down'),
      );
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.onboardingCatalogs.dietaryRestrictions(),
      ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
    });
  });

  describe('utensils', () => {
    it('orders by category then name ascending', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.onboardingCatalogs.utensils();

      expect(prismaMock.utensil.findMany).toHaveBeenCalledWith({
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
      });
    });

    it('rejects unauthenticated callers', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.onboardingCatalogs.utensils()).rejects.toMatchObject({
        code: 'UNAUTHORIZED',
      });
    });
  });

  describe('mealCategories', () => {
    it('orders by name ascending', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.onboardingCatalogs.mealCategories();

      expect(prismaMock.mealCategory.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
    });
  });

  describe('mealAreas', () => {
    it('orders by name ascending', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await caller.onboardingCatalogs.mealAreas();

      expect(prismaMock.mealArea.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
    });
  });
});
