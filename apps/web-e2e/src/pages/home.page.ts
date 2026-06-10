import { type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

/** The home page (`/`) — hosts the recipes feed directly (no redirect). */
export class HomePage extends BasePage {
  /**
   * The recipes-feed landmark, exposed as a region named "Recipes". Present
   * whether the feed renders cards or its empty state, so it is the stable
   * anchor for "the feed is on the page" assertions.
   */
  readonly feed: Locator;

  constructor(page: Page) {
    super(page);
    this.feed = page.getByRole('region', { name: 'Recipes' });
  }

  readonly goto = async (): Promise<void> => {
    await this.navigateTo('/');
  };
}
