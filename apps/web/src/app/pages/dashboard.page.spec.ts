import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import type { User } from 'firebase/auth';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import { PantryStore } from '@kookio/feature-pantry/store';
import type { AuthSession } from '@kookio/prisma-client';

import DashboardPage from './dashboard.page';

const stubPantryStore = {
  items: vi.fn(() => []),
  isLoading: vi.fn(() => false),
  load: vi.fn(),
};

const makeSession = (name: string | null): AuthSession => ({
  uid: 'user-123',
  email: 'user@example.com',
  name,
  roles: [],
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
    expect(el.querySelector('kookio-shopping-count-widget')).not.toBeNull();
  });
});
