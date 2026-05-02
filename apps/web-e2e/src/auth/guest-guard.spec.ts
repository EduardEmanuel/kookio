import { test, expect } from '../fixtures/auth.fixture';

test.describe('Guest guard (authenticated user)', () => {
  test('/login → redirect /', async ({ loggedInPage: page }) => {
    await page.goto('/login', { waitUntil: 'commit' });
    await page.waitForURL((url) => url.pathname === '/');
    expect(new URL(page.url()).pathname).toBe('/');
  });

  test('/register → redirect /', async ({ loggedInPage: page }) => {
    await page.goto('/register', { waitUntil: 'commit' });
    await page.waitForURL((url) => url.pathname === '/');
    expect(new URL(page.url()).pathname).toBe('/');
  });
});
