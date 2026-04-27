import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Dashboard — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-dashboard-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="dashboard"
      title="Dashboard"
      subtitle="Your personalized overview"
      route="/dashboard"
    />
  `,
})
export default class DashboardPage {}
