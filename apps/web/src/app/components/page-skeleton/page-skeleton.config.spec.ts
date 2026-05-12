import { describe, expect, it } from 'vitest';
import { URLS } from '@kookio/feature-shell';
import { PAGE_SKELETONS } from './page-skeleton.config';

describe('PAGE_SKELETONS', () => {
  it('has an entry for every auth-related route', () => {
    const expectedRoutes = [
      URLS.LOGIN,
      URLS.REGISTER,
      URLS.PANTRY,
      URLS.ACCOUNT,
    ];
    for (const route of expectedRoutes) {
      expect(
        PAGE_SKELETONS[route],
        `missing config for ${route}`,
      ).toBeDefined();
    }
  });

  it('each entry has a positive count', () => {
    for (const [route, cfg] of Object.entries(PAGE_SKELETONS)) {
      expect(cfg.count, `count for ${route} must be > 0`).toBeGreaterThan(0);
    }
  });

  it('has distinct counts per route (configs are not identical)', () => {
    const counts = Object.values(PAGE_SKELETONS).map((c) => c.count);
    const unique = new Set(counts);
    expect(unique.size).toBeGreaterThan(1);
  });

  it('returns undefined for an unknown route', () => {
    expect(PAGE_SKELETONS['/nonexistent']).toBeUndefined();
  });
});
