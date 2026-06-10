import { BasePage } from './base.page';

/**
 * The `/pantry` page. Stub — only the navigation is modelled today (it is used
 * by the auth redirect/guard specs as a protected route). Flesh out with
 * pantry locators when `/pantry` gets its own e2e coverage.
 */
export class PantryPage extends BasePage {
  readonly goto = async (): Promise<void> => {
    await this.navigateTo('/pantry');
  };
}
