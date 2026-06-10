import { type Page } from '@playwright/test';

/**
 * Shared base for every Page Object. Holds the Playwright `page` handle and
 * the suite-wide navigation convention.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to `path` with `waitUntil: 'commit'`.
   *
   * Required for guarded / SSR routes under Chromium: a route guard's
   * programmatic redirect during hydration aborts a default `load` navigation
   * with `ERR_ABORTED` (see `08_e2e.md` → "Angular SSR + Playwright Chromium").
   * `'commit'` resolves as soon as the response headers arrive, before Angular
   * hydrates, so it is safe for both guarded and plain routes.
   */
  readonly navigateTo = async (path: string): Promise<void> => {
    await this.page.goto(path, { waitUntil: 'commit' });
  };
}
