import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import type { User } from 'firebase/auth';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { ThemeService } from '../../services/theme.service';
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

    it('exposes an About link when authenticated', async () => {
      const { fixture } = await setup({ user: mockUser });

      const accountBtn = fixture.nativeElement.querySelector(
        'button[aria-label="User menu"]',
      ) as HTMLButtonElement;
      accountBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const link = document.querySelector('a[mat-menu-item][href="/about"]');
      expect(link).toBeTruthy();
      expect(link?.textContent).toContain('About');
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

  describe('theme switcher', () => {
    // Bracket-access helper: the handlers + computed are `protected` for
    // template use; tests reach them via this typed interface to avoid
    // `any` casts that the lint config flags.
    interface ThemeTestAccess {
      onAutoChange: (checked: boolean) => void;
      onSliderChange: (checked: boolean) => void;
      isDarkActive: () => boolean;
    }
    const access = (
      fixture: ComponentFixture<TopBarComponent>,
    ): ThemeTestAccess =>
      fixture.componentInstance as unknown as ThemeTestAccess;

    // jsdom does not ship matchMedia; stub it so the systemPrefersDark
    // helper inside TopBarComponent returns a deterministic value.
    const stubMatchMedia = (prefersDark: boolean): void => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: vi.fn(() => ({
          matches: prefersDark,
          media: '(prefers-color-scheme: dark)',
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    };

    const themeTriggerIcon = (el: HTMLElement): string | null => {
      const trigger = el.querySelector('button[aria-label="Theme"]');
      return trigger?.querySelector('mat-icon')?.textContent?.trim() ?? null;
    };

    beforeEach(() => {
      localStorage.clear();
      document.documentElement.classList.remove('light', 'dark');
      stubMatchMedia(false); // default: system prefers light
    });

    describe('trigger icon', () => {
      it('renders settings_suggest for the auto default', async () => {
        const { el } = await setup({ user: mockUser });
        expect(themeTriggerIcon(el)).toBe('settings_suggest');
      });

      it('renders light_mode when mode is light', async () => {
        localStorage.setItem('kookio-theme', 'light');
        const { el } = await setup({ user: mockUser });
        expect(themeTriggerIcon(el)).toBe('light_mode');
      });

      it('renders dark_mode when mode is dark', async () => {
        localStorage.setItem('kookio-theme', 'dark');
        const { el } = await setup({ user: mockUser });
        expect(themeTriggerIcon(el)).toBe('dark_mode');
      });
    });

    describe('onAutoChange', () => {
      it('sets mode to auto when checking the checkbox', async () => {
        localStorage.setItem('kookio-theme', 'dark');
        const { fixture } = await setup({ user: mockUser });
        access(fixture).onAutoChange(true);
        expect(TestBed.inject(ThemeService).mode()).toBe('auto');
      });

      it('seeds with light when unchecking and system prefers light', async () => {
        const { fixture } = await setup({ user: mockUser });
        access(fixture).onAutoChange(false);
        expect(TestBed.inject(ThemeService).mode()).toBe('light');
      });

      it('seeds with dark when unchecking and system prefers dark', async () => {
        stubMatchMedia(true);
        const { fixture } = await setup({ user: mockUser });
        access(fixture).onAutoChange(false);
        expect(TestBed.inject(ThemeService).mode()).toBe('dark');
      });
    });

    describe('onSliderChange', () => {
      it('sets mode to dark when slider toggled on', async () => {
        const { fixture } = await setup({ user: mockUser });
        access(fixture).onSliderChange(true);
        expect(TestBed.inject(ThemeService).mode()).toBe('dark');
      });

      it('sets mode to light when slider toggled off', async () => {
        localStorage.setItem('kookio-theme', 'dark');
        const { fixture } = await setup({ user: mockUser });
        access(fixture).onSliderChange(false);
        expect(TestBed.inject(ThemeService).mode()).toBe('light');
      });
    });

    describe('isDarkActive', () => {
      it('is true when mode is dark', async () => {
        localStorage.setItem('kookio-theme', 'dark');
        const { fixture } = await setup({ user: mockUser });
        expect(access(fixture).isDarkActive()).toBe(true);
      });

      it('is false when mode is light', async () => {
        localStorage.setItem('kookio-theme', 'light');
        const { fixture } = await setup({ user: mockUser });
        expect(access(fixture).isDarkActive()).toBe(false);
      });

      it('reflects light system preference when mode is auto', async () => {
        stubMatchMedia(false);
        const { fixture } = await setup({ user: mockUser });
        expect(access(fixture).isDarkActive()).toBe(false);
      });

      it('reflects dark system preference when mode is auto', async () => {
        stubMatchMedia(true);
        const { fixture } = await setup({ user: mockUser });
        expect(access(fixture).isDarkActive()).toBe(true);
      });
    });
  });
});
