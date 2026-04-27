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

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Cook session — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-cook-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="soup_kitchen"
      title="Cook session"
      [subtitle]="subtitle()"
      route="/cook/:recipeId"
    />
  `,
})
export default class CookPage {
  private readonly route = inject(ActivatedRoute);

  readonly recipeId = toSignal(
    this.route.params.pipe(map((p) => (p['recipeId'] as string) ?? '')),
    { initialValue: '' },
  );

  readonly subtitle = computed(() =>
    this.recipeId() ? `Recipe: ${this.recipeId()}` : '',
  );
}
