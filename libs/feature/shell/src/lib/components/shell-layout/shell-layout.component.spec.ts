import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { BreakpointService } from '../../services/breakpoint.service';

import { ShellLayoutComponent } from './shell-layout.component';

@Component({ template: '' })
class StubPage {}

describe('ShellLayoutComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  const setup = async (isMobile: boolean, navigateTo?: string) => {
    const bp = { isMobile: signal(isMobile), isDesktop: signal(!isMobile) };
    await TestBed.configureTestingModule({
      imports: [ShellLayoutComponent, StubPage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([
          { path: 'onboarding', component: StubPage },
          { path: 'login', component: StubPage },
          { path: '**', component: StubPage },
        ]),
        { provide: BreakpointService, useValue: bp },
        { provide: AuthStore, useValue: createMockAuthStore() },
      ],
    }).compileComponents();

    if (navigateTo) {
      await TestBed.inject(Router).navigateByUrl(navigateTo);
    }

    const fixture = TestBed.createComponent(ShellLayoutComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  };

  describe('mobile layout', () => {
    it('applies shell--mobile class', async () => {
      const { el } = await setup(true);
      expect(el.querySelector('.shell--mobile')).toBeTruthy();
    });

    it('renders bottom-tabs', async () => {
      const { el } = await setup(true);
      expect(el.querySelector('kookio-bottom-tabs')).toBeTruthy();
    });

    it('does not render mat-sidenav-container', async () => {
      const { el } = await setup(true);
      expect(el.querySelector('mat-sidenav-container')).toBeNull();
    });
  });

  describe('desktop layout', () => {
    it('applies shell--desktop class', async () => {
      const { el } = await setup(false);
      expect(el.querySelector('.shell--desktop')).toBeTruthy();
    });

    it('renders mat-sidenav-container', async () => {
      const { el } = await setup(false);
      expect(el.querySelector('mat-sidenav-container')).toBeTruthy();
    });

    it('does not render bottom-tabs', async () => {
      const { el } = await setup(false);
      expect(el.querySelector('kookio-bottom-tabs')).toBeNull();
    });
  });

  it('always renders top-bar', async () => {
    const { el: elMobile } = await setup(true);
    expect(elMobile.querySelector('kookio-top-bar')).toBeTruthy();

    TestBed.resetTestingModule();

    const { el: elDesktop } = await setup(false);
    expect(elDesktop.querySelector('kookio-top-bar')).toBeTruthy();
  });

  describe('auth routes (onboarding/login/register)', () => {
    it('hides the desktop sidenav on /onboarding to reclaim space', async () => {
      const { el } = await setup(false, '/onboarding');
      expect(el.querySelector('mat-sidenav')).toBeNull();
      expect(el.querySelector('kookio-sidenav-menu')).toBeNull();
      // mat-sidenav-container still wraps the main content
      expect(el.querySelector('mat-sidenav-container')).toBeTruthy();
      expect(el.querySelector('router-outlet')).toBeTruthy();
    });

    it('hides the desktop sidenav on /login', async () => {
      const { el } = await setup(false, '/login');
      expect(el.querySelector('kookio-sidenav-menu')).toBeNull();
    });

    it('keeps the desktop sidenav visible on regular routes', async () => {
      const { el } = await setup(false, '/');
      expect(el.querySelector('kookio-sidenav-menu')).toBeTruthy();
    });
  });
});
