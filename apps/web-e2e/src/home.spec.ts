import { test, expect } from '@playwright/test';

test('renders home page stub', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.page-stub__title')).toContainText('Home');
  await expect(page.locator('.page-stub__subtitle')).toContainText(
    'Public recipe feed',
  );
});
