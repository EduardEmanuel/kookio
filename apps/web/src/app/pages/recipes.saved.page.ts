import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Saved Recipes — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-recipes-saved-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="bookmark"
      title="Saved Recipes"
      subtitle="Your saved recipes"
      route="/recipes/saved"
    />
  `,
})
export default class RecipesSavedPage {}
