import { test, expect } from '@playwright/test';

import { AboutPage } from './pages';

test('has title', async ({ page }) => {
  const aboutPage = new AboutPage(page);
  await aboutPage.goto();

  await expect(aboutPage.title).toBeVisible();
});

test('renders body content below the title', async ({ page }) => {
  const aboutPage = new AboutPage(page);
  await aboutPage.goto();

  // Asserts the real /about content rendered (not just the page title) — the
  // AnalogJS placeholder copy was replaced when the page got real content in
  // batch 6 / T2.
  await expect(aboutPage.whatItDoesHeading).toBeVisible();
});
