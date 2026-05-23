import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { KookioIconComponent } from '@kookio/shared-ui';

import { BreakpointService } from '../../services/breakpoint.service';

// `beforeinstallprompt` is a Chromium-specific event not in lib.dom.d.ts.
// The event also exists in modern Firefox/Edge but is omitted from the
// standard typings; we declare the minimal surface we use.
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: ReadonlyArray<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const STORAGE_KEY = 'kookio-install-snooze';
const SNOOZE_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 30_000;
const INSTALLED_SENTINEL = 'installed';

@Component({
  selector: 'kookio-install-prompt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, KookioIconComponent],
  templateUrl: './install-prompt.component.html',
  styleUrl: './install-prompt.component.scss',
})
export class InstallPromptComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly breakpoint = inject(BreakpointService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly visible = signal(false);
  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Already installed (running as PWA), already dismissed, or in a
    // recent snooze window — nothing to do for this session.
    if (this.isStandalone() || this.isInstalled() || this.isSnoozed()) return;

    const win = this.document.defaultView;
    if (!win) return;

    const onBeforeInstall = (event: Event): void => {
      // Stop the browser from showing its own automatic mini-infobar so
      // the deferred prompt is ours to fire later.
      event.preventDefault();
      this.deferredPrompt = event as BeforeInstallPromptEvent;
      win.setTimeout(() => {
        // Re-check guards in case the user installed via the browser's
        // own UI, or the viewport widened to desktop, during the delay.
        if (
          this.breakpoint.isMobile() &&
          !this.isStandalone() &&
          !this.isInstalled() &&
          !this.isSnoozed()
        ) {
          this.visible.set(true);
        }
      }, SHOW_DELAY_MS);
    };

    const onAppInstalled = (): void => {
      this.markInstalled();
      this.deferredPrompt = null;
      this.visible.set(false);
    };

    win.addEventListener('beforeinstallprompt', onBeforeInstall);
    win.addEventListener('appinstalled', onAppInstalled);

    this.destroyRef.onDestroy(() => {
      win.removeEventListener('beforeinstallprompt', onBeforeInstall);
      win.removeEventListener('appinstalled', onAppInstalled);
    });
  }

  protected readonly onInstall = async (): Promise<void> => {
    const prompt = this.deferredPrompt;
    if (!prompt) {
      this.visible.set(false);
      return;
    }
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') {
      this.markInstalled();
    } else {
      this.snooze();
    }
    this.deferredPrompt = null;
    this.visible.set(false);
  };

  protected readonly onDismiss = (): void => {
    this.snooze();
    this.visible.set(false);
  };

  // `display-mode: standalone` matches when the page is currently being
  // rendered as an installed PWA — the surest signal for "already installed".
  private readonly isStandalone = (): boolean => {
    const win = this.document.defaultView;
    if (!win || typeof win.matchMedia !== 'function') return false;
    return win.matchMedia('(display-mode: standalone)').matches;
  };

  private readonly isInstalled = (): boolean =>
    this.readStorage() === INSTALLED_SENTINEL;

  private readonly isSnoozed = (): boolean => {
    const value = this.readStorage();
    if (value === null || value === INSTALLED_SENTINEL) return false;
    const snoozedAt = Number(value);
    if (!Number.isFinite(snoozedAt)) return false;
    return Date.now() - snoozedAt < SNOOZE_DURATION_MS;
  };

  private readonly snooze = (): void => {
    this.writeStorage(Date.now().toString());
  };

  private readonly markInstalled = (): void => {
    this.writeStorage(INSTALLED_SENTINEL);
  };

  private readonly readStorage = (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      // Safari private mode + some embedded WebViews throw on .getItem.
      return null;
    }
  };

  private readonly writeStorage = (value: string): void => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* see readStorage */
    }
  };
}
