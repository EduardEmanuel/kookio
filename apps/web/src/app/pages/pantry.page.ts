import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard } from '@kookio/feature-auth';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-pantry-page',
  template: `
    <section class="prose mx-auto p-6">
      <h1>Pantry</h1>
      <p>Your ingredient pantry. — coming soon</p>
    </section>
  `,
})
export default class PantryPage {}
