import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import type { PantryItemWithIngredient } from '@kookio/prisma-client';

import {
  PantryFormComponent,
  type PantryFormInitial,
  type PantryFormValue,
} from '../pantry-form/pantry-form.component';

/**
 * Discriminated union for `MatDialog.open(PantryDialogComponent, { data })`.
 * Add-mode carries no payload; edit-mode pre-fills from an existing pantry
 * item so the user only adjusts the fields that changed.
 */
export type PantryDialogData =
  | { mode: 'add' }
  | { mode: 'edit'; item: PantryItemWithIngredient };

/**
 * `afterClosed()` resolves to the form snapshot when the user saves, or
 * `null` when the user cancels (or dismisses via backdrop / Esc). Edit-mode
 * callers combine this with the original `id` before invoking the store
 * `update` rxMethod.
 */
export type PantryDialogResult = PantryFormValue | null;

@Component({
  selector: 'kookio-pantry-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatDialogModule, PantryFormComponent],
  template: `
    <h2 mat-dialog-title>{{ title() }}</h2>
    <mat-dialog-content>
      <kookio-pantry-form [mode]="mode()" [initial]="initial()" />
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton type="button" (click)="close(null)">Cancel</button>
      <button
        matButton="filled"
        type="button"
        [disabled]="!form()?.valid()"
        (click)="save()"
      >
        Save
      </button>
    </mat-dialog-actions>
  `,
})
export class PantryDialogComponent {
  private readonly data = inject<PantryDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef =
    inject<MatDialogRef<PantryDialogComponent, PantryDialogResult>>(
      MatDialogRef,
    );

  protected readonly form = viewChild(PantryFormComponent);

  protected readonly mode = computed(() => this.data.mode);

  protected readonly title = computed(() =>
    this.data.mode === 'edit' ? 'Edit ingredient' : 'Add ingredient',
  );

  protected readonly initial = computed<PantryFormInitial | null>(() => {
    if (this.data.mode !== 'edit') return null;
    const it = this.data.item;
    return {
      ingredientCatalogId: it.ingredientCatalogId,
      ingredientName: it.ingredient.name,
      ingredientImageUrl: it.ingredient.imageUrl,
      quantity: it.quantity,
      unit: it.unit,
      expiresAt: it.expiresAt,
    };
  });

  protected readonly save = (): void => {
    const value = this.form()?.value() ?? null;
    if (value) this.close(value);
  };

  protected readonly close = (result: PantryDialogResult): void => {
    this.dialogRef.close(result);
  };
}
