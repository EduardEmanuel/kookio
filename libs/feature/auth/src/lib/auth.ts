import {
  DestroyRef,
  InjectionToken,
  PLATFORM_ID,
  computed,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { EMPTY, Observable, from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  pipe,
  shareReplay,
  switchMap,
  take,
  tap,
  timeout,
} from 'rxjs';
import { buildRefreshTimer$ } from './auth-timer';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseOptions,
} from 'firebase/app';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type User,
} from 'firebase/auth';

import type { AuthSession } from '@kookio/prisma-client';
import { reportError, reportMetric } from '@kookio/shared-observability';

/**
 * Safety-net window for `authReady`: if `onAuthStateChanged` never fires
 * (Firebase configured but stalled or silently failing), unblock the UI after
 * this so auth-guarded pages don't hang on an infinite skeleton.
 */
const AUTH_READY_TIMEOUT_MS = 5_000;

/**
 * Report-threshold for the first `onAuthStateChanged` callback latency. The
 * happy path (resolved from `browserLocalPersistence`, no network) lands in
 * tens-to-low-hundreds of ms, so anything past this is a slow tail worth
 * surfacing in Sentry. Reporting only the tail (and the timeout firing) keeps
 * this to a handful of events instead of one per page load — enough signal to
 * decide whether `AUTH_READY_TIMEOUT_MS` is right without flooding the quota.
 */
const SLOW_AUTH_READY_MS = 2_000;

export const FIREBASE_OPTIONS = new InjectionToken<FirebaseOptions>(
  'FIREBASE_OPTIONS',
);

export interface ProfileCounts {
  pantryCount: number;
  utensilCount: number;
  dietaryCount: number;
  preferredCategoryCount: number;
  preferredAreaCount: number;
}

/** Minimal tRPC surface needed by AuthStore. */
export interface AuthTrpcClient {
  auth: {
    me: { query(): Promise<AuthSession> };
    register: {
      mutate(input: {
        email: string;
        firebaseUid: string;
      }): Promise<AuthSession>;
    };
  };
  profile: {
    counts: { query(): Promise<ProfileCounts> };
  };
}

export const AUTH_TRPC = new InjectionToken<AuthTrpcClient>('AUTH_TRPC');

type Credentials = { email: string; password: string };

type AuthState = {
  currentUser: User | null;
  session: AuthSession | null;
  idToken: string | null;
  loginError: string | null;
  registerError: string | null;
  logoutError: string | null;
  loading: boolean;
  authReady: boolean;
  // True once the post-auth session fetch (`auth.me`) has settled — resolved
  // OR errored. Distinct from `authReady` (Firebase identity known): a guard
  // must wait for THIS before reading `onboardingDone`, otherwise a cold load
  // redirects an already-onboarded user to /onboarding before the session
  // arrives. Gated through the `isReady` computed.
  sessionSettled: boolean;

  // Aggregate counts populated after login (when onboardingDone) and after
  // any mutation that affects pantry/utensils/dietary/preferences. Drives
  // `hasProfileSignals` — see CONVENTION below.
  pantryCount: number;
  utensilCount: number;
  dietaryCount: number;
  preferredCategoryCount: number;
  preferredAreaCount: number;
};

const initialState: AuthState = {
  currentUser: null,
  session: null,
  idToken: null,
  loginError: null,
  registerError: null,
  logoutError: null,
  loading: false,
  authReady: false,
  sessionSettled: false,

  pantryCount: 0,
  utensilCount: 0,
  dietaryCount: 0,
  preferredCategoryCount: 0,
  preferredAreaCount: 0,
};

const ZERO_COUNTS: ProfileCounts = {
  pantryCount: 0,
  utensilCount: 0,
  dietaryCount: 0,
  preferredCategoryCount: 0,
  preferredAreaCount: 0,
};

// Module-level Auth reference for non-DI access (tRPC fetch wrapper, token checks).
// Set once during resolveAuth — safe to read after app bootstrap.
let _resolvedAuth: Auth | null = null;
export const getResolvedAuth = (): Auth | null => _resolvedAuth;

