import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const verifyIdToken = vi.fn();
const findUnique = vi.fn();

vi.mock('firebase-admin/app', () => ({
  cert: vi.fn(),
  getApp: vi.fn(),
  getApps: vi.fn(() => [{}]),
  initializeApp: vi.fn(),
}));

vi.mock('firebase-admin/auth', () => ({
  getAuth: () => ({ verifyIdToken }),
}));

vi.mock('@kookio/prisma-client', () => ({
  prisma: {
    user: {
      findUnique: (...args: unknown[]) => findUnique(...args),
    },
  },
}));

vi.mock('@kookio/server-logger', () => ({
  createLogger: () => ({
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  }),
  createAudit: () => ({ event: vi.fn() }),
}));

const dbUser = {
  id: 'uid-1',
  email: 'alice@example.com',
  roles: ['USER'],
  amr: ['password'],
};

const importToSession = async () => {
  const mod = await import('./auth');
  return mod.toSession;
};

beforeEach(() => {
  verifyIdToken.mockReset();
  findUnique.mockReset();
});

afterEach(() => {
  vi.resetModules();
});

describe('toSession', () => {
  describe('when token is missing or invalid', () => {
    it('returns null when no token is provided', async () => {
      const toSession = await importToSession();
      const result = await toSession(undefined);
      expect(result).toBeNull();
      expect(verifyIdToken).not.toHaveBeenCalled();
    });

    it('returns null when Firebase rejects the token', async () => {
      verifyIdToken.mockRejectedValue(new Error('invalid'));
      const toSession = await importToSession();
      const result = await toSession('bad-token');
      expect(result).toBeNull();
    });

    it('returns null when the decoded token has no email', async () => {
      verifyIdToken.mockResolvedValue({ uid: 'uid-1', email: undefined });
      const toSession = await importToSession();
      const result = await toSession('token');
      expect(result).toBeNull();
      expect(findUnique).not.toHaveBeenCalled();
    });
  });

  describe('when the user is not provisioned', () => {
    it('returns null', async () => {
      verifyIdToken.mockResolvedValue({
        uid: 'uid-1',
        email: 'alice@example.com',
      });
      findUnique.mockResolvedValue(null);
      const toSession = await importToSession();
      const result = await toSession('token');
      expect(result).toBeNull();
    });
  });

  describe('when the database lookup throws', () => {
    it('returns null without leaking the error', async () => {
      verifyIdToken.mockResolvedValue({
        uid: 'uid-1',
        email: 'alice@example.com',
      });
      findUnique.mockRejectedValue(new Error('connection refused'));
      const toSession = await importToSession();
      const result = await toSession('token');
      expect(result).toBeNull();
    });
  });

  describe('when the user has no profile yet', () => {
    it('returns onboardingDone: false as a safe default', async () => {
      verifyIdToken.mockResolvedValue({
        uid: 'uid-1',
        email: 'alice@example.com',
      });
      findUnique.mockResolvedValue({ ...dbUser, profile: null });
      const toSession = await importToSession();
      const result = await toSession('token');
      expect(result).toEqual({
        uid: 'uid-1',
        email: 'alice@example.com',
        roles: ['USER'],
        amr: ['password'],
        onboardingDone: false,
      });
      expect(findUnique).toHaveBeenCalledWith({
        where: { email: 'alice@example.com' },
        include: { profile: { select: { onboardingDone: true } } },
      });
    });
  });

  describe('when the user has completed onboarding', () => {
    it('returns onboardingDone: true', async () => {
      verifyIdToken.mockResolvedValue({
        uid: 'uid-1',
        email: 'alice@example.com',
      });
      findUnique.mockResolvedValue({
        ...dbUser,
        profile: { onboardingDone: true },
      });
      const toSession = await importToSession();
      const result = await toSession('token');
      expect(result?.onboardingDone).toBe(true);
    });
  });
});
