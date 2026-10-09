import { test, expect } from '@playwright/test';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import { prisma } from '@kookio/prisma-client/server';
import { TRPC_PATH, TRPC_TRANSFORMER } from '@kookio/server-trpc/configs';
import type { AppRouter } from '@kookio/server-trpc/types';

import { RegisterPage } from '../pages';
import {
  uniqueEmail,
  TEST_PASSWORD,
  firebaseSignIn,
  firebaseDeleteUser,
} from '../fixtures/auth.fixture';

const BASE_URL = process.env['BASE_URL'] ?? 'http://localhost:4200';

test.describe('Register flow', () => {
  test('new user registers, is provisioned in DB and redirected to onboarding', async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const email = uniqueEmail();

    // 1. Register (navigates to /register and waits for the @defer'd form).
    await registerPage.goto();
    await registerPage.submit(email, TEST_PASSWORD);

    // 2. A freshly registered user is never onboarded, so register.page sends
    //    them into the onboarding wizard (the onboardingGuard would bounce them
    //    there anyway).
    await page.waitForURL((url) => url.pathname === '/onboarding');
    expect(new URL(page.url()).pathname).toBe('/onboarding');

    // 3. Verify user exists in DB via tRPC auth.me
    const { idToken } = await firebaseSignIn(email, TEST_PASSWORD);
    const url = new URL(TRPC_PATH, BASE_URL).toString();
    const trpc = createTRPCProxyClient<AppRouter>({
      transformer: TRPC_TRANSFORMER,
      links: [
        httpBatchLink({
          url,
          headers: { Authorization: `Bearer ${idToken}` },
        }),
      ],
    });
    const session = await trpc.auth.me.query();
    expect(session.email).toBe(email);

    // 4. Cleanup
    await prisma.user.deleteMany({ where: { email } });
    await firebaseDeleteUser(idToken);
  });
});
