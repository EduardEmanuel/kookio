import { test, expect } from '@playwright/test';

test.describe('Anon redirect', () => {
  test('redirect /pantry → /login?returnUrl=%2Fpantry', async ({ page }) => {
    await page.goto('/pantry', { waitUntil: 'commit' });

    await page.waitForURL((url) => url.pathname === '/login');

    const url = new URL(page.url());
    expect(url.pathname).toBe('/login');
    expect(url.searchParams.get('returnUrl')).toBe('/pantry');
  });

  test('redirect /account → /login?returnUrl=%2Faccount', async ({ page }) => {
    await page.goto('/account', { waitUntil: 'commit' });

    await page.waitForURL((url) => url.pathname === '/login');

    const url = new URL(page.url());
    expect(url.pathname).toBe('/login');
    expect(url.searchParams.get('returnUrl')).toBe('/account');
  });
});
