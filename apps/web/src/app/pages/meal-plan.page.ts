import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard } from '@kookio/feature-auth';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-meal-plan-page',
  template: `
    <section class="prose mx-auto p-6">
      <h1>Meal Plan</h1>
      <p>Plan your weekly meals. — coming soon</p>
    </section>
  `,
})
export default class MealPlanPage {}
