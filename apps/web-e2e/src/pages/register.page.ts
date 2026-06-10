import { type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

/** The `/register` page — email + password + confirm form behind an `@defer`. */
export class RegisterPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.confirmInput = page.getByLabel('Confirm password');
    this.submitButton = page.getByRole('button', { name: 'Create account' });
  }

  readonly goto = async (): Promise<void> => {
    await this.navigateTo('/register');
  };

  /**
   * Wait for the deferred form, then register. `confirm` defaults to
   * `password` (the happy path); pass a different value to exercise the
   * mismatch validation.
   */
  readonly submit = async (
    email: string,
    password: string,
    confirm: string = password,
  ): Promise<void> => {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmInput.fill(confirm);
    await this.submitButton.click();
  };
}
