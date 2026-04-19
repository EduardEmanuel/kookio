import { test, expect } from '../fixtures/auth.fixture';

test.describe('Login flow + returnUrl', () => {
  test('login redirects back to /pantry', async ({ page, testUser }) => {
    // 1. Access protected route as anon → redirected to login
    await page.goto('/pantry', { waitUntil: 'commit' });
    await page.waitForURL((url) => url.pathname === '/login');

    const returnUrl = new URL(page.url()).searchParams.get('returnUrl');
    expect(returnUrl).toBe('/pantry');

    // 2. Fill login form (wait for @defer to resolve)
    await page.locator('form').waitFor({ state: 'visible' });
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('[type="submit"]');

    // 3. Verify redirect back to /pantry
    await page.waitForURL('/pantry');
    expect(new URL(page.url()).pathname).toBe('/pantry');
  });
});
