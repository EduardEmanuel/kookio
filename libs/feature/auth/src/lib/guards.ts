import { inject } from '@angular/core';
import { Router, type CanActivateFn, type UrlTree } from '@angular/router';
import { map } from 'rxjs';
import type { Observable } from 'rxjs';

import { AuthStore } from './auth';
import { URLS } from '@kookio/feature-shell';
import type { Role } from '@kookio/prisma-client/dtos';

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
 * Factory — blocks users without the required role(s).
 * Redirects to /403 when authenticated but lacking role.
 * Redirects to /login when not authenticated at all.
 */
export const roleGuard =
  (...required: Role[]): CanActivateFn =>
  (): Observable<boolean | UrlTree> => {
    const router = inject(Router);
    const authStore = inject(AuthStore);

    return authStore.ready$().pipe(
      map(() => {
        if (!authStore.isAuthenticated()) {
          return router.parseUrl(URLS.LOGIN);
        }

        const session = authStore.session();
        if (!session) {
          // Authenticated with Firebase but session not yet fetched — deny conservatively
          return router.parseUrl(URLS.FORBIDDEN);
        }

        const hasRole = required.some((r) => session.roles.includes(r));
        return hasRole ? true : router.parseUrl(URLS.FORBIDDEN);
      }),
    );
  };
