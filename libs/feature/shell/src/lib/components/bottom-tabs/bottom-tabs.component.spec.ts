import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { Component } from '@angular/core';

import { BottomTabsComponent } from './bottom-tabs.component';

@Component({ template: '' })
class StubPage {}

const routes = [
  { path: '', component: StubPage },
  { path: 'login', component: StubPage },
  { path: 'register', component: StubPage },
  { path: 'recipes', component: StubPage },
];

describe('BottomTabsComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [BottomTabsComponent, StubPage],
      providers: [provideZonelessChangeDetection(), provideRouter(routes)],
    }).compileComponents();

    const fixture = TestBed.createComponent(BottomTabsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  };

  describe('rendering', () => {
    it('shows nav at root URL', async () => {
      const { el } = await setup();
      expect(el.querySelector('nav.bottom-tabs')).toBeTruthy();
    });

    it('renders 5 tab items', async () => {
      const { el } = await setup();
      expect(el.querySelectorAll('.bottom-tabs__item').length).toBe(5);
    });

    it('renders tab labels', async () => {
      const { el } = await setup();
      const labels = Array.from(el.querySelectorAll('.bottom-tabs__label')).map(
        (l) => l.textContent?.trim(),
      );
      expect(labels).toContain('Home');
      expect(labels).toContain('Pantry');
      expect(labels).toContain('Account');
    });
  });

  describe('visibility', () => {
    it('hides nav when navigating to /login', async () => {
      const { fixture, el } = await setup();
      const router = TestBed.inject(Router);

      await router.navigate(['/login']);
      fixture.detectChanges();

      expect(el.querySelector('nav.bottom-tabs')).toBeNull();
    });

    it('hides nav when navigating to /register', async () => {
      const { fixture, el } = await setup();
      const router = TestBed.inject(Router);

      await router.navigate(['/register']);
      fixture.detectChanges();

      expect(el.querySelector('nav.bottom-tabs')).toBeNull();
    });

    it('shows nav when navigating to /recipes', async () => {
      const { fixture, el } = await setup();
      const router = TestBed.inject(Router);

      await router.navigate(['/recipes']);
      fixture.detectChanges();

      expect(el.querySelector('nav.bottom-tabs')).toBeTruthy();
    });
  });
});
