import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';

import { SideNavMenuComponent } from './sidenav-menu.component';

@Component({ template: '' })
class StubPage {}

const routes = [
  { path: '', component: StubPage },
  { path: 'login', component: StubPage },
  { path: 'admin', component: StubPage },
  { path: 'dashboard', component: StubPage },
];

const makeAuthStore = (roles: string[] = []) => ({
  currentUser: signal(null),
  session: signal(
    roles.length ? { uid: 'u1', email: 'u@test.com', roles, amr: [] } : null,
  ),
  loading: signal(false),
  isAuthenticated: signal(roles.length > 0),
  logout: vi.fn(),
});

describe('SideNavMenuComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  const setup = async (roles: string[] = []) => {
    const store = makeAuthStore(roles);
    await TestBed.configureTestingModule({
      imports: [SideNavMenuComponent, StubPage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes),
        { provide: AuthStore, useValue: store },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(SideNavMenuComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  };

  describe('rendering', () => {
    it('shows nav at root URL', async () => {
      const { el } = await setup();
      expect(el.querySelector('nav.sidenav-menu')).toBeTruthy();
    });

    it('shows Home, Dashboard, Recipes items for regular user', async () => {
      const { el } = await setup(['USER']);
      const titles = Array.from(el.querySelectorAll('[matlistitemtitle]')).map(
        (t) => t.textContent?.trim(),
      );
      expect(titles).toContain('Home');
      expect(titles).toContain('Dashboard');
      expect(titles).toContain('Recipes');
    });

    it('does not show Admin item when user has no ADMIN role', async () => {
      const { el } = await setup(['USER']);
      const titles = Array.from(el.querySelectorAll('[matlistitemtitle]')).map(
        (t) => t.textContent?.trim(),
      );
      expect(titles).not.toContain('Admin');
    });

    it('shows Admin item when user has ADMIN role', async () => {
      const { el } = await setup(['USER', 'ADMIN']);
      const titles = Array.from(el.querySelectorAll('[matlistitemtitle]')).map(
        (t) => t.textContent?.trim(),
      );
      expect(titles).toContain('Admin');
    });
  });

  describe('visibility', () => {
    it('hides nav when navigating to /login', async () => {
      const { fixture, el } = await setup();
      const router = TestBed.inject(Router);

      await router.navigate(['/login']);
      fixture.detectChanges();

      expect(el.querySelector('nav.sidenav-menu')).toBeNull();
    });

    it('shows nav on /dashboard', async () => {
      const { fixture, el } = await setup(['USER']);
      const router = TestBed.inject(Router);

      await router.navigate(['/dashboard']);
      fixture.detectChanges();

      expect(el.querySelector('nav.sidenav-menu')).toBeTruthy();
    });
  });
});
