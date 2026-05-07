import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import type { User } from 'firebase/auth';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import { PantryStore } from '@kookio/feature-pantry/store';

import DashboardPage from './dashboard.page';

const stubPantryStore = {
  items: vi.fn(() => []),
  isLoading: vi.fn(() => false),
  load: vi.fn(),
};

const setup = async (currentUser: Partial<User> | null) => {
  const authStore = createMockAuthStore({ currentUser, authReady: true });

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

  it('greets by displayName when set', async () => {
    const el = await setup({
      displayName: 'Ana Maria',
      email: 'ana@example.com',
    });
    expect(el.textContent ?? '').toContain('Hi, Ana');
  });

  it('falls back to the email local-part when displayName is missing', async () => {
    const el = await setup({ displayName: null, email: 'eduard@example.com' });
    expect(el.textContent ?? '').toContain('Hi, eduard');
  });

  it('falls back to "cook" when both displayName and email are missing', async () => {
    const el = await setup({ displayName: null, email: null });
    expect(el.textContent ?? '').toContain('Hi, cook');
  });

  it('mounts all four widgets', async () => {
    const el = await setup({ displayName: 'Ana', email: 'ana@example.com' });

    expect(el.querySelector('kookio-quick-actions-widget')).not.toBeNull();
    expect(el.querySelector('kookio-expiring-soon-widget')).not.toBeNull();
    expect(el.querySelector('kookio-meal-plan-today-widget')).not.toBeNull();
    expect(el.querySelector('kookio-shopping-count-widget')).not.toBeNull();
  });
});
