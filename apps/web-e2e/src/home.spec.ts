import { test, expect } from '@playwright/test';

test('redirects / to /recipes and renders the Recipes stub', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'commit' });
  await page.waitForURL((url) => url.pathname === '/recipes');

  await expect(page.locator('.page-stub__title')).toContainText('Recipes');
  await expect(page.locator('.page-stub__subtitle')).toContainText(
    'Browse and discover recipes',
  );
});
