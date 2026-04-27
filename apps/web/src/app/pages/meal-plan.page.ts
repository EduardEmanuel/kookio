import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Meal Plan — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-meal-plan-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="calendar_today"
      title="Meal Plan"
      subtitle="Plan your weekly meals"
      route="/meal-plan"
    />
  `,
})
export default class MealPlanPage {}
