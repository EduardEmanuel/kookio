import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BreakpointService } from './breakpoint.service';

describe('BreakpointService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    TestBed.resetTestingModule();
  });

  describe('SSR default — server platform, no window', () => {
    it('isMobile() returns false', () => {
      TestBed.configureTestingModule({
        providers: [
          BreakpointService,
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });

      const service = TestBed.inject(BreakpointService);
      expect(service.isMobile()).toBe(false);
    });

    it('isDesktop() returns true', () => {
      TestBed.configureTestingModule({
        providers: [
          BreakpointService,
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });

      const service = TestBed.inject(BreakpointService);
      expect(service.isDesktop()).toBe(true);
    });
  });

  describe('browser platform', () => {
    let onMediaChange:
      | ((e: Pick<MediaQueryListEvent, 'matches'>) => void)
      | undefined;

    beforeEach(() => {
      const mockMq = {
        matches: false,
        addEventListener: vi.fn(
          (
            _type: string,
            listener: (e: Pick<MediaQueryListEvent, 'matches'>) => void,
          ) => {
            onMediaChange = listener;
          },
        ),
      };
      vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mockMq));
      onMediaChange = undefined;
    });

    const createService = (): BreakpointService => {
      TestBed.configureTestingModule({
        providers: [
          BreakpointService,
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      return TestBed.inject(BreakpointService);
    };

    it('isMobile() reflects initial matchMedia result (false)', () => {
      const service = createService();
      expect(service.isMobile()).toBe(false);
    });

    it('isMobile() updates to true when change event fires', () => {
      const service = createService();
      onMediaChange?.({ matches: true });
      expect(service.isMobile()).toBe(true);
    });

    it('isMobile() updates back to false when change event fires', () => {
      const service = createService();
      onMediaChange?.({ matches: true });
      onMediaChange?.({ matches: false });
      expect(service.isMobile()).toBe(false);
    });

    it('isDesktop() is always inverse of isMobile()', () => {
      const service = createService();
      expect(service.isDesktop()).toBe(true);
      onMediaChange?.({ matches: true });
      expect(service.isDesktop()).toBe(false);
    });
  });

  // Regression test for the matchMedia guard added to the constructor:
  // jsdom does not ship matchMedia, so without the guard any TestBed
  // that transitively injects this service would crash with
  // "window.matchMedia is not a function" (caught when the App spec
  // started rendering InstallPromptComponent → BreakpointService).
  describe('browser platform — matchMedia unavailable', () => {
    it('constructs safely and reports desktop when matchMedia is missing', () => {
      TestBed.configureTestingModule({
        providers: [
          BreakpointService,
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });

      const service = TestBed.inject(BreakpointService);
      expect(service.isMobile()).toBe(false);
      expect(service.isDesktop()).toBe(true);
    });
  });
});
