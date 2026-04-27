import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import type { AuthSession } from '@kookio/prisma-client';
import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { SideNavMenuComponent } from './sidenav-menu.component';

@Component({ template: '' })
class StubPage {}

const routes = [
  { path: '', component: StubPage },
  { path: 'login', component: StubPage },
  { path: 'admin', component: StubPage },
  { path: 'dashboard', component: StubPage },
];

const sessionWithRoles = (roles: string[]): AuthSession | null =>
  roles.length
    ? ({
        uid: 'u1',
        email: 'u@test.com',
        roles,
        amr: [],
      } as unknown as AuthSession)
    : null;

describe('SideNavMenuComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  const setup = async (roles: string[] = []) => {
    const store = createMockAuthStore({
      session: sessionWithRoles(roles),
      isAuthenticated: roles.length > 0,
    });
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

    it('shows Home and Dashboard items for regular user', async () => {
      const { el } = await setup(['USER']);
      const titles = Array.from(el.querySelectorAll('[matlistitemtitle]')).map(
        (t) => t.textContent?.trim(),
      );
      expect(titles).toContain('Home');
      expect(titles).toContain('Dashboard');
      expect(titles).not.toContain('Recipes');
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
