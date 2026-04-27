import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { BreakpointService } from '../../services/breakpoint.service';

import { ShellLayoutComponent } from './shell-layout.component';

@Component({ template: '' })
class StubPage {}

const makeAuthStore = () => ({
  currentUser: signal(null),
  session: signal(null),
  loading: signal(false),
  isAuthenticated: signal(false),
  onboardingDone: signal(false),
  logout: vi.fn(),
});

describe('ShellLayoutComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  const setup = async (isMobile: boolean) => {
    const bp = { isMobile: signal(isMobile), isDesktop: signal(!isMobile) };
    await TestBed.configureTestingModule({
      imports: [ShellLayoutComponent, StubPage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: '**', component: StubPage }]),
        { provide: BreakpointService, useValue: bp },
        { provide: AuthStore, useValue: makeAuthStore() },
      ],
    }).compileComponents();

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

  it('mounts the cook-now FAB on both layouts', async () => {
    const { el: elMobile } = await setup(true);
    expect(elMobile.querySelector('kookio-cook-now-fab')).toBeTruthy();

    TestBed.resetTestingModule();

    const { el: elDesktop } = await setup(false);
    expect(elDesktop.querySelector('kookio-cook-now-fab')).toBeTruthy();
  });
});
