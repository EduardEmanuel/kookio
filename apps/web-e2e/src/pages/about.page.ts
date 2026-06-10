import { type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

/** The `/about` page. */
export class AboutPage extends BasePage {
  readonly title: Locator;
  readonly whatItDoesHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByText('About Kookio');
    this.whatItDoesHeading = page.getByRole('heading', {
      name: 'What it does',
    });
  }

  readonly goto = async (): Promise<void> => {
    await this.navigateTo('/about');
  };
}
