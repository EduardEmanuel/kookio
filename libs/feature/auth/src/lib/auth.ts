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
import { catchError, pipe, switchMap, tap } from 'rxjs';
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

import { noopLogger } from '@kookio/core-logging';
import type { AuthSession } from '@kookio/prisma-client';

const log = noopLogger;

export const FIREBASE_OPTIONS = new InjectionToken<FirebaseOptions>(
  'FIREBASE_OPTIONS',
);

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
};

// Module-level Auth reference for non-DI access (tRPC fetch wrapper, token checks).
// Set once during resolveAuth — safe to read after app bootstrap.
let _resolvedAuth: Auth | null = null;
export const getResolvedAuth = (): Auth | null => _resolvedAuth;

export { REFRESH_INTERVAL_MS, buildRefreshTimer$ } from './auth-timer';

const resolveAuth = (options: FirebaseOptions): Auth | null => {
  if (!options.apiKey) {
    log.warn(
      { options },
      'Firebase options missing apiKey — check FIREBASE_* env vars. Run: vercel env pull .env.local',
    );
    return null;
  }
  const app = getApps().length > 0 ? getApp() : initializeApp(options);
  _resolvedAuth = getAuth(app);
  return _resolvedAuth;
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ currentUser }) => ({
    isAuthenticated: computed(() => !!currentUser()),
  })),
  withMethods((store) => {
    const platformId = inject(PLATFORM_ID);
    const auth = isPlatformBrowser(platformId)
      ? resolveAuth(inject(FIREBASE_OPTIONS))
      : null;
    const trpc = inject(AUTH_TRPC, { optional: true });

    return {
      ready$: (): Observable<void> => {
        if (!auth) return of(undefined);
        return new Observable<void>((sub) => {
          const unsub = onAuthStateChanged(auth, () => {
            sub.next();
            sub.complete();
          });
          return unsub;
        });
      },

      fetchSession: rxMethod<void>(
        pipe(
          switchMap(() => {
            if (!trpc) return EMPTY;
            return from(trpc.auth.me.query()).pipe(
              tap((session) => patchState(store, { session })),
              catchError((err) => {
                log.warn({ err }, 'auth.me failed');
                return EMPTY;
              }),
            );
          }),
        ),
      ),

      provisionUser: rxMethod<{ email: string; firebaseUid: string }>(
        pipe(
          switchMap((input) => {
            if (!trpc) return EMPTY;
            return from(trpc.auth.register.mutate(input)).pipe(
              tap((session) => patchState(store, { session })),
              catchError((err: { message?: string }) => {
                const msg = err.message ?? String(err);
                log.warn({ err }, 'auth.register provision failed');
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
                patchState(store, {
                  loading: false,
                  loginError: err.message ?? String(err),
                });
                log.warn({ err }, 'Login failed');
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
                patchState(store, {
                  loading: false,
                  registerError: err.message ?? String(err),
                });
                log.warn({ err }, 'Register failed');
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
                }),
              ),
              catchError((err: { message?: string }) => {
                patchState(store, {
                  loading: false,
                  logoutError: err.message ?? String(err),
                });
                log.warn({ err }, 'Logout failed');
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
              catchError((err) => {
                log.warn({ err }, 'getIdToken failed');
                patchState(store, { idToken: null });
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
          log.info({}, 'Proactive token refresh triggered');
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
        // fails silently), unblock the UI after 5 s so forms remain usable.
        const readyTimer = isPlatformBrowser(platformId)
          ? setTimeout(() => patchState(store, { authReady: true }), 5_000)
          : null;

        from(setPersistence(auth, browserLocalPersistence)).subscribe({
          error: (err) => log.warn({ err }, 'Failed to set auth persistence'),
        });

        onAuthStateChanged(
          auth,
          (user) => {
            if (readyTimer !== null) clearTimeout(readyTimer);
            patchState(store, { currentUser: user, authReady: true });
          },
          (err) => log.warn({ err }, 'onAuthStateChanged error'),
        );
      },
    };
  }),
);
