import { afterEach, describe, expect, it } from 'vitest';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import type {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import type { AuthSession } from '@kookio/prisma-client';

import { authGuard, guestGuard } from './guards';
import { AuthStore } from './auth';
import { createMockAuthStore } from './testing/auth-store.mock';

const fakeRoute = {} as ActivatedRouteSnapshot;
const fakeState = (url: string) => ({ url }) as RouterStateSnapshot;

const setup = (
  isAuthenticated: boolean,
  session: AuthSession | null = null,
) => {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      {
        provide: AuthStore,
        useValue: createMockAuthStore({ isAuthenticated, session }),
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

  describe('during SSR (server platform)', () => {
    it('renders optimistically (returns true) even when unauthenticated, deferring the redirect to the client', async () => {
      TestBed.configureTestingModule({
        providers: [
          provideRouter([]),
          { provide: PLATFORM_ID, useValue: 'server' },
          {
            provide: AuthStore,
            useValue: createMockAuthStore({ isAuthenticated: false }),
          },
        ],
      });
      const result = await TestBed.runInInjectionContext(() =>
        firstValueFrom(
          authGuard(fakeRoute, fakeState('/pantry')) as ReturnType<
            typeof firstValueFrom
          >,
        ),
      );
      expect(result).toBe(true);
    });
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
