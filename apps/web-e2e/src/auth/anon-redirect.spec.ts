import { test, expect } from '@playwright/test';

import { AccountPage, PantryPage } from '../pages';

test.describe('Anon redirect', () => {
  test('redirect /pantry → /login?returnUrl=%2Fpantry', async ({ page }) => {
    await new PantryPage(page).goto();

    await page.waitForURL((url) => url.pathname === '/login');

    const url = new URL(page.url());
    expect(url.pathname).toBe('/login');
    expect(url.searchParams.get('returnUrl')).toBe('/pantry');
  });

  test('redirect /account → /login?returnUrl=%2Faccount', async ({ page }) => {
    await new AccountPage(page).goto();

    await page.waitForURL((url) => url.pathname === '/login');

    const url = new URL(page.url());
    expect(url.pathname).toBe('/login');
    expect(url.searchParams.get('returnUrl')).toBe('/account');
  });
});
