import { test, expect } from '@playwright/test';

test('/ renders the recipes feed directly (no redirect)', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit' });

  // / now hosts the feed itself rather than redirecting to /recipes; the URL
  // must stay on /. Allow Angular hydration a beat to settle before asserting.
  await page.waitForLoadState('domcontentloaded');
  expect(new URL(page.url()).pathname).toBe('/');

  // The feed component is the canonical anchor — present whether the DB has
  // seeded recipes (cards) or not (empty state).
  await expect(page.locator('kookio-recipes-feed')).toBeVisible();
});
