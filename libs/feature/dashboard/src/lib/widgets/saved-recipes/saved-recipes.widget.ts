import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

import { SavedStore } from '@kookio/feature-saved/store';
import type { SavedRecipeRow } from '@kookio/prisma-client';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';

const TOP_N = 5;

@Component({
  selector: 'kookio-saved-recipes-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './saved-recipes.widget.html',
  styleUrl: './saved-recipes.widget.scss',
})
export class SavedRecipesWidgetComponent {
  protected readonly store = inject(SavedStore);

  protected readonly recipesRoute = URLS.RECIPES;
  protected readonly savedRoute = URLS.RECIPES_SAVED;

  protected readonly topItems = computed<SavedRecipeRow[]>(() =>
    this.store.items().slice(0, TOP_N),
  );

  protected readonly hasMore = computed<boolean>(
    () => this.store.totalCount() > TOP_N,
  );

  constructor() {
    // Mirrors the other widgets: dashboard is gated by `authGuard` +
    // `onboardingGuard`, so SSR redirects before this widget bootstraps.
    // The store's `withHooks` hydrates `ids` automatically on session land,
    // but `items` (the rich rows the widget renders) only land via `load`.
    afterNextRender(() => this.store.load());
  }
}
