import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import type { User } from 'firebase/auth';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { TopBarComponent } from './top-bar.component';

const mockUser = { uid: 'u1', email: 'user@test.com' } as User;

@Component({ template: '' })
class StubPage {}

describe('TopBarComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  const setup = async (
    init: {
      user?: User | null;
      onboardingDone?: boolean;
      navigateTo?: string;
    } = {},
  ) => {
    const store = createMockAuthStore({
      currentUser: init.user ?? null,
      onboardingDone: init.onboardingDone ?? true,
    });
    await TestBed.configureTestingModule({
      imports: [TopBarComponent, StubPage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([
          { path: 'login', component: StubPage },
          { path: 'recipes/match', component: StubPage },
          { path: '**', component: StubPage },
        ]),
        { provide: AuthStore, useValue: store },
      ],
    }).compileComponents();

    if (init.navigateTo) {
      await TestBed.inject(Router).navigateByUrl(init.navigateTo);
    }

    const fixture = TestBed.createComponent(TopBarComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, store, el: fixture.nativeElement as HTMLElement };
  };

  describe('rendering', () => {
    it('shows the Kookio logo', async () => {
      const { el } = await setup();
      expect(el.querySelector('svg[aria-label="Kookio"]')).toBeTruthy();
    });

    it('shows login link when not authenticated', async () => {
      const { el } = await setup({ user: null });
      expect(el.querySelector('a[href="/login"]')).toBeTruthy();
    });

    it('does not show login link when authenticated', async () => {
      const { el } = await setup({ user: mockUser });
      expect(el.querySelector('a[href="/login"]')).toBeNull();
    });

    it('shows account button when authenticated', async () => {
      const { el } = await setup({ user: mockUser });
      const icons = Array.from(el.querySelectorAll('mat-icon'));
      expect(
        icons.some((i) => i.textContent?.trim() === 'account_circle'),
      ).toBe(true);
    });
  });

  describe('cook-now shortcut', () => {
    it('shows the cook-now icon for an authenticated, onboarded user on a regular route', async () => {
      const { el } = await setup({
        user: mockUser,
        onboardingDone: true,
        navigateTo: '/dashboard',
      });
      expect(el.querySelector('a[aria-label="Cook now"]')).toBeTruthy();
    });

    it('hides the cook-now icon for unauthenticated users', async () => {
      const { el } = await setup({ user: null });
      expect(el.querySelector('a[aria-label="Cook now"]')).toBeNull();
    });

    it('hides the cook-now icon for users who have not finished onboarding', async () => {
      const { el } = await setup({
        user: mockUser,
        onboardingDone: false,
      });
      expect(el.querySelector('a[aria-label="Cook now"]')).toBeNull();
    });

    it('hides the cook-now icon on /recipes/match (the cook-now destination)', async () => {
      const { el } = await setup({
        user: mockUser,
        onboardingDone: true,
        navigateTo: '/recipes/match',
      });
      expect(el.querySelector('a[aria-label="Cook now"]')).toBeNull();
    });

    it('hides the cook-now icon on /login', async () => {
      const { el } = await setup({
        user: mockUser,
        onboardingDone: true,
        navigateTo: '/login',
      });
      expect(el.querySelector('a[aria-label="Cook now"]')).toBeNull();
    });
  });

  describe('user menu items', () => {
    it('exposes an Attributions link when authenticated', async () => {
      const { fixture } = await setup({ user: mockUser });

      const accountBtn = fixture.nativeElement.querySelector(
        'button[aria-label="User menu"]',
      ) as HTMLButtonElement;
      accountBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const link = document.querySelector(
        'a[mat-menu-item][href="/legal/attributions"]',
      );
      expect(link).toBeTruthy();
      expect(link?.textContent).toContain('Attributions');
    });
  });

  describe('behaviour', () => {
    it('calls logout() when sign-out button is clicked', async () => {
      const { fixture, store } = await setup({ user: mockUser });

      const accountBtn = fixture.nativeElement.querySelector(
        'button[aria-label="User menu"]',
      ) as HTMLButtonElement;
      accountBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const logoutBtn = document.querySelector(
        'button[mat-menu-item]:last-of-type',
      ) as HTMLButtonElement | null;
      logoutBtn?.click();

      expect(store.logout).toHaveBeenCalledOnce();
    });
  });
});
