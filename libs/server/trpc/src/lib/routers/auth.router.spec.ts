import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Context } from '../context';
import { appRouter } from './index';

type PrismaMock = {
  user: {
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
};

const makePrismaMock = (): PrismaMock => ({
  user: { findUnique: vi.fn(), create: vi.fn() },
});

const makeCtx = (
  firebaseUser: { uid: string; email: string } | null,
  prismaMock: PrismaMock,
): Context =>
  ({
    token: firebaseUser ? 'fake-token' : undefined,
    firebaseUser,
    session: null,
    prisma: prismaMock,
  }) as unknown as Context;

afterEach(() => {
  vi.restoreAllMocks();
});

describe('auth router', () => {
  describe('register', () => {
    const verified = { uid: 'uid-abc', email: 'user@example.com' };

    it('provisions a new user bound to the VERIFIED token uid when identity matches', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue({
        id: 'uid-abc',
        email: 'user@example.com',
        name: null,
        amr: [],
      });
      const caller = appRouter.createCaller(makeCtx(verified, prismaMock));

      const result = await caller.auth.register({
        email: 'user@example.com',
        firebaseUid: 'uid-abc',
      });

      expect(result.uid).toBe('uid-abc');
      // bound to the token's uid, never to a client-controlled value
      expect(prismaMock.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ id: 'uid-abc' }),
        }),
      );
    });

    it('rejects when no verified token is present', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(
        caller.auth.register({
          email: 'user@example.com',
          firebaseUid: 'uid-abc',
        }),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });

    it('rejects when the client-claimed uid does not match the token', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(verified, prismaMock));

      await expect(
        caller.auth.register({
          email: 'user@example.com',
          firebaseUid: 'attacker-uid',
        }),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });

    it('rejects when the client-claimed email does not match the token', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(verified, prismaMock));

      await expect(
        caller.auth.register({
          email: 'victim@example.com',
          firebaseUid: 'uid-abc',
        }),
      ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });
  });
});
