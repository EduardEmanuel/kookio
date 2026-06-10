import { BasePage } from './base.page';

/**
 * The `/onboarding` page. Stub — only the navigation is modelled today (it is
 * the post-login destination for users who have not completed onboarding).
 * Flesh out with onboarding-step locators when it gets its own e2e coverage.
 */
export class OnboardingPage extends BasePage {
  readonly goto = async (): Promise<void> => {
    await this.navigateTo('/onboarding');
  };
}
