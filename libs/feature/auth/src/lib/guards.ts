import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router, type CanActivateFn, type UrlTree } from '@angular/router';
import { map, of } from 'rxjs';
import type { Observable } from 'rxjs';

import { AuthStore } from './auth';
import { URLS } from '@kookio/shared-utility';

/**
 * Blocks unauthenticated users.
 * Redirects to /login?returnUrl=<current_path>.
 */
export const authGuard: CanActivateFn = (
  _route,
  state,
): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  // Firebase client auth doesn't exist during SSR, so the server can't know
  // whether the user is signed in. Render gated pages optimistically on the
  // server and let this guard re-run on the client after hydration — otherwise
  // a hard reload of any gated route redirects before the browser can resolve
  // auth (the server has no session, so it bounces every cold load).
  if (isPlatformServer(inject(PLATFORM_ID))) return of(true);

  return authStore
    .ready$()
    .pipe(
      map(() =>
        authStore.isAuthenticated()
          ? true
          : router.parseUrl(
              `${URLS.LOGIN}?returnUrl=${encodeURIComponent(state.url)}`,
            ),
      ),
    );
};

/**
 * Blocks authenticated users from guest-only pages (login, register).
 * Redirects to HOME if already signed in.
 */
export const guestGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  return authStore
    .ready$()
    .pipe(
      map(() =>
        !authStore.isAuthenticated() ? true : router.parseUrl(URLS.HOME),
      ),
    );
};

/**
 * Blocks authenticated users who have not yet completed onboarding.
 * Redirects to /onboarding. Apply AFTER authGuard:
 *   canActivate: [authGuard, onboardingGuard]
 * The /onboarding route itself must NOT use this guard (would loop).
 */
export const onboardingGuard: CanActivateFn = (): Observable<
  boolean | UrlTree
> => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  // See authGuard: never redirect during SSR (no Firebase client → no session
  // → a cold load would always bounce to /onboarding). Enforce on the client.
  if (isPlatformServer(inject(PLATFORM_ID))) return of(true);

  return authStore
    .ready$()
    .pipe(
      map(() =>
        authStore.onboardingDone() ? true : router.parseUrl(URLS.ONBOARDING),
      ),
    );
};
