import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/about', { waitUntil: 'commit' });

  await expect(page.locator('h1')).toContainText('About Kookio');
});

test('has paragraph', async ({ page }) => {
  await page.goto('/about', { waitUntil: 'commit' });

  await expect(page.locator('p')).toContainText(
    'Minimal SSG page prerendered by Analog.',
  );
});
