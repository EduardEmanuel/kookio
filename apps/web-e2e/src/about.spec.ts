import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/about', { waitUntil: 'commit' });

  await expect(page.getByText('About Kookio')).toBeVisible();
});

test('has subtitle', async ({ page }) => {
  await page.goto('/about', { waitUntil: 'commit' });

  await expect(
    page.getByText('Minimal SSG page prerendered by Analog'),
  ).toBeVisible();
});
