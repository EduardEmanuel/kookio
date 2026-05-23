import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type ThemeMode = 'auto' | 'light' | 'dark';

const STORAGE_KEY = 'kookio-theme';
const VALID_MODES: readonly ThemeMode[] = ['auto', 'light', 'dark'];

const isValidMode = (value: unknown): value is ThemeMode =>
  typeof value === 'string' &&
  (VALID_MODES as readonly string[]).includes(value);

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  readonly mode = signal<ThemeMode>('auto');

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (isValidMode(stored)) {
      this.mode.set(stored);
    }
    // The inline FOUC script in index.html may have already set the class
    // before Angular boots. Re-applying here is idempotent and keeps the
    // DOM in sync with whatever mode() resolves to (including 'auto' when
    // the stored value was missing or invalid — applyClass strips both
    // light/dark classes in that case).
    this.applyClass(this.mode());
  }

  readonly setMode = (value: string): void => {
    if (!isValidMode(value)) return;
    this.mode.set(value);
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(STORAGE_KEY, value);
    this.applyClass(value);
  };

  private readonly applyClass = (mode: ThemeMode): void => {
    const html = this.document.documentElement;
    html.classList.remove('light', 'dark');
    if (mode !== 'auto') html.classList.add(mode);
  };
}
