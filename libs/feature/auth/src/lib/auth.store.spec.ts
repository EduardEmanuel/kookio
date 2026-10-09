import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { signOutMock, reportMetricMock, onAuthStateChangedMock } = vi.hoisted(
  () => ({
    signOutMock: vi.fn<() => Promise<void>>(() => Promise.resolve()),
    reportMetricMock: vi.fn(),
    // Default: resolve synchronously with no signed-in user (the happy path).
    // A test can `mockImplementationOnce` this to never call back, exercising
    // the authReady safety-timer path.
    onAuthStateChangedMock: vi.fn((_auth: unknown, cb: (u: null) => void) => {
      cb(null);
      return vi.fn();
    }),
  }),
);

vi.mock('firebase/app', () => ({
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
  initializeApp: vi.fn(() => ({ name: '[DEFAULT]' })),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ currentUser: null })),
  browserLocalPersistence: 'local',
  createUserWithEmailAndPassword: vi.fn(),
  onAuthStateChanged: onAuthStateChangedMock,
  setPersistence: vi.fn(() => Promise.resolve()),
  signInWithEmailAndPassword: vi.fn(),
  signOut: signOutMock,
}));

vi.mock('@kookio/shared-observability', () => ({
  reportError: vi.fn(),
  reportMetric: reportMetricMock,
}));

import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import type { AuthSession } from '@kookio/prisma-client';

import {
  AUTH_TRPC,
  AuthStore,
  FIREBASE_OPTIONS,
  type AuthTrpcClient,
  type ProfileCounts,
} from './auth';

const flush = (): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, 0));

const makeSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: 'user-123',
  email: 'user@example.com',
  name: null,
  amr: ['password'],
  onboardingDone: false,
  ...overrides,
});

const makeCounts = (overrides: Partial<ProfileCounts> = {}): ProfileCounts => ({
  pantryCount: 0,
  utensilCount: 0,
  dietaryCount: 0,
  preferredCategoryCount: 0,
  preferredAreaCount: 0,
  ...overrides,
});

const setup = (
  trpcOverrides: {
    me?: () => Promise<AuthSession>;
    counts?: () => Promise<ProfileCounts>;
  } = {},
) => {
  const meSpy = vi.fn(
    trpcOverrides.me ?? (() => Promise.resolve(makeSession())),
  );
  const countsSpy = vi.fn(
    trpcOverrides.counts ?? (() => Promise.resolve(makeCounts())),
  );

  const trpc: AuthTrpcClient = {
    auth: {
      me: { query: meSpy },
      register: { mutate: vi.fn() },
    },
    profile: {
      counts: { query: countsSpy },
    },
  };

  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      { provide: FIREBASE_OPTIONS, useValue: { apiKey: 'test-key' } },
      { provide: AUTH_TRPC, useValue: trpc },
    ],
  });

  const store = TestBed.inject(AuthStore);
  return { store, meSpy, countsSpy };
};

