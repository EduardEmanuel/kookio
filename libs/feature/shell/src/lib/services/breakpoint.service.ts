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
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const mq = window.matchMedia(this.MOBILE_BREAKPOINT);
      mq.addEventListener('change', (e) => this.mobileMatch.set(e.matches));
    }
  }
}
