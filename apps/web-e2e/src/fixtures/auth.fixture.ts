import { test as base, type Page } from '@playwright/test';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import { prisma } from '@kookio/prisma-client';
import { TRPC_PATH, TRPC_TRANSFORMER } from '@kookio/server-trpc/configs';
import type { AppRouter } from '@kookio/server-trpc/types';

const FIREBASE_API_KEY = process.env['NG_APP_FIREBASE_API_KEY'] ?? '';
const BASE_URL = process.env['BASE_URL'] ?? 'http://localhost:4200';
const FIREBASE_BASE = 'https://identitytoolkit.googleapis.com/v1/accounts';

// ─── Firebase REST helpers ────────────────────────────────────────────────────

export type FirebaseTokens = { localId: string; idToken: string };

export const firebaseSignUp = async (
  email: string,
  password: string,
): Promise<FirebaseTokens> => {
  const res = await fetch(`${FIREBASE_BASE}:signUp?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  if (!res.ok) throw new Error(`Firebase signUp failed: ${await res.text()}`);
  return res.json() as Promise<FirebaseTokens>;
};

export const firebaseSignIn = async (
  email: string,
  password: string,
): Promise<FirebaseTokens> => {
  const res = await fetch(
    `${FIREBASE_BASE}:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    },
  );
  if (!res.ok) throw new Error(`Firebase signIn failed: ${await res.text()}`);
  return res.json() as Promise<FirebaseTokens>;
};

export const firebaseDeleteUser = async (idToken: string): Promise<void> => {
  const res = await fetch(`${FIREBASE_BASE}:delete?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) throw new Error(`Firebase delete failed: ${await res.text()}`);
};

// ─── tRPC helper ─────────────────────────────────────────────────────────────

export const provisionDbUser = async (
  email: string,
  firebaseUid: string,
  idToken: string,
): Promise<void> => {
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
  await trpc.auth.register.mutate({ email, firebaseUid });
};

// ─── Cleanup helper ───────────────────────────────────────────────────────────

export const cleanupUser = async (
  email: string,
  password: string,
): Promise<void> => {
  await prisma.user.deleteMany({ where: { email } }).catch(() => undefined);
  try {
    const { idToken } = await firebaseSignIn(email, password);
    await firebaseDeleteUser(idToken);
  } catch {
    // user may already be deleted from Firebase
  }
};

// ─── Shared utils ─────────────────────────────────────────────────────────────

export const uniqueEmail = (): string =>
  `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@kookio-test.dev`;

export const TEST_PASSWORD = 'E2eTest123!';

// ─── Fixtures ────────────────────────────────────────────────────────────────

export type TestUser = {
  email: string;
  password: string;
  localId: string;
  idToken: string;
};

type AuthFixtures = {
  testUser: TestUser;
  loggedInPage: Page;
};

export const test = base.extend<AuthFixtures>({
  // eslint-disable-next-line no-empty-pattern
  testUser: async ({}, use) => {
    const email = uniqueEmail();
    const { localId, idToken } = await firebaseSignUp(email, TEST_PASSWORD);
    await provisionDbUser(email, localId, idToken);

    await use({ email, password: TEST_PASSWORD, localId, idToken });

    await cleanupUser(email, TEST_PASSWORD);
  },

  loggedInPage: async ({ page, testUser }, use) => {
    await page.goto('/login', { waitUntil: 'commit' });
    await page.locator('form').waitFor({ state: 'visible' });
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('[type="submit"]');
    await page.waitForURL('/recipes');
    await use(page);
  },
});

export { expect } from '@playwright/test';
