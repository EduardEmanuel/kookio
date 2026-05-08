import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { SideNavMenuComponent } from './sidenav-menu.component';

@Component({ template: '' })
class StubPage {}

const routes = [
  { path: '', component: StubPage },
  { path: 'login', component: StubPage },
  { path: 'dashboard', component: StubPage },
];

describe('SideNavMenuComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavMenuComponent, StubPage],
      providers: [provideZonelessChangeDetection(), provideRouter(routes)],
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

    it('renders the canonical destinations in order', async () => {
      const { el } = await setup();
      const titles = Array.from(el.querySelectorAll('[matlistitemtitle]')).map(
        (t) => t.textContent?.trim(),
      );
      expect(titles).toEqual([
        'Dashboard',
        'Saved',
        'Pantry',
        'Plan',
        'Groceries',
      ]);
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
      const { fixture, el } = await setup();
      const router = TestBed.inject(Router);

      await router.navigate(['/dashboard']);
      fixture.detectChanges();

      expect(el.querySelector('nav.sidenav-menu')).toBeTruthy();
    });
  });
});
