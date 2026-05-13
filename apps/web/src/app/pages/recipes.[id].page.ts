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
import { MatDividerModule } from '@angular/material/divider';
import { map } from 'rxjs';

import { injectLoad, type RouteMeta } from '@analogjs/router';

import { AuthStore } from '@kookio/feature-auth';
import { SaveToggleComponent } from '@kookio/feature-saved';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
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
    MatDividerModule,
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

  protected readonly instructionSteps = computed(() => {
    const text = this.recipe()?.instructions ?? '';
    return text
      .split(/\r?\n+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  });

  constructor() {
    effect(() => {
      const r = this.recipe();
      if (r) this.title.setTitle(`${r.title} — Kookio`);
    });
  }

  protected readonly formatUnit = formatMeasureUnit;

  protected readonly formatQuantity = (qty: number | null): string =>
    qty == null ? '' : String(qty);
}
