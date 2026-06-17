import { test, expect } from '@playwright/test';

// Installing the PWA requires the web app manifest and the icon set it points
// at to be reachable with the right content types. The InstallPromptComponent
// state machine is unit-tested (install-prompt.component.spec.ts); this spec
// covers the other half — that those static assets actually resolve on a live
// server. The `beforeinstallprompt` engagement heuristic and the OS-native
// install dialog are deliberately out of scope: Playwright cannot satisfy the
// former naturally, and the latter is unreachable from the browser context, so
// asserting them would only re-exercise the mocked unit path.
//
// Pure HTTP checks via the `request` fixture (resolves against `use.baseURL`),
// so no page object is involved.

const ICON_PATHS = [
  '/icons/pwa/icon-192.png',
  '/icons/pwa/icon-512.png',
  '/icons/pwa/icon-maskable-192.png',
  '/icons/pwa/icon-maskable-512.png',
] as const;

test.describe('PWA assets', () => {
  test('serves the web app manifest as JSON with an icon set', async ({
    request,
  }) => {
    const res = await request.get('/manifest.webmanifest');

    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain(
      'application/manifest+json',
    );

    const manifest = (await res.json()) as {
      name?: string;
      icons?: unknown[];
    };
    expect(manifest.name).toBeTruthy();
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons?.length ?? 0).toBeGreaterThan(0);
  });

  for (const path of ICON_PATHS) {
    test(`serves ${path} as a PNG`, async ({ request }) => {
      const res = await request.get(path);

      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('image/png');
    });
  }
});
