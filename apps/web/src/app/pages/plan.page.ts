import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Plan — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-plan-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="calendar_today"
      title="Plan"
      subtitle="Plan your weekly meals"
      route="/plan"
    />
  `,
})
export default class PlanPage {}
