import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import {
  PantryDialogComponent,
  type PantryDialogData,
  type PantryDialogResult,
  PantryItemComponent,
} from '@kookio/feature-pantry';
import { PantryStore } from '@kookio/feature-pantry/store';
import type { PantryItemWithIngredient } from '@kookio/prisma-client';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Pantry — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-pantry-page',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    PantryItemComponent,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './pantry.page.html',
  styleUrl: './pantry.page.scss',
})
export default class PantryPage {
  protected readonly store = inject(PantryStore);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
    // Defer the initial fetch to client-side: `/pantry` is behind
    // `authGuard` + `onboardingGuard`, so SSR always redirects before
    // the page bootstraps for real.
    afterNextRender(() => this.store.load());

    // Surface store errors as snackbars. `untracked` keeps the
    // `clearError` write from being treated as a tracked dependency,
    // and the guard prevents re-firing the snack on the cleared `null`.
    effect(() => {
      const err = this.store.error();
      if (!err) return;
      untracked(() => {
        this.snackBar.open(err, 'Dismiss', { duration: 4000 });
        this.store.clearError();
      });
    });
  }

  protected readonly onAdd = (): void => {
    const ref = this.dialog.open<
      PantryDialogComponent,
      PantryDialogData,
      PantryDialogResult
    >(PantryDialogComponent, {
      width: '500px',
      data: { mode: 'add' },
      autoFocus: 'first-tabbable',
    });
    ref.afterClosed().subscribe((result) => {
      if (result) this.store.add(result);
    });
  };

  protected readonly onEdit = (item: PantryItemWithIngredient): void => {
    const ref = this.dialog.open<
      PantryDialogComponent,
      PantryDialogData,
      PantryDialogResult
    >(PantryDialogComponent, {
      width: '500px',
      data: { mode: 'edit', item },
      autoFocus: 'first-tabbable',
    });
    ref.afterClosed().subscribe((result) => {
      if (result) this.store.update({ id: item.id, ...result });
    });
  };

  protected readonly onRemove = (id: string): void => {
    this.store.remove({ id });
  };
}
