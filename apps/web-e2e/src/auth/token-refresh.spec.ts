import { test, expect } from '../fixtures/auth.fixture';

const TRPC_URL = '/api/trpc';
const AUTH_ME_URL = 'auth.me';

type PwPage = import('@playwright/test').Page;

/** Submit the login form without waiting for a redirect. */
const submitLoginForm = async (
  page: PwPage,
  email: string,
  password: string,
): Promise<void> => {
  await page.goto('/login');
  await page.locator('form').waitFor({ state: 'visible' });
  await page.fill('[name="email"]', email);
  await page.fill('[name="password"]', password);
  await page.click('[type="submit"]');
};

/** Submit the login form and wait for the redirect to land on /. */
const loginViaUi = async (
  page: PwPage,
  email: string,
  password: string,
): Promise<void> => {
  await submitLoginForm(page, email, password);
  // Redirect is driven by login.page.ts effect: only fires when session() is
  // set, which happens after auth.me succeeds. URLS.HOME ('/') now renders
  // the recipes feed directly.
  await page.waitForURL((url) => url.pathname === '/', { timeout: 45_000 });
};

// ─── Bearer token absent before login ────────────────────────────────────────

test.describe('tRPC Authorization header', () => {
  test('is absent when not logged in', async ({ page }) => {
    const headers: string[] = [];

    // Non-blocking listener — does not intercept/delay requests
    page.on('request', (req) => {
      if (req.url().includes(TRPC_URL)) {
        const h = req.headers()['authorization'];
        if (h) headers.push(h);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    expect(headers).toHaveLength(0);
  });

  // ─── Bearer token present after login ──────────────────────────────────────
  // page.on('request') is non-blocking — does not interfere with the redirect.
  // We await the auth.me response to guarantee the token was already sent.

  test('is present with Bearer token after login', async ({
    page,
    testUser,
  }) => {
    test.setTimeout(60_000);

    const authHeaders: string[] = [];

    page.on('request', (req) => {
      if (req.url().includes(TRPC_URL)) {
        const h = req.headers()['authorization'];
        if (h) authHeaders.push(h);
      }
    });

    const authMeSettled = page.waitForResponse(
      (r) => r.url().includes(AUTH_ME_URL),
      { timeout: 30_000 },
    );

    await loginViaUi(page, testUser.email, testUser.password);
    await authMeSettled;

    expect(authHeaders.length).toBeGreaterThan(0);
    expect(authHeaders[0]).toMatch(/^Bearer .+/);
  });
});

// ─── 401 retry ────────────────────────────────────────────────────────────────
// authAwareFetch: if the server returns HTTP 401, force-refresh the token and
// retry once. We only intercept auth.me so Firebase login itself is unaffected.

// @no-webkit: page.route response-modification does not intercept Angular
// fetch in webkit. The retry logic is fully covered by unit tests
// (trpc-client.spec.ts).
//
// @no-firefox: the intercept + retry orchestration consistently races
// against firefox's slower fetch handling on dev-local — the second
// /auth.me response lands past the 30s waitForResponse timeout in one or
// the other test on every run (which one varies by worker scheduling).
// Both sibling tests share the same flake profile, so the tag scopes the
// whole describe rather than playing whack-a-mole on individual tests.
// Chromium remains the canonical signal for the retry-stop logic.
test.describe('authAwareFetch 401 retry @no-webkit @no-firefox', () => {
  test('retries once and succeeds when server returns 401 on first call', async ({
    page,
    testUser,
  }) => {
    test.setTimeout(60_000);

    let callCount = 0;
    const capturedHeaders: string[] = [];

    await page.route('**/api/trpc/auth*', async (route) => {
      callCount++;
      capturedHeaders.push(route.request().headers()['authorization'] ?? '');

      if (callCount === 1) {
        // Simulate an expired-token 401 — authAwareFetch must retry once
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Unauthorized' }),
        });
      } else {
        await route.continue();
      }
    });

    // Register page.on BEFORE waitForResponse so the counter is incremented
    // before the predicate evaluates (event listeners fire in registration order).
    let authMeResponseCount = 0;
    page.on('response', (r) => {
      if (r.url().includes(AUTH_ME_URL)) authMeResponseCount++;
    });

    // Resolves when the second auth.me response lands (count already updated).
    const bothSettled = page.waitForResponse(
      (r) => r.url().includes(AUTH_ME_URL) && authMeResponseCount >= 2,
      { timeout: 30_000 },
    );

    await Promise.all([
      loginViaUi(page, testUser.email, testUser.password),
      bothSettled,
    ]);

    expect(callCount).toBeGreaterThanOrEqual(2);
    expect(capturedHeaders[1]).toMatch(/^Bearer .+/);
  });

  test('does not retry a second time on double 401 (no infinite loop)', async ({
    page,
    testUser,
  }) => {
    test.setTimeout(60_000);

    let callCount = 0;

    await page.route('**/api/trpc/auth*', async (route) => {
      callCount++;
      // Always return 401 — authAwareFetch should retry exactly once then stop
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Unauthorized' }),
      });
    });

    // When auth.me always returns 401, session is never set, so login.page.ts
    // never navigates — we submit the form but do NOT wait for a redirect.
    // Register page.on BEFORE waitForResponse (listener order matters).
    let authMeResponseCount = 0;
    page.on('response', (r) => {
      if (r.url().includes(AUTH_ME_URL)) authMeResponseCount++;
    });

    const bothSettled = page.waitForResponse(
      (r) => r.url().includes(AUTH_ME_URL) && authMeResponseCount >= 2,
      { timeout: 30_000 },
    );

    await submitLoginForm(page, testUser.email, testUser.password);
    await bothSettled;

    // auth.me: original → 401 → retry → 401 → stop. Total: exactly 2.
    expect(callCount).toBe(2);
  });
});
