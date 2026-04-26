import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard } from '@kookio/feature-auth';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-shopping-list-page',
  template: `
    <section class="prose mx-auto p-6">
      <h1>Listă cumpărături</h1>
      <p>Your shopping list. — coming soon</p>
    </section>
  `,
})
export default class ShoppingListPage {}
