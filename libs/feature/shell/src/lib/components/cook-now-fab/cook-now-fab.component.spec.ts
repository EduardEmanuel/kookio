import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  Component,
  type WritableSignal,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';

import { BreakpointService } from '../../services/breakpoint.service';

import { CookNowFabComponent } from './cook-now-fab.component';

@Component({ template: '' })
class StubPage {}

const routes = [
  { path: '', component: StubPage },
  { path: 'login', component: StubPage },
  { path: 'register', component: StubPage },
  { path: 'onboarding', component: StubPage },
  { path: 'dashboard', component: StubPage },
  { path: 'pantry', component: StubPage },
  { path: 'recipes/match', component: StubPage },
  { path: '404', component: StubPage },
  { path: '403', component: StubPage },
];

type FakeUser = { uid: string };

interface SetupOptions {
  user?: FakeUser | null;
  onboardingDone?: boolean;
  isMobile?: boolean;
}

interface SetupHandles {
  fixture: ReturnType<typeof TestBed.createComponent<CookNowFabComponent>>;
  el: HTMLElement;
  router: Router;
  currentUser: WritableSignal<FakeUser | null>;
  onboardingDone: WritableSignal<boolean>;
  isMobile: WritableSignal<boolean>;
}

const setup = async (opts: SetupOptions = {}): Promise<SetupHandles> => {
  const currentUser = signal<FakeUser | null>(opts.user ?? null);
  const onboardingDone = signal(opts.onboardingDone ?? false);
  const isMobile = signal(opts.isMobile ?? true);

  const authStore = { currentUser, onboardingDone };
  const bp = { isMobile, isDesktop: signal(!isMobile()) };

  await TestBed.configureTestingModule({
    imports: [CookNowFabComponent, StubPage],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter(routes),
      { provide: AuthStore, useValue: authStore },
      { provide: BreakpointService, useValue: bp },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(CookNowFabComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    router: TestBed.inject(Router),
    currentUser,
    onboardingDone,
    isMobile,
  };
};

const fab = (el: HTMLElement) => el.querySelector('a.cook-now-fab');

describe('CookNowFabComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('visibility matrix', () => {
    it('hides for anonymous user at /', async () => {
      const { el } = await setup({ user: null, onboardingDone: false });
      expect(fab(el)).toBeNull();
    });

    it('hides for authenticated user with onboarding incomplete at /', async () => {
      const { el } = await setup({
        user: { uid: 'u1' },
        onboardingDone: false,
      });
      expect(fab(el)).toBeNull();
    });

    it('shows for authenticated user with onboarding done at /', async () => {
      const { el } = await setup({ user: { uid: 'u1' }, onboardingDone: true });
      expect(fab(el)).toBeTruthy();
    });

    it('hides at /login even when authenticated', async () => {
      const { fixture, el, router } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
      });
      await router.navigate(['/login']);
      fixture.detectChanges();
      expect(fab(el)).toBeNull();
    });

    it('hides at /dashboard (the navigation target itself)', async () => {
      const { fixture, el, router } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
      });
      await router.navigate(['/dashboard']);
      fixture.detectChanges();
      expect(fab(el)).toBeNull();
    });

    it('shows at /pantry', async () => {
      const { fixture, el, router } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
      });
      await router.navigate(['/pantry']);
      fixture.detectChanges();
      expect(fab(el)).toBeTruthy();
    });

    it('shows at /recipes/match', async () => {
      const { fixture, el, router } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
      });
      await router.navigate(['/recipes/match']);
      fixture.detectChanges();
      expect(fab(el)).toBeTruthy();
    });

    it('hides at /onboarding', async () => {
      const { fixture, el, router } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
      });
      await router.navigate(['/onboarding']);
      fixture.detectChanges();
      expect(fab(el)).toBeNull();
    });
  });

  describe('reactive transitions', () => {
    it('hides when navigating from a visible to a hidden route', async () => {
      const { fixture, el, router } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
      });
      await router.navigate(['/pantry']);
      fixture.detectChanges();
      expect(fab(el)).toBeTruthy();

      await router.navigate(['/login']);
      fixture.detectChanges();
      expect(fab(el)).toBeNull();
    });

    it('appears when onboardingDone flips from false to true', async () => {
      const { fixture, el, onboardingDone } = await setup({
        user: { uid: 'u1' },
        onboardingDone: false,
      });
      expect(fab(el)).toBeNull();

      onboardingDone.set(true);
      fixture.detectChanges();
      expect(fab(el)).toBeTruthy();
    });
  });

  describe('responsive label', () => {
    it('renders without label on mobile (icon-only FAB)', async () => {
      const { el } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
        isMobile: true,
      });
      const link = fab(el);
      expect(link).toBeTruthy();
      expect(link?.querySelector('.cook-now-fab__label')).toBeNull();
    });

    it('renders with label on desktop (extended FAB)', async () => {
      const { el } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
        isMobile: false,
      });
      const link = fab(el);
      expect(link).toBeTruthy();
      expect(
        link?.querySelector('.cook-now-fab__label')?.textContent,
      ).toContain('Cook now');
    });
  });

  describe('a11y & link target', () => {
    it('exposes an aria-label and tooltip with the action name', async () => {
      const { el } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
      });
      const link = fab(el);
      expect(link?.getAttribute('aria-label')).toBe('Cook now');
    });

    it('points to /dashboard', async () => {
      const { el } = await setup({
        user: { uid: 'u1' },
        onboardingDone: true,
      });
      const link = fab(el) as HTMLAnchorElement | null;
      expect(link?.getAttribute('href')).toBe('/dashboard');
    });
  });
});
