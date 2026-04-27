import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  title: 'Recipes — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-recipes-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="menu_book"
      title="Recipes"
      subtitle="Browse and discover recipes"
      route="/recipes"
    />
  `,
})
export default class RecipesPage {}
