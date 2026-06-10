import { BasePage } from './base.page';

/**
 * The `/account` page. Stub — only the navigation is modelled today (used by
 * the anon-redirect spec as a protected route). Flesh out with account
 * locators when `/account` gets its own e2e coverage.
 */
export class AccountPage extends BasePage {
  readonly goto = async (): Promise<void> => {
    await this.navigateTo('/account');
  };
}
