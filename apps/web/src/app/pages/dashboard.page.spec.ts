import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import type { User } from 'firebase/auth';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import {
  GROCERIES_TRPC,
  type GroceriesTrpcClient,
} from '@kookio/feature-groceries/trpc';
import { PantryStore } from '@kookio/feature-pantry/store';
import { PlanStore } from '@kookio/feature-plan/store';
import type { AuthSession } from '@kookio/prisma-client';

import DashboardPage from './dashboard.page';

const stubPantryStore = {
  items: vi.fn(() => []),
  isLoading: vi.fn(() => false),
  load: vi.fn(),
};

// PlanStore is `providedIn: 'root'` and would otherwise try to inject
// MEAL_PLAN_TRPC (not provided in this spec). The meal-plan-today
// widget uses only `slotsByKey`, `isLoading`, `hasLoadedOnce` and
// `load()` — stub matches that read surface.
const stubPlanStore = {
  slotsByKey: vi.fn(() => new Map()),
  isLoading: vi.fn(() => false),
  hasLoadedOnce: vi.fn(() => true),
  load: vi.fn(),
};

// The groceries-count widget injects GROCERIES_TRPC and calls `stats.query()`.
// Returning an Observable matches the analog client's runtime shape; the
// widget wraps with `from(...)` which is a no-op on Observables.
const stubGroceriesTrpc: GroceriesTrpcClient = {
  groceries: {
    list: { query: vi.fn() },
    toggleBought: { mutate: vi.fn() },
    stats: {
      query: vi.fn(() =>
        of({ total: 0, remaining: 0 }),
      ) as unknown as GroceriesTrpcClient['groceries']['stats']['query'],
    },
  },
};

const makeSession = (name: string | null): AuthSession => ({
  uid: 'user-123',
  email: 'user@example.com',
  name,
  amr: ['password'],
  onboardingDone: true,
});

const setup = async (
  opts: {
    currentUser?: Partial<User> | null;
    sessionName?: string | null;
  } = {},
) => {
  const session =
    opts.sessionName !== undefined ? makeSession(opts.sessionName) : null;
  const authStore = createMockAuthStore({
    currentUser: opts.currentUser ?? null,
    session,
    authReady: true,
  });

  await TestBed.configureTestingModule({
    imports: [DashboardPage],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: AuthStore, useValue: authStore },
      { provide: PantryStore, useValue: stubPantryStore },
      { provide: PlanStore, useValue: stubPlanStore },
      { provide: GROCERIES_TRPC, useValue: stubGroceriesTrpc },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(DashboardPage);
  fixture.detectChanges();
  await fixture.whenStable();

  return fixture.nativeElement as HTMLElement;
};

describe('DashboardPage', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('greets by session.name when present (set in onboarding/account)', async () => {
    const el = await setup({ sessionName: 'Ana Maria' });
    expect(el.textContent ?? '').toContain('Hi, Ana');
  });

  it('falls back to Firebase displayName when session.name is null', async () => {
    const el = await setup({
      sessionName: null,
      currentUser: { displayName: 'Eduard Emanuel', email: 'edu@example.com' },
    });
    expect(el.textContent ?? '').toContain('Hi, Eduard');
  });

  it('falls back to "cook" when neither session.name nor displayName are set', async () => {
    const el = await setup({
      sessionName: null,
      currentUser: { displayName: null, email: 'whatever@example.com' },
    });
    expect(el.textContent ?? '').toContain('Hi, cook');
  });

  it('mounts all three widgets', async () => {
    const el = await setup({ sessionName: 'Ana' });

    expect(el.querySelector('kookio-expiring-soon-widget')).not.toBeNull();
    expect(el.querySelector('kookio-meal-plan-today-widget')).not.toBeNull();
    expect(el.querySelector('kookio-groceries-count-widget')).not.toBeNull();
  });
});
