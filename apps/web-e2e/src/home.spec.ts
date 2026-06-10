import { test, expect } from '@playwright/test';

import { HomePage } from './pages';

test('/ renders the recipes feed directly (no redirect)', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  // / now hosts the feed itself rather than redirecting to /recipes; the URL
  // must stay on /. Allow Angular hydration a beat to settle before asserting.
  await page.waitForLoadState('domcontentloaded');
  expect(new URL(page.url()).pathname).toBe('/');

  // The feed region is the canonical anchor — present whether the DB has
  // seeded recipes (cards) or not (empty state).
  await expect(homePage.feed).toBeVisible();
});
