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

    // Result of the "Add to pantry" bulk action — show counts so the user
    // knows what happened. `skipped` is rare (recipe ingredient with null
    // qty/unit, or — exotic — a concurrent pantry-write race) so it's
    // surfaced as a separate phrase only when non-zero.
    effect(() => {
      const result = this.store.addBoughtResult();
      if (!result) return;
      untracked(() => {
        const moved = result.added + result.merged;
        const main =
          moved === 0
            ? 'Nothing was moved'
            : moved === 1
              ? '1 item added to your pantry'
              : `${moved} items added to your pantry`;
        const suffix =
          result.skipped > 0
            ? ` — ${result.skipped} skipped (missing quantity or unit)`
            : '';
        this.snackBar.open(`${main}${suffix}`, 'Dismiss', { duration: 4000 });
        this.store.clearAddBoughtResult();
      });
    });
  }

  protected readonly onReload = (): void => {
    this.store.load();
  };

  protected readonly onToggle = (ingredientCatalogId: string): void => {
    this.store.toggleBought({ ingredientCatalogId });
  };

  protected readonly onMoveBoughtToPantry = (): void => {
    this.store.addBoughtToPantry();
  };
}
