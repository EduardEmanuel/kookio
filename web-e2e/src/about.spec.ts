import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/about');

  expect(await page.locator('h1').innerText()).toContain('About Kookio');
});

test('has paragraph', async ({ page }) => {
    await page.goto('/about');

    expect(await page.locator('p').innerText()).toContain('Minimal SSG page prerendered by Analog.')
})
