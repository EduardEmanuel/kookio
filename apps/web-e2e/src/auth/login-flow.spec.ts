import { prisma } from '@kookio/prisma-client/server';

import { test, expect } from '../fixtures/auth.fixture';

test.describe('Login flow + returnUrl', () => {
  test('fresh user logging in with returnUrl=/pantry lands on /onboarding', async ({
    page,
    testUser,
  }) => {
    // 1. Access protected route as anon → redirected to login with returnUrl
    await page.goto('/pantry', { waitUntil: 'commit' });
    await page.waitForURL((url) => url.pathname === '/login');

    const returnUrl = new URL(page.url()).searchParams.get('returnUrl');
    expect(returnUrl).toBe('/pantry');

    // 2. Fill login form (wait for @defer to resolve)
    await page.locator('form').waitFor({ state: 'visible' });
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('[type="submit"]');

    // 3. Login navigates to returnUrl (/pantry), but onboardingGuard
    //    redirects to /onboarding because the fresh user has not completed it.
    await page.waitForURL((url) => url.pathname === '/onboarding');
    expect(new URL(page.url()).pathname).toBe('/onboarding');
  });

  test('user with completed onboarding logs in and lands on returnUrl', async ({
    page,
    testUser,
  }) => {
    // testUser.localId is the Firebase UID, which auth.register stores as User.id.
    // Create the UserProfile directly with onboardingDone=true so the
    // onboardingGuard lets the user through to /pantry after login.
    await prisma.userProfile.create({
      data: { userId: testUser.localId, onboardingDone: true },
    });

    await page.goto('/pantry', { waitUntil: 'commit' });
    await page.waitForURL((url) => url.pathname === '/login');

    await page.locator('form').waitFor({ state: 'visible' });
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('[type="submit"]');

    await page.waitForURL((url) => url.pathname === '/pantry');
    expect(new URL(page.url()).pathname).toBe('/pantry');
  });
});
