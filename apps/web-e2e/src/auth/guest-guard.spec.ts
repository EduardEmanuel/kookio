import { test, expect } from '../fixtures/auth.fixture';

test.describe('Guest guard (authenticated user)', () => {
  test('/login → redirect /recipes', async ({ loggedInPage: page }) => {
    await page.goto('/login', { waitUntil: 'commit' });
    await page.waitForURL('/recipes');
    expect(new URL(page.url()).pathname).toBe('/recipes');
  });

  test('/register → redirect /recipes', async ({ loggedInPage: page }) => {
    await page.goto('/register', { waitUntil: 'commit' });
    await page.waitForURL('/recipes');
    expect(new URL(page.url()).pathname).toBe('/recipes');
  });
});
