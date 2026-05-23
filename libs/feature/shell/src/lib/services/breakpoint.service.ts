import { isPlatformBrowser } from '@angular/common';
import {
  PLATFORM_ID,
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  // ⚠ Must stay in sync with `$mobile-max-width` in
  // `libs/shared/ui/src/styles/_breakpoints.scss`. The SCSS partial is
  // the source of truth at compile time (used by component @media
  // queries via `@include bp.mobile`); this string is the same value
  // used at runtime via `window.matchMedia(...)`. A drift produces
  // breakpoints that look right in DevTools but disagree with
  // `bp.isMobile()` in component logic.
  private readonly MOBILE_BREAKPOINT = '(max-width: 767.98px)';

  private readonly checkMobile = (): boolean => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    )
      return false;
    return window.matchMedia(this.MOBILE_BREAKPOINT).matches;
  };

  private readonly mobileMatch = signal(this.checkMobile());

  readonly isMobile = this.mobileMatch.asReadonly();
  readonly isDesktop = computed(() => !this.isMobile());

  constructor() {
    // The matchMedia guard mirrors `checkMobile` above — jsdom (test env)
    // does not ship matchMedia, so the constructor would otherwise crash
    // any TestBed that transitively injects this service.
    if (
      isPlatformBrowser(inject(PLATFORM_ID)) &&
      typeof window.matchMedia === 'function'
    ) {
      const mq = window.matchMedia(this.MOBILE_BREAKPOINT);
      mq.addEventListener('change', (e) => this.mobileMatch.set(e.matches));
    }
  }
}
