import { test, expect } from '../fixtures/auth.fixture';
import { LoginPage, RegisterPage } from '../pages';

test.describe('Guest guard (authenticated user)', () => {
  test('/login → redirect /', async ({ loggedInPage: page }) => {
    await new LoginPage(page).goto();
    await page.waitForURL((url) => url.pathname === '/');
    expect(new URL(page.url()).pathname).toBe('/');
  });

  test('/register → redirect /', async ({ loggedInPage: page }) => {
    await new RegisterPage(page).goto();
    await page.waitForURL((url) => url.pathname === '/');
    expect(new URL(page.url()).pathname).toBe('/');
  });
});
