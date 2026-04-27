import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import type { RouteMeta } from '@analogjs/router';

import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  title: 'Recipe — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-recipe-detail-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="restaurant_menu"
      title="Recipe"
      [subtitle]="subtitle()"
      route="/recipes/:id"
    />
  `,
})
export default class RecipeDetailPage {
  private readonly route = inject(ActivatedRoute);

  readonly id = toSignal(
    this.route.params.pipe(map((p) => (p['id'] as string) ?? '')),
    { initialValue: '' },
  );

  readonly subtitle = computed(() => (this.id() ? `ID: ${this.id()}` : ''));
}
