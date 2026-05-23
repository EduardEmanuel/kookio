import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { signal } from '@angular/core';

import { BreakpointService } from '../../services/breakpoint.service';
import { InstallPromptComponent } from './install-prompt.component';

interface MockPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const createPromptEvent = (
  outcome: 'accepted' | 'dismissed' = 'accepted',
): MockPromptEvent => {
  const event = new Event('beforeinstallprompt') as MockPromptEvent;
  event.prompt = vi.fn().mockResolvedValue(undefined);
  event.userChoice = Promise.resolve({ outcome, platform: 'web' });
  return event;
};

const stubMatchMedia = (standalone = false): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: query.includes('standalone') ? standalone : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe('InstallPromptComponent', () => {
  let mobile: ReturnType<typeof signal<boolean>>;

  const setup = (): ComponentFixture<InstallPromptComponent> => {
    TestBed.configureTestingModule({
      imports: [InstallPromptComponent],
      providers: [
        { provide: BreakpointService, useValue: { isMobile: mobile } },
      ],
    });
    const fixture = TestBed.createComponent(InstallPromptComponent);
    fixture.detectChanges();
    return fixture;
  };

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    mobile = signal(true);
    stubMatchMedia(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    TestBed.resetTestingModule();
    localStorage.clear();
  });

  it('does not show before the 30s delay even if beforeinstallprompt fires', () => {
    const fixture = setup();
    window.dispatchEvent(createPromptEvent());
    vi.advanceTimersByTime(29_000);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.install-prompt')).toBeNull();
  });

  it('shows the prompt 30s after beforeinstallprompt fires on mobile', () => {
    const fixture = setup();
    window.dispatchEvent(createPromptEvent());
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.install-prompt'),
    ).not.toBeNull();
  });

  it('does not show on desktop even after the delay', () => {
    mobile.set(false);
    const fixture = setup();
    window.dispatchEvent(createPromptEvent());
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.install-prompt')).toBeNull();
  });

  it('does not attach listeners when the snooze window is still active', () => {
    localStorage.setItem('kookio-install-snooze', Date.now().toString());
    const fixture = setup();
    window.dispatchEvent(createPromptEvent());
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.install-prompt')).toBeNull();
  });

  it('treats a snooze older than 7 days as expired and shows again', () => {
    const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
    localStorage.setItem('kookio-install-snooze', eightDaysAgo.toString());
    const fixture = setup();
    window.dispatchEvent(createPromptEvent());
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.install-prompt'),
    ).not.toBeNull();
  });

  it('does not attach listeners when already marked installed', () => {
    localStorage.setItem('kookio-install-snooze', 'installed');
    const fixture = setup();
    window.dispatchEvent(createPromptEvent());
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.install-prompt')).toBeNull();
  });

  it('does not attach listeners when display-mode is standalone', () => {
    stubMatchMedia(true);
    const fixture = setup();
    window.dispatchEvent(createPromptEvent());
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.install-prompt')).toBeNull();
  });

  it('snoozes for 7 days when the user dismisses', () => {
    const fixture = setup();
    window.dispatchEvent(createPromptEvent());
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    const dismissBtn = fixture.nativeElement.querySelector(
      'button[aria-label="Dismiss install prompt"]',
    ) as HTMLButtonElement;
    dismissBtn.click();
    const stored = localStorage.getItem('kookio-install-snooze');
    expect(stored).not.toBe('installed');
    expect(Number.isFinite(Number(stored))).toBe(true);
  });

  it('marks installed when the user accepts the OS prompt', async () => {
    const fixture = setup();
    const event = createPromptEvent('accepted');
    window.dispatchEvent(event);
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    const installBtn = [
      ...fixture.nativeElement.querySelectorAll('button'),
    ].find((b) => b.textContent?.trim() === 'Install') as HTMLButtonElement;
    installBtn.click();
    // Let the pending userChoice promise resolve.
    await vi.runAllTimersAsync();
    expect(localStorage.getItem('kookio-install-snooze')).toBe('installed');
  });

  it('snoozes when the user rejects the OS prompt', async () => {
    const fixture = setup();
    const event = createPromptEvent('dismissed');
    window.dispatchEvent(event);
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    const installBtn = [
      ...fixture.nativeElement.querySelectorAll('button'),
    ].find((b) => b.textContent?.trim() === 'Install') as HTMLButtonElement;
    installBtn.click();
    await vi.runAllTimersAsync();
    const stored = localStorage.getItem('kookio-install-snooze');
    expect(stored).not.toBe('installed');
    expect(Number.isFinite(Number(stored))).toBe(true);
  });

  it('marks installed and hides when the appinstalled event fires', () => {
    const fixture = setup();
    window.dispatchEvent(createPromptEvent());
    vi.advanceTimersByTime(30_000);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.install-prompt'),
    ).not.toBeNull();

    window.dispatchEvent(new Event('appinstalled'));
    fixture.detectChanges();

    expect(localStorage.getItem('kookio-install-snooze')).toBe('installed');
    expect(fixture.nativeElement.querySelector('.install-prompt')).toBeNull();
  });

  it('handles onInstall safely when no prompt has been captured', async () => {
    const fixture = setup();
    // Call the install handler directly — bypasses the natural flow where
    // the button only appears after a captured event. Verifies the
    // defensive `if (!prompt) return` branch does not crash and does not
    // mark the app as installed.
    const access = fixture.componentInstance as unknown as {
      onInstall: () => Promise<void>;
    };
    await access.onInstall();
    expect(localStorage.getItem('kookio-install-snooze')).toBeNull();
  });
});
