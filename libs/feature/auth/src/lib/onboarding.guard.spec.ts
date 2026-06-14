import { afterEach, describe, expect, it } from 'vitest';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import type {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthStore } from './auth';
import { onboardingGuard } from './guards';
import { createMockAuthStore } from './testing/auth-store.mock';

const fakeRoute = {} as ActivatedRouteSnapshot;
const fakeState = (url: string) => ({ url }) as RouterStateSnapshot;

const setup = (onboardingDone: boolean) => {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      { provide: AuthStore, useValue: createMockAuthStore({ onboardingDone }) },
    ],
  });
};

const runGuard = (state: RouterStateSnapshot) =>
  TestBed.runInInjectionContext(() =>
    firstValueFrom(
      onboardingGuard(fakeRoute, state) as ReturnType<typeof firstValueFrom>,
    ),
  );

describe('onboardingGuard', () => {
  afterEach(() => TestBed.resetTestingModule());

  describe('when onboarding is done', () => {
    it('returns true', async () => {
      setup(true);
      const result = await runGuard(fakeState('/pantry'));
      expect(result).toBe(true);
    });
  });

  describe('when onboarding is not done', () => {
    it('redirects to /onboarding', async () => {
      setup(false);
      const router = TestBed.inject(Router);
      const result = await runGuard(fakeState('/pantry'));
      expect(result).toBeInstanceOf(UrlTree);
      expect(router.serializeUrl(result as UrlTree)).toBe('/onboarding');
    });

    it('redirects regardless of the source URL', async () => {
      setup(false);
      const router = TestBed.inject(Router);
      const result = await runGuard(fakeState('/recipe/abc-123'));
      expect(router.serializeUrl(result as UrlTree)).toBe('/onboarding');
    });
  });

  describe('during SSR (server platform)', () => {
    it('returns true without redirecting, even when onboarding is not done (the server has no session — enforce on the client)', async () => {
      TestBed.configureTestingModule({
        providers: [
          provideRouter([]),
          { provide: PLATFORM_ID, useValue: 'server' },
          {
            provide: AuthStore,
            useValue: createMockAuthStore({ onboardingDone: false }),
          },
        ],
      });
      const result = await runGuard(fakeState('/pantry'));
      expect(result).toBe(true);
    });
  });
});
