import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Shopping List — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-shopping-list-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="shopping_cart"
      title="Shopping List"
      subtitle="Your shopping list"
      route="/shopping-list"
    />
  `,
})
export default class ShoppingListPage {}
