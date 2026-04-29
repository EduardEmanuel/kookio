import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { AuthStore, authGuard } from '@kookio/feature-auth';
import {
  OnboardingStepperComponent,
  OnboardingStore,
} from '@kookio/feature-onboarding';

export const routeMeta: RouteMeta = {
  // Only authGuard — onboardingGuard would loop on this route.
  canActivate: [authGuard],
  title: 'Onboarding — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-onboarding-page',
  imports: [OnboardingStepperComponent],
  // OnboardingStore is page-scoped (NOT providedIn: 'root') so onboarding
  // selections cannot leak between users sharing the same browser session.
  providers: [OnboardingStore],
  template: `<kookio-onboarding-stepper />`,
})
export default class OnboardingPage {
  private readonly authStore = inject(AuthStore);
  private readonly store = inject(OnboardingStore);

  constructor() {
    // Pre-populate from server when the user has previously onboarded
    // (e.g. profile reset → re-enters onboarding).
    if (this.authStore.isAuthenticated()) {
      this.store.loadCurrent();
    }
  }
}
