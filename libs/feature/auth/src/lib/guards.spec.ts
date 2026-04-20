import { afterEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { of } from 'rxjs';
import type {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { authGuard, guestGuard, roleGuard } from './guards';
import { AuthStore } from './auth';
import type { AuthSession } from '@kookio/prisma-client';

const fakeRoute = {} as ActivatedRouteSnapshot;
const fakeState = (url: string) => ({ url }) as RouterStateSnapshot;

const makeAuthStore = (opts: {
  isAuthenticated: boolean;
  session?: AuthSession | null;
}) => ({
  ready$: () => of(undefined),
  isAuthenticated: () => opts.isAuthenticated,
  session: () => opts.session ?? null,
});

const setup = (
  isAuthenticated: boolean,
  session: AuthSession | null = null,
) => {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      {
        provide: AuthStore,
        useValue: makeAuthStore({ isAuthenticated, session }),
      },
    ],
  });
};

afterEach(() => TestBed.resetTestingModule());

// ─── authGuard ────────────────────────────────────────────────────────────────

describe('authGuard', () => {
  it('returns true when the user is authenticated', async () => {
    setup(true);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        authGuard(fakeRoute, fakeState('/pantry')) as ReturnType<
          typeof firstValueFrom
        >,
      ),
    );
    expect(result).toBe(true);
  });

  it('redirects to /login with returnUrl when not authenticated', async () => {
    setup(false);
    const router = TestBed.inject(Router);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        authGuard(fakeRoute, fakeState('/pantry')) as ReturnType<
          typeof firstValueFrom
        >,
      ),
    );
    expect(result).toBeInstanceOf(UrlTree);
    const url = router.serializeUrl(result as UrlTree);
    expect(url).toContain('/login');
    expect(url).toContain('returnUrl');
    expect(url).toContain(encodeURIComponent('/pantry'));
  });

  it('preserves nested returnUrl paths', async () => {
    setup(false);
    const router = TestBed.inject(Router);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        authGuard(fakeRoute, fakeState('/pantry/details?id=1')) as ReturnType<
          typeof firstValueFrom
        >,
      ),
    );
    const url = router.serializeUrl(result as UrlTree);
    expect(url).toContain(encodeURIComponent('/pantry/details'));
  });
});

// ─── guestGuard ───────────────────────────────────────────────────────────────

describe('guestGuard', () => {
  it('returns true when the user is not authenticated', async () => {
    setup(false);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        guestGuard(fakeRoute, fakeState('/login')) as ReturnType<
          typeof firstValueFrom
        >,
      ),
    );
    expect(result).toBe(true);
  });

  it('redirects to / when the user is already authenticated', async () => {
    setup(true);
    const router = TestBed.inject(Router);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        guestGuard(fakeRoute, fakeState('/login')) as ReturnType<
          typeof firstValueFrom
        >,
      ),
    );
    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toBe('/');
  });
});

// ─── roleGuard ────────────────────────────────────────────────────────────────

describe('roleGuard', () => {
  it('redirects to /login when not authenticated', async () => {
    setup(false);
    const router = TestBed.inject(Router);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        roleGuard('ADMIN')(fakeRoute, fakeState('/admin')) as ReturnType<
          typeof firstValueFrom
        >,
      ),
    );
    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toBe('/login');
  });

  it('redirects to /403 when authenticated but session is null', async () => {
    setup(true, null);
    const router = TestBed.inject(Router);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        roleGuard('ADMIN')(fakeRoute, fakeState('/admin')) as ReturnType<
          typeof firstValueFrom
        >,
      ),
    );
    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toBe('/403');
  });

  it('redirects to /403 when authenticated but role is missing', async () => {
    const session = { roles: ['USER'] } as unknown as AuthSession;
    setup(true, session);
    const router = TestBed.inject(Router);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        roleGuard('ADMIN')(fakeRoute, fakeState('/admin')) as ReturnType<
          typeof firstValueFrom
        >,
      ),
    );
    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toBe('/403');
  });

  it('returns true when user has the required role', async () => {
    const session = { roles: ['ADMIN'] } as unknown as AuthSession;
    setup(true, session);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        roleGuard('ADMIN')(fakeRoute, fakeState('/admin')) as ReturnType<
          typeof firstValueFrom
        >,
      ),
    );
    expect(result).toBe(true);
  });

  it('accepts any of several required roles', async () => {
    const session = { roles: ['MODERATOR'] } as unknown as AuthSession;
    setup(true, session);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        roleGuard('ADMIN', 'MODERATOR')(
          fakeRoute,
          fakeState('/admin'),
        ) as ReturnType<typeof firstValueFrom>,
      ),
    );
    expect(result).toBe(true);
  });
});
