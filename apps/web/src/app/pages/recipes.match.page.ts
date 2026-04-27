import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Cook with your stocks — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-recipes-match-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="restaurant"
      title="Cook with your stocks"
      subtitle="Find recipes based on what you have"
      route="/recipes/match"
    />
  `,
})
export default class RecipesMatchPage {}
