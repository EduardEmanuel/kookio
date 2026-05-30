import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/about', { waitUntil: 'commit' });

  await expect(page.getByText('About Kookio')).toBeVisible();
});

test('renders body content below the title', async ({ page }) => {
  await page.goto('/about', { waitUntil: 'commit' });

  // Asserts the real /about content rendered (not just the page title) —
  // the AnalogJS placeholder copy was replaced when the page got real
  // content in batch 6 / T2.
  await expect(
    page.getByRole('heading', { name: 'What it does' }),
  ).toBeVisible();
});
