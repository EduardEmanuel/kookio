import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard } from '@kookio/feature-auth';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-recipes-match-page',
  template: `
    <section class="prose mx-auto p-6">
      <h1>Cook with your stocks</h1>
      <p>Find recipes based on ingredients you have. — coming soon</p>
    </section>
  `,
})
export default class RecipesMatchPage {}