describe('AuthStore — counters and hasProfileSignals', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('all five counters start at 0 and hasProfileSignals is false', () => {
      const { store } = setup();
      expect(store.pantryCount()).toBe(0);
      expect(store.utensilCount()).toBe(0);
      expect(store.dietaryCount()).toBe(0);
      expect(store.preferredCategoryCount()).toBe(0);
      expect(store.preferredAreaCount()).toBe(0);
      expect(store.hasProfileSignals()).toBe(false);
    });
  });

  describe('loadCounts', () => {
    it('populates all five counters from the server payload', async () => {
      const { store, countsSpy } = setup({
        counts: () =>
          Promise.resolve(
            makeCounts({
              pantryCount: 7,
              utensilCount: 3,
              dietaryCount: 2,
              preferredCategoryCount: 4,
              preferredAreaCount: 1,
            }),
          ),
      });

      store.loadCounts();
      await flush();

      expect(countsSpy).toHaveBeenCalledOnce();
      expect(store.pantryCount()).toBe(7);
      expect(store.utensilCount()).toBe(3);
      expect(store.dietaryCount()).toBe(2);
      expect(store.preferredCategoryCount()).toBe(4);
      expect(store.preferredAreaCount()).toBe(1);
      expect(store.hasProfileSignals()).toBe(true);
    });

    it('swallows errors and leaves counters unchanged', async () => {
      const { store } = setup({
        counts: () => Promise.reject(new Error('network')),
      });

      store.loadCounts();
      await flush();

      expect(store.pantryCount()).toBe(0);
      expect(store.hasProfileSignals()).toBe(false);
    });
  });

  describe('hasProfileSignals', () => {
    it('returns true when any single counter is greater than 0', async () => {
      const cases: Array<keyof ProfileCounts> = [
        'pantryCount',
        'utensilCount',
        'dietaryCount',
        'preferredCategoryCount',
        'preferredAreaCount',
      ];

      for (const key of cases) {
        const { store } = setup({
          counts: () => Promise.resolve(makeCounts({ [key]: 1 })),
        });
        store.loadCounts();
        await flush();
        expect(store.hasProfileSignals()).toBe(true);
        TestBed.resetTestingModule();
      }
    });
  });

  describe('fetchSession', () => {
    it('triggers loadCounts when the fresh session has onboardingDone=true', async () => {
      const { store, countsSpy } = setup({
        me: () => Promise.resolve(makeSession({ onboardingDone: true })),
        counts: () =>
          Promise.resolve(
            makeCounts({
              pantryCount: 2,
              preferredCategoryCount: 1,
            }),
          ),
      });

      store.fetchSession();
      await flush();

      expect(countsSpy).toHaveBeenCalledOnce();
      expect(store.session()?.onboardingDone).toBe(true);
      expect(store.hasProfileSignals()).toBe(true);
    });

    it('does NOT trigger loadCounts when onboardingDone=false', async () => {
      const { store, countsSpy } = setup({
        me: () => Promise.resolve(makeSession({ onboardingDone: false })),
      });

      store.fetchSession();
      await flush();

      expect(countsSpy).not.toHaveBeenCalled();
      expect(store.session()?.onboardingDone).toBe(false);
      expect(store.hasProfileSignals()).toBe(false);
    });
  });

  describe('markOnboardingDone', () => {
    it('flips session.onboardingDone, writes the new name, and triggers loadCounts', async () => {
      const { store, countsSpy } = setup({
        me: () => Promise.resolve(makeSession({ onboardingDone: false })),
        counts: () => Promise.resolve(makeCounts({ utensilCount: 5 })),
      });

      store.fetchSession();
      await flush();
      expect(store.session()?.onboardingDone).toBe(false);

      countsSpy.mockClear();
      store.markOnboardingDone('Ana');
      await flush();

      expect(store.session()?.onboardingDone).toBe(true);
      expect(store.session()?.name).toBe('Ana');
      expect(countsSpy).toHaveBeenCalledOnce();
      expect(store.utensilCount()).toBe(5);
      expect(store.hasProfileSignals()).toBe(true);
    });

    it('updates the name and loads counts even when onboardingDone is already true (restart-onboarding case)', async () => {
      const { store, countsSpy } = setup({
        me: () =>
          Promise.resolve(makeSession({ onboardingDone: true, name: 'Old' })),
      });

      store.fetchSession();
      await flush();
      countsSpy.mockClear();

      store.markOnboardingDone('New');
      await flush();

      expect(store.session()?.onboardingDone).toBe(true);
      expect(store.session()?.name).toBe('New');
      expect(countsSpy).toHaveBeenCalledOnce();
    });

    it('still triggers loadCounts when no session is present (no-op on session flip)', async () => {
      const { store, countsSpy } = setup();

      store.markOnboardingDone('Ana');
      await flush();

      expect(store.session()).toBeNull();
      expect(countsSpy).toHaveBeenCalledOnce();
    });
  });

  describe('resetCounts', () => {
    it('zeroes all five counters', async () => {
      const { store } = setup({
        counts: () =>
          Promise.resolve(
            makeCounts({
              pantryCount: 9,
              utensilCount: 4,
              dietaryCount: 3,
              preferredCategoryCount: 2,
              preferredAreaCount: 1,
            }),
          ),
      });

      store.loadCounts();
      await flush();
      expect(store.hasProfileSignals()).toBe(true);

      store.resetCounts();
      expect(store.pantryCount()).toBe(0);
      expect(store.utensilCount()).toBe(0);
      expect(store.dietaryCount()).toBe(0);
      expect(store.preferredCategoryCount()).toBe(0);
      expect(store.preferredAreaCount()).toBe(0);
      expect(store.hasProfileSignals()).toBe(false);
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      signOutMock.mockClear();
      signOutMock.mockResolvedValue(undefined as never);
    });

    it('zeroes all counters on successful logout', async () => {
      const { store } = setup({
        counts: () =>
          Promise.resolve(makeCounts({ pantryCount: 4, utensilCount: 2 })),
      });

      store.loadCounts();
      await flush();
      expect(store.hasProfileSignals()).toBe(true);

      store.logout();
      await flush();

      expect(signOutMock).toHaveBeenCalledOnce();
      expect(store.pantryCount()).toBe(0);
      expect(store.utensilCount()).toBe(0);
      expect(store.hasProfileSignals()).toBe(false);
      expect(store.session()).toBeNull();
    });
  });

  describe('sessionSettled and isReady (cold-load readiness)', () => {
    it('isReady is true once auth resolves with no signed-in user', () => {
      // onAuthStateChanged fires cb(null) on init → authReady true, no user.
      const { store } = setup();
      expect(store.isReady()).toBe(true);
    });

    it('flips sessionSettled true after the session fetch resolves', async () => {
      const { store } = setup({ me: () => Promise.resolve(makeSession()) });
      expect(store.sessionSettled()).toBe(false);

      store.fetchSession();
      await flush();

      expect(store.sessionSettled()).toBe(true);
    });

    it('flips sessionSettled true even when the session fetch errors (never hangs readiness)', async () => {
      const { store } = setup({
        me: () => Promise.reject(new Error('auth.me 401')),
      });

      store.fetchSession();
      await flush();

      // The whole point of the fix: a failed auth.me must still settle, so a
      // guard waiting on readiness proceeds instead of redirecting forever.
      expect(store.sessionSettled()).toBe(true);
    });
  });

  describe('authReady telemetry', () => {
    it('reports nothing when onAuthStateChanged resolves fast (no per-load noise)', () => {
      setup();
      // Default mock resolves synchronously → latency under the slow threshold
      // and the timer is cleared, so neither metric fires.
      expect(reportMetricMock).not.toHaveBeenCalled();
    });

    it('reports a warning when the authReady safety timer fires', () => {
      vi.useFakeTimers();
      // onAuthStateChanged never calls back → only the timer can resolve readiness.
      onAuthStateChangedMock.mockImplementationOnce(() => vi.fn());
      try {
        const { store } = setup();
        expect(store.authReady()).toBe(false);

        vi.advanceTimersByTime(5_000);

        expect(store.authReady()).toBe(true);
        expect(reportMetricMock).toHaveBeenCalledWith(
          expect.any(String),
          'auth.authReady.timeout',
          { timeoutMs: 5_000 },
          'warning',
        );
      } finally {
        vi.useRealTimers();
      }
    });
  });
});
