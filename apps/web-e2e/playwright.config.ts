import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  /**
   * 60s test timeout (Playwright default is 30s). The first browser worker
   * pays for Vite dev SSR cold-start of any route global-setup did not yet
   * fully warm — once a chunk is first compiled, subsequent loads are sub-
   * second, but the initial hydration of the auth-guarded routes (`/login`,
   * `/register`, `/pantry`) routinely sits in the 25-35s range. 60s gives
   * those tests headroom without masking real regressions: when warm-up has
   * settled, every test still completes in well under 30s.
   */
  timeout: 60_000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx run web:serve',
    url: baseURL,
    reuseExistingServer: true,
    timeout: 180_000,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grepInvert: /@no-webkit/,
    },

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],
  reporter: [
    ['list'],
    ['json', { outputFile: '../../dist/test/metrics/playwright-report.json' }],
    [
      'html',
      { open: 'never', outputFolder: '../../dist/test/playwright-html' },
    ],
  ],
});
