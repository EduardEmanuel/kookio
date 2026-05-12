import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { GroceryItemComponent } from '@kookio/feature-groceries';
import { GroceriesStore } from '@kookio/feature-groceries/store';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';
import {
  formatIngredientCategoryEmoji,
  formatIngredientCategoryLabel,
} from '@kookio/shared-utility/ingredient-categories';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Groceries — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-groceries-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatProgressSpinnerModule,
    GroceryItemComponent,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './groceries.page.html',
  styleUrl: './groceries.page.scss',
})
export default class GroceriesPage {
  protected readonly store = inject(GroceriesStore);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly planUrl = URLS.PLAN;

  protected readonly categoryLabel = formatIngredientCategoryLabel;
  protected readonly categoryEmoji = formatIngredientCategoryEmoji;

  constructor() {
    // `/groceries` sits behind `authGuard` + `onboardingGuard`, so SSR
    // always redirects before this fires for real. Same pattern as
    // `pantry.page.ts`.
    afterNextRender(() => this.store.load());

    effect(() => {
      const err = this.store.error();
      if (!err) return;
      untracked(() => {
        this.snackBar.open(err, 'Dismiss', { duration: 4000 });
        this.store.clearError();
      });
    });

    // Surface a one-time, longer-duration toast when bought-state could not
    // be persisted (Redis blip). The toggle itself succeeded locally — this
    // is just letting the user know cross-device sync is paused. Cleared
    // immediately so it only fires once per outage burst.
    effect(() => {
      if (!this.store.unpersistedNotice()) return;
      untracked(() => {
        this.snackBar.open(
          "Saved locally — your selections won't sync across devices right now",
          'Dismiss',
          { duration: 6000 },
        );
        this.store.clearUnpersistedNotice();
      });
    });
  }

  protected readonly onReload = (): void => {
    this.store.load();
  };

  protected readonly onToggle = (ingredientCatalogId: string): void => {
    this.store.toggleBought({ ingredientCatalogId });
  };
}
