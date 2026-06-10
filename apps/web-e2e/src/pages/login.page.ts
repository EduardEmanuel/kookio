import { type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

/** The `/login` page — email + password form behind an `@defer`. */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email');
    // `exact` so it never collides with a "Confirm password" field elsewhere.
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
  }

  readonly goto = async (): Promise<void> => {
    await this.navigateTo('/login');
  };

  /**
   * Wait for the deferred form to render, then fill credentials and submit.
   * Does NOT wait for a redirect — the post-login destination varies (`/`,
   * `/pantry`, `/onboarding`), so each test asserts its own landing URL.
   */
  readonly submit = async (email: string, password: string): Promise<void> => {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  };
}
