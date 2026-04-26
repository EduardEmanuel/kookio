import { afterEach, describe, expect, it, vi } from 'vitest';
import { TRPCError } from '@trpc/server';

import type { AuthSession } from '@kookio/prisma-client';

import type { Context } from '../context';
import { appRouter } from './index';

type PrismaMock = {
  userProfile: { upsert: ReturnType<typeof vi.fn> };
};

const makeSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: 'user-123',
  email: 'user@example.com',
  roles: [],
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

const makePrismaMock = (
  upsertResult: Record<string, unknown> | Error,
): PrismaMock => ({
  userProfile: {
    upsert: vi.fn(() =>
      upsertResult instanceof Error
        ? Promise.reject(upsertResult)
        : Promise.resolve(upsertResult),
    ),
  },
});

const baseRow = {
  id: 'profile-uuid',
  userId: 'user-123',
  adultsCount: 2,
  childrenCount: 1,
  onboardingDone: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('profile router', () => {
  describe('completeOnboarding', () => {
    it('upserts a profile and returns the canonical shape', async () => {
      const prismaMock = makePrismaMock(baseRow);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.profile.completeOnboarding({
        adultsCount: 2,
        childrenCount: 1,
      });

      expect(prismaMock.userProfile.upsert).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        create: {
          userId: 'user-123',
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
      expect(result).toEqual({
        id: 'profile-uuid',
        userId: 'user-123',
        adultsCount: 2,
        childrenCount: 1,
        onboardingDone: true,
      });
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock(baseRow);
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(
        caller.profile.completeOnboarding({
          adultsCount: 1,
          childrenCount: 0,
        }),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
      expect(prismaMock.userProfile.upsert).not.toHaveBeenCalled();
    });

    it('rejects out-of-range counts via Zod validation', async () => {
      const prismaMock = makePrismaMock(baseRow);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.profile.completeOnboarding({
          adultsCount: 0,
          childrenCount: 0,
        }),
      ).rejects.toBeInstanceOf(TRPCError);
      expect(prismaMock.userProfile.upsert).not.toHaveBeenCalled();
    });

    it('translates Prisma failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock(new Error('db down'));
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.profile.completeOnboarding({
          adultsCount: 1,
          childrenCount: 0,
        }),
      ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
    });
  });

  describe('resetOnboarding', () => {
    it('upserts onboardingDone: false without discarding counts', async () => {
      const reset = { ...baseRow, onboardingDone: false };
      const prismaMock = makePrismaMock(reset);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.profile.resetOnboarding();

      expect(prismaMock.userProfile.upsert).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        create: { userId: 'user-123', onboardingDone: false },
        update: { onboardingDone: false },
      });
      expect(result.onboardingDone).toBe(false);
      expect(result.adultsCount).toBe(2);
      expect(result.childrenCount).toBe(1);
    });

    it('is idempotent for users without an existing profile', async () => {
      const fresh = {
        ...baseRow,
        adultsCount: 1,
        childrenCount: 0,
        onboardingDone: false,
      };
      const prismaMock = makePrismaMock(fresh);
      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      const result = await caller.profile.resetOnboarding();
      expect(result).toMatchObject({
        adultsCount: 1,
        childrenCount: 0,
        onboardingDone: false,
      });
    });

    it('rejects calls without a session as UNAUTHORIZED', async () => {
      const prismaMock = makePrismaMock(baseRow);
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.profile.resetOnboarding()).rejects.toMatchObject({
        code: 'UNAUTHORIZED',
      });
      expect(prismaMock.userProfile.upsert).not.toHaveBeenCalled();
    });
  });
});
