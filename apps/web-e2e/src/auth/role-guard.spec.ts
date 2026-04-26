import { test, expect } from '../fixtures/auth.fixture';

test.describe('Role guard — USER cannot access /admin', () => {
  test('/admin → redirect /403', async ({ loggedInPage: page }) => {
    await page.goto('/admin');
    await page.waitForURL('/403');
    expect(new URL(page.url()).pathname).toBe('/403');
  });

  test('/403 page displays correct message', async ({ loggedInPage: page }) => {
    await page.goto('/admin');
    await page.waitForURL('/403');

    await expect(page.locator('h1')).toContainText('403');
    await expect(page.locator('p')).toContainText("don't have permission");
  });
});
