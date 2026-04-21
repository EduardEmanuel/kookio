import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import type { User } from 'firebase/auth';

import { AuthStore } from '@kookio/feature-auth';

import { TopBarComponent } from './top-bar.component';

const mockUser = { uid: 'u1', email: 'user@test.com' } as User;

const makeAuthStore = (user: User | null = null) => ({
  currentUser: signal<User | null>(user),
  session: signal(null),
  loading: signal(false),
  isAuthenticated: signal(!!user),
  logout: vi.fn(),
});

describe('TopBarComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  const setup = async (user: User | null = null) => {
    const store = makeAuthStore(user);
    await TestBed.configureTestingModule({
      imports: [TopBarComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: AuthStore, useValue: store },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TopBarComponent);
    fixture.detectChanges();
    return { fixture, store, el: fixture.nativeElement as HTMLElement };
  };

  describe('rendering', () => {
    it('shows the Kookio brand name', async () => {
      const { el } = await setup();
      expect(el.querySelector('.topbar__brand')?.textContent?.trim()).toBe(
        'Kookio',
      );
    });

    it('shows login link when not authenticated', async () => {
      const { el } = await setup(null);
      expect(el.querySelector('a[href="/login"]')).toBeTruthy();
    });

    it('does not show login link when authenticated', async () => {
      const { el } = await setup(mockUser);
      expect(el.querySelector('a[href="/login"]')).toBeNull();
    });

    it('shows account button when authenticated', async () => {
      const { el } = await setup(mockUser);
      const icons = Array.from(el.querySelectorAll('mat-icon'));
      expect(
        icons.some((i) => i.textContent?.trim() === 'account_circle'),
      ).toBe(true);
    });

    it('shows search button always', async () => {
      const { el } = await setup(null);
      const icons = Array.from(el.querySelectorAll('mat-icon'));
      expect(icons.some((i) => i.textContent?.trim() === 'search')).toBe(true);
    });
  });

  describe('behaviour', () => {
    it('calls logout() when deconectare button is clicked', async () => {
      const { fixture, store } = await setup(mockUser);

      const accountBtn = fixture.nativeElement.querySelector(
        'button[aria-label="Cont"]',
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
