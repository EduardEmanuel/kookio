import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { map } from 'rxjs';

import { injectLoad, type RouteMeta } from '@analogjs/router';

import { AuthStore } from '@kookio/feature-auth';
import { SaveToggleComponent } from '@kookio/feature-saved';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import {
  DIFFICULTY_EMOJI,
  DIFFICULTY_LABEL,
} from '@kookio/shared-utility/difficulty';
import { formatMeasureUnit } from '@kookio/shared-utility/measure-units';

import type { load } from './recipes.[id].server';

export const routeMeta: RouteMeta = {
  // Static fallback — overridden in the component constructor with the recipe
  // title once the loader data is in. Keeps the tab title sensible if the
  // component fails to bootstrap.
  title: 'Recipe — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-recipe-detail-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatChipsModule,
    SaveToggleComponent,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './recipes.[id].page.html',
  styleUrl: './recipes.[id].page.scss',
})
export default class RecipeDetailPage {
  private readonly authStore = inject(AuthStore);
  private readonly title = inject(Title);

  protected readonly recipe = toSignal(
    injectLoad<typeof load>().pipe(map((d) => d.recipe)),
    { requireSync: true },
  );

  protected readonly canCook = computed(
    () => this.authStore.isAuthenticated() && this.authStore.onboardingDone(),
  );

  protected readonly steps = computed(() => this.recipe()?.steps ?? []);

  constructor() {
    effect(() => {
      const r = this.recipe();
      if (r) this.title.setTitle(`${r.title} — Kookio`);
    });
  }

  protected readonly formatUnit = formatMeasureUnit;

  protected readonly formatQuantity = (qty: number | null): string =>
    qty == null ? '' : String(qty);

  protected readonly DIFFICULTY_LABEL = DIFFICULTY_LABEL;
  protected readonly DIFFICULTY_EMOJI = DIFFICULTY_EMOJI;
}
