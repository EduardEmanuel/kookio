import { prisma } from '@kookio/prisma-client/server';

import { LoginPage, PantryPage } from '../pages';
import { test, expect } from '../fixtures/auth.fixture';

test.describe('Login flow + returnUrl', () => {
  test('fresh user logging in with returnUrl=/pantry lands on /onboarding', async ({
    page,
    testUser,
  }) => {
    const loginPage = new LoginPage(page);

    // 1. Access protected route as anon → redirected to login with returnUrl
    await new PantryPage(page).goto();
    await page.waitForURL((url) => url.pathname === '/login');

    const returnUrl = new URL(page.url()).searchParams.get('returnUrl');
    expect(returnUrl).toBe('/pantry');

    // 2. Log in (waits for the @defer'd form internally).
    await loginPage.submit(testUser.email, testUser.password);

    // 3. Login navigates to returnUrl (/pantry), but onboardingGuard
    //    redirects to /onboarding because the fresh user has not completed it.
    await page.waitForURL((url) => url.pathname === '/onboarding');
    expect(new URL(page.url()).pathname).toBe('/onboarding');
  });

  test('user with completed onboarding logs in and lands on returnUrl', async ({
    page,
    testUser,
  }) => {
    const loginPage = new LoginPage(page);

    // testUser.localId is the Firebase UID, which auth.register stores as User.id.
    // Create the UserProfile directly with onboardingDone=true so the
    // onboardingGuard lets the user through to /pantry after login.
    await prisma.userProfile.create({
      data: { userId: testUser.localId, onboardingDone: true },
    });

    await new PantryPage(page).goto();
    await page.waitForURL((url) => url.pathname === '/login');

    await loginPage.submit(testUser.email, testUser.password);

    await page.waitForURL((url) => url.pathname === '/pantry');
    expect(new URL(page.url()).pathname).toBe('/pantry');
  });
});
