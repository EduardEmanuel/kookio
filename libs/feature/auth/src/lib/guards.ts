import { inject } from '@angular/core';
import { Router, type CanActivateFn, type UrlTree } from '@angular/router';
import { map } from 'rxjs';
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

  return authStore
    .ready$()
    .pipe(
      map(() =>
        authStore.onboardingDone() ? true : router.parseUrl(URLS.ONBOARDING),
      ),
    );
};
