import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import type {
  CookingRecipeIngredient,
  CookingSessionConsumedItem,
  MeasureUnit,
} from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';
import {
  convertMeasure,
  formatMeasureUnit,
  NEGLIGIBLE_MEASURE_UNITS,
} from '@kookio/shared-utility/measure-units';

export interface IngredientConfirmDialogData {
  ingredients: readonly CookingRecipeIngredient[];
  /** servings selected by the user / recipe servings (>= 1, > 0). */
  ratio: number;
}

export type IngredientConfirmDialogResult =
  | readonly CookingSessionConsumedItem[]
  | null;

interface RowState {
  readonly id: string;
  readonly ingredientCatalogId: string;
  readonly ingredientName: string;
  readonly recipeUnit: MeasureUnit | null;
  readonly pantryUnit: MeasureUnit | null;
  readonly inPantry: boolean;
  readonly unitMismatch: boolean;
  /** Disabled rows can never be consumed (no recipe unit, or not in pantry). */
  readonly disabled: boolean;
}

interface RowFormShape {
  included: FormControl<boolean>;
  quantity: FormControl<number>;
}

const buildRow = (
  ri: CookingRecipeIngredient,
  ratio: number,
): { state: RowState; group: FormGroup<RowFormShape> } => {
  const inPantry = ri.pantryAvailable !== null;
  const recipeUnit = ri.unit;
  const pantryUnit = ri.pantryAvailable?.unit ?? null;
  // A unit mismatch is only "real" when conversion between the two units
  // is impossible (different families, or one side is a non-numeric
  // marker like PIECE/PINCH). Convertible mismatches — e.g. recipe in ml
  // against pantry in l — are silently handled by the server-side
  // decrement, so the row stays checked-by-default and the warning is
  // suppressed.
  const unitMismatch =
    inPantry &&
    recipeUnit !== null &&
    pantryUnit !== null &&
    pantryUnit !== recipeUnit &&
    convertMeasure(1, recipeUnit, pantryUnit) === null;
  const negligible =
    recipeUnit !== null && NEGLIGIBLE_MEASURE_UNITS.has(recipeUnit);
  // Disabled rows are structurally unable to update the pantry — either there
  // is no pantry row to subtract from, or the recipe ingredient has no unit
  // and the server's `consumed` schema rejects null units. Negligible units
  // (PINCH / TO_TASTE / TO_SERVE / GARNISH) stay enabled so the user can
  // override the default and bill them against the pantry if they actually
  // tracked salt or oil there.
  const disabled = !inPantry || recipeUnit === null;
  const includedByDefault = !disabled && !negligible && !unitMismatch;

  const baseQuantity = (ri.quantity ?? 0) * ratio;

  const state: RowState = {
    id: ri.id,
    ingredientCatalogId: ri.ingredientCatalogId,
    ingredientName: ri.ingredient.name,
    recipeUnit,
    pantryUnit,
    inPantry,
    unitMismatch,
    disabled,
  };
  const group = new FormGroup<RowFormShape>({
    included: new FormControl(includedByDefault, { nonNullable: true }),
    quantity: new FormControl(baseQuantity, { nonNullable: true }),
  });
  if (disabled) group.controls.included.disable();
  return { state, group };
};

@Component({
  selector: 'kookio-ingredient-confirm-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    KookioIconComponent,
  ],
  templateUrl: './ingredient-confirm-dialog.component.html',
  styleUrl: './ingredient-confirm-dialog.component.scss',
})
export class IngredientConfirmDialogComponent {
  private readonly data = inject<IngredientConfirmDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef =
    inject<
      MatDialogRef<
        IngredientConfirmDialogComponent,
        IngredientConfirmDialogResult
      >
    >(MatDialogRef);

  protected readonly rows: readonly RowState[];
  protected readonly form: FormArray<FormGroup<RowFormShape>>;

  constructor() {
    const built = this.data.ingredients.map((ri) =>
      buildRow(ri, this.data.ratio),
    );
    this.rows = built.map((b) => b.state);
    this.form = new FormArray(built.map((b) => b.group));
  }

  protected readonly groupAt = (index: number): FormGroup<RowFormShape> =>
    this.form.at(index);

  protected readonly formatUnit = (unit: MeasureUnit | null): string =>
    formatMeasureUnit(unit);

  protected readonly onCancel = (): void => {
    this.dialogRef.close(null);
  };

  protected readonly onConfirm = (): void => {
    const consumed: CookingSessionConsumedItem[] = [];
    this.rows.forEach((row, index) => {
      // `disabled` rows are guaranteed unconsumable; the form control is also
      // disabled so its value is excluded from `form.value` already, but we
      // double-check on the row state for clarity.
      if (row.disabled || row.recipeUnit === null) return;
      const group = this.form.at(index);
      if (!group.controls.included.value) return;
      const quantity = Math.max(0, group.controls.quantity.value);
      if (quantity <= 0) return;
      consumed.push({
        ingredientCatalogId: row.ingredientCatalogId,
        quantity,
        unit: row.recipeUnit,
      });
    });
    this.dialogRef.close(consumed);
  };
}
