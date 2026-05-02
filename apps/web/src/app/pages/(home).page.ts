import { ChangeDetectionStrategy, Component } from '@angular/core';

import type { RouteMeta } from '@analogjs/router';

import { RecipesFeedComponent } from '@kookio/feature-recipes';

export const routeMeta: RouteMeta = {
  title: 'Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-home-page',
  imports: [RecipesFeedComponent],
  template: `<kookio-recipes-feed />`,
})
export default class HomePage {}
