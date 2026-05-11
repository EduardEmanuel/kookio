import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import {
  PlanCalendarComponent,
  PlanFooterComponent,
  planCanDeactivate,
} from '@kookio/feature-plan';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  canDeactivate: [planCanDeactivate],
  title: 'Plan — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-plan-page',
  imports: [PlanCalendarComponent, PlanFooterComponent],
  // Footer is a sibling (not a child) so its sticky border can span
  // the full page width instead of being capped by the calendar's
  // `max-width: 1200px`. Both components share state via the
  // singleton PlanStore (`providedIn: 'root'`), so no Inputs/Outputs
  // wire-up is needed.
  template: `
    <kookio-plan-calendar />
    <kookio-plan-footer />
  `,
})
export default class PlanPage {}