export { REFRESH_INTERVAL_MS, buildRefreshTimer$ } from './auth-timer';

const resolveAuth = (options: FirebaseOptions): Auth | null => {
  if (!options.apiKey) {
    return null;
  }
  const app = getApps().length > 0 ? getApp() : initializeApp(options);
  _resolvedAuth = getAuth(app);
  return _resolvedAuth;
};

/**
 * Convention: any mutation that affects pantry items, utensils, dietary
 * restrictions, or preferred categories/areas MUST call
 * `authStore.loadCounts()` in its success handler. The store keeps these
 * counters in-memory only — without an explicit refresh, `hasProfileSignals`
 * will lag behind reality. (Considered a global cache invalidation effect;
 * rejected for week 3 in favour of the explicit, debuggable convention.)
 */
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(
    ({
      currentUser,
      session,
      authReady,
      sessionSettled,
      pantryCount,
      utensilCount,
      dietaryCount,
      preferredCategoryCount,
      preferredAreaCount,
    }) => ({
      isAuthenticated: computed(() => !!currentUser()),
      onboardingDone: computed(() => session()?.onboardingDone ?? false),

      /**
       * Auth is "ready" for routing decisions when Firebase identity is known
       * AND — if a user is signed in — their server session has settled. A
       * guard reading `onboardingDone` / `isAuthenticated` before this is true
       * sees stale defaults and wrongly redirects on a cold load. `ready$()`
       * gates on this.
       */
      isReady: computed(
        () => authReady() && (!currentUser() || sessionSettled()),
      ),

      /**
       * True when the user has any profile-shaped data — pantry items,
       * utensils, dietary restrictions, or preferred categories/areas.
       * Used by surfaces like `/recipes` (empty-state CTA) and `/account`
       * (re-onboarding affordance).
       */
      hasProfileSignals: computed(
        () =>
          pantryCount() > 0 ||
          utensilCount() > 0 ||
          dietaryCount() > 0 ||
          preferredCategoryCount() > 0 ||
          preferredAreaCount() > 0,
      ),
    }),
  ),
  withMethods((store) => {
    const platformId = inject(PLATFORM_ID);
    const auth = isPlatformBrowser(platformId)
      ? resolveAuth(inject(FIREBASE_OPTIONS))
      : null;
    const trpc = inject(AUTH_TRPC, { optional: true });

    /**
     * Fetches aggregate profile counts and patches them into state.
     * Errors are swallowed silently — counters degrade gracefully
     * to whatever was already there, and the next trigger may succeed.
     */
    const loadCounts = rxMethod<void>(
      pipe(
        switchMap(() => {
          if (!trpc) return EMPTY;
          return from(trpc.profile.counts.query()).pipe(
            tap((counts) => patchState(store, counts)),
            catchError(() => {
              return EMPTY;
            }),
          );
        }),
      ),
    );

    /**
     * Refreshes the AuthSession from the server. When the freshly returned
     * session has `onboardingDone: true`, also triggers `loadCounts()` so
     * `hasProfileSignals` reflects server state without waiting for the
     * next mutation.
     */
    const fetchSession = rxMethod<void>(
      pipe(
        switchMap(() => {
          if (!trpc) {
            patchState(store, { sessionSettled: true });
            return EMPTY;
          }
          return from(trpc.auth.me.query()).pipe(
            tap((session) => {
              patchState(store, { session, sessionSettled: true });
              if (session.onboardingDone) loadCounts();
            }),
            catchError((err: unknown) => {
              reportError(err, 'auth.fetchSession');
              patchState(store, { sessionSettled: true });
              return EMPTY;
            }),
          );
        }),
      ),
    );

    /**
     * Emits once when auth is ready for routing (see `isReady`), then
     * completes. Built once and shared so repeated guard calls reuse one
     * underlying signal subscription. `timeout` is a backstop: if the session
     * fetch somehow never settles (a stalled network with no error), readiness
     * still resolves after 8s rather than hanging the guard on an infinite
     * skeleton. On the server there is no Firebase client, so resolve at once
     * and let the SSR-safe guard render optimistically.
     */
    const ready$Shared: Observable<void> = toObservable(store.isReady).pipe(
      filter((ready) => ready),
      take(1),
      map(() => undefined),
      timeout({ first: 8_000, with: () => of(undefined) }),
      shareReplay(1),
    );

    return {
      ready$: (): Observable<void> => (auth ? ready$Shared : of(undefined)),

      fetchSession,
      loadCounts,

      /**
       * Sync flip of `session.onboardingDone` to true and write the
       * just-submitted `name` into the local session, plus `loadCounts()`.
       * Called by `OnboardingStore.submit()` after a successful commit so
       * the UI reacts immediately, without a round-trip to `auth.me`.
       *
       * The name has to be propagated explicitly: restart-onboarding
       * commits with a new name while `session.onboardingDone` is already
       * true, so a guard like `!session.onboardingDone` would silently
       * drop the rename and leave the dashboard greeting stale.
       */
      markOnboardingDone: (name: string): void => {
        const session = store.session();
        if (session) {
          patchState(store, {
            session: { ...session, onboardingDone: true, name },
          });
        }
        loadCounts();
      },

      /**
       * Sync flip of `session.onboardingDone` back to false. Called by the
       * /account "Restart onboarding" button after a successful
       * `onboarding.reset` mutation, so `onboardingGuard` lets the user back
       * onto /onboarding without a round-trip to `auth.me`.
       *
       * Counts are NOT reset: `onboarding.reset` preserves all M:N selections
       * server-side, so the in-memory counters still reflect DB state.
       */
      markOnboardingReset: (): void => {
        const session = store.session();
        if (session && session.onboardingDone) {
          patchState(store, {
            session: { ...session, onboardingDone: false },
          });
        }
      },

      /**
       * Resets all five counters back to zero. Called from `logout()` so a
       * subsequent login cannot read stale values from the previous user.
       */
      resetCounts: (): void => {
        patchState(store, ZERO_COUNTS);
      },

      provisionUser: rxMethod<{ email: string; firebaseUid: string }>(
        pipe(
          switchMap((input) => {
            if (!trpc) return EMPTY;
            return from(trpc.auth.register.mutate(input)).pipe(
              tap((session) =>
                patchState(store, { session, sessionSettled: true }),
              ),
              catchError((err: { message?: string }) => {
                reportError(err, 'auth.provisionUser');
                const msg = err.message ?? String(err);
                patchState(store, { registerError: msg });
                return EMPTY;
              }),
            );
          }),
        ),
      ),

      login: rxMethod<Credentials>(
        pipe(
          tap(() => patchState(store, { loading: true, loginError: null })),
          switchMap(({ email, password }) => {
            if (!auth) {
              patchState(store, {
                loading: false,
                loginError: 'Firebase Auth not initialized',
              });
              return EMPTY;
            }
            return from(signInWithEmailAndPassword(auth, email, password)).pipe(
              tap(() => patchState(store, { loading: false })),
              catchError((err: { message?: string }) => {
                reportError(err, 'auth.login');
                patchState(store, {
                  loading: false,
                  loginError: err.message ?? String(err),
                });
                return EMPTY;
              }),
            );
          }),
        ),
      ),

      register: rxMethod<Credentials>(
        pipe(
          tap(() => patchState(store, { loading: true, registerError: null })),
          switchMap(({ email, password }) => {
            if (!auth) {
              patchState(store, {
                loading: false,
                registerError: 'Firebase Auth not initialized',
              });
              return EMPTY;
            }
            return from(
              createUserWithEmailAndPassword(auth, email, password),
            ).pipe(
              tap(() => patchState(store, { loading: false })),
              catchError((err: { message?: string }) => {
                reportError(err, 'auth.register');
                patchState(store, {
                  loading: false,
                  registerError: err.message ?? String(err),
                });
                return EMPTY;
              }),
            );
          }),
        ),
      ),

      logout: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, logoutError: null })),
          switchMap(() => {
            if (!auth) return EMPTY;
            return from(signOut(auth)).pipe(
              tap(() =>
                patchState(store, {
                  loading: false,
                  idToken: null,
                  session: null,
                  ...ZERO_COUNTS,
                }),
              ),
              catchError((err: { message?: string }) => {
                reportError(err, 'auth.logout');
                patchState(store, {
                  loading: false,
                  logoutError: err.message ?? String(err),
                });
                return EMPTY;
              }),
            );
          }),
        ),
      ),

      refreshToken: rxMethod<void>(
        pipe(
          switchMap(() => {
            if (!auth) return EMPTY;
            const user = auth.currentUser;
            if (!user) {
              patchState(store, { idToken: null });
              return EMPTY;
            }
            return from(user.getIdToken()).pipe(
              tap((token) => patchState(store, { idToken: token })),
              catchError((err: unknown) => {
                reportError(err, 'auth.refreshToken');
                // Token refresh failed → AppComponent won't fire fetchSession,
                // so settle readiness here rather than waiting for the timeout.
                patchState(store, { idToken: null, sessionSettled: true });
                return EMPTY;
              }),
            );
          }),
        ),
      ),
    };
  }),
  withHooks((store) => {
    const platformId = inject(PLATFORM_ID);
    const auth = isPlatformBrowser(platformId)
      ? resolveAuth(inject(FIREBASE_OPTIONS))
      : null;

    // toObservable must be called in an injection context — withHooks factory qualifies.
    // PASUL 1: Proactive token refresh every 55 minutes.
    // Timer starts after first login (idToken set), cancels on logout (idToken null).
    // takeUntilDestroyed handles cleanup automatically when the store is destroyed.
    if (isPlatformBrowser(platformId)) {
      const destroyRef = inject(DestroyRef);
      buildRefreshTimer$(toObservable(store.idToken))
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe(() => {
          store.refreshToken();
        });
    }

    return {
      onInit: () => {
        if (!auth) {
          // Browser context but Firebase not configured (missing env vars) —
          // still mark as ready so the form renders and can show a submit error.
          if (isPlatformBrowser(platformId)) {
            patchState(store, { authReady: true });
          }
          return;
        }

        // Safety net: if onAuthStateChanged never fires (Firebase hangs or
        // fails silently), unblock the UI after AUTH_READY_TIMEOUT_MS so forms
        // remain usable. `startedAt` anchors the latency telemetry below.
        const startedAt = performance.now();
        const readyTimer = isPlatformBrowser(platformId)
          ? setTimeout(() => {
              patchState(store, { authReady: true });
              // The timer winning means the callback never arrived in time —
              // the exact failure this net exists for. Always report it.
              reportMetric(
                'auth.authReady safety timer fired (onAuthStateChanged never resolved)',
                'auth.authReady.timeout',
                { timeoutMs: AUTH_READY_TIMEOUT_MS },
                'warning',
              );
            }, AUTH_READY_TIMEOUT_MS)
          : null;

        from(setPersistence(auth, browserLocalPersistence)).subscribe({
          error: () => undefined,
        });

        onAuthStateChanged(
          auth,
          (user) => {
            if (readyTimer !== null) clearTimeout(readyTimer);
            // Surface only the slow tail — see SLOW_AUTH_READY_MS. A cluster of
            // these near AUTH_READY_TIMEOUT_MS says the timer is too low; their
            // absence over time says it is a dormant net and could be lowered.
            const latencyMs = Math.round(performance.now() - startedAt);
            if (latencyMs > SLOW_AUTH_READY_MS) {
              reportMetric(
                'auth.onAuthStateChanged resolved slowly',
                'auth.authReady.slow',
                { latencyMs },
                'info',
              );
            }
            patchState(store, { currentUser: user, authReady: true });
          },
          () => undefined,
        );
      },
    };
  }),
);
