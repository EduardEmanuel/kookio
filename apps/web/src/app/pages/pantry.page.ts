import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Pantry — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-pantry-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="kitchen"
      title="Pantry"
      subtitle="Your ingredient pantry"
      route="/pantry"
    />
  `,
})
export default class PantryPage {}
