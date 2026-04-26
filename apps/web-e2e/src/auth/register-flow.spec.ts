import { test, expect } from '@playwright/test';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import { prisma } from '@kookio/prisma-client';
import { TRPC_PATH, TRPC_TRANSFORMER } from '@kookio/server-trpc/configs';
import type { AppRouter } from '@kookio/server-trpc/types';

import {
  uniqueEmail,
  TEST_PASSWORD,
  firebaseSignIn,
  firebaseDeleteUser,
} from '../fixtures/auth.fixture';

const BASE_URL = process.env['BASE_URL'] ?? 'http://localhost:4200';

test.describe('Register flow', () => {
  test('new user registers, is provisioned in DB and redirected home', async ({
    page,
  }) => {
    const email = uniqueEmail();

    // 1. Navigate to register
    await page.goto('/register', { waitUntil: 'commit' });
    await page.locator('form').waitFor({ state: 'visible' });

    // 2. Fill register form
    await page.fill('[name="email"]', email);
    await page.fill('[name="password"]', TEST_PASSWORD);
    await page.fill('[name="confirm"]', TEST_PASSWORD);
    await page.click('[type="submit"]');

    // 3. Verify redirect to home
    await page.waitForURL('/');
    expect(new URL(page.url()).pathname).toBe('/');

    // 4. Verify user exists in DB via tRPC auth.me
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

    // 5. Cleanup
    await prisma.user.deleteMany({ where: { email } });
    await firebaseDeleteUser(idToken);
  });
});
