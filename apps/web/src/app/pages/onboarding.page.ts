import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
  title: 'Onboarding — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-onboarding-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="rocket_launch"
      title="Onboarding"
      subtitle="Welcome to Kookio"
      route="/onboarding"
    />
  `,
})
export default class OnboardingPage {}
