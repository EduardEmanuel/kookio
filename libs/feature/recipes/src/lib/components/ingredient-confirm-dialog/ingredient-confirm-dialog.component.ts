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
  formatMeasureUnit,
  toGrams,
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
  /**
   * True when the row's grams equivalent had to fall back to
   * DEFAULT_PIECE_GRAMS because the catalog row carries no `pieceGrams`
   * value for a piece-class unit. The template renders an "approx." hint
   * so the user can override the quantity input before confirming.
   */
  readonly approximate: boolean;
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
  const pieceGrams = ri.ingredient.pieceGrams ?? null;
  const baseQuantity = (ri.quantity ?? 0) * ratio;

  // Probe `toGrams` twice so we can tell "the math can run, possibly with
  // a default fallback" apart from "the math can also run without falling
  // back". The fallback path is allowed (so piece-class units without a
  // catalog `pieceGrams` value still produce a decrement) but flagged via
  // `approximate` so the UI can prompt the user to adjust before confirming.
  const consumedGramsExact =
    recipeUnit !== null ? toGrams(baseQuantity, recipeUnit, pieceGrams) : null;
  const consumedGramsApprox =
    recipeUnit !== null
      ? toGrams(baseQuantity, recipeUnit, pieceGrams, { allowDefault: true })
      : null;
  const approximate =
    recipeUnit !== null &&
    consumedGramsExact === null &&
    consumedGramsApprox !== null;

  // Disabled when the math truly cannot run: no pantry row, no recipe unit,
  // or a piece-class unit where even the default fallback didn't apply
  // (toGrams returned null with allowDefault: true — only happens when the
  // unit itself is missing from every mapping, defensive).
  const disabled =
    !inPantry || recipeUnit === null || consumedGramsApprox === null;

  // toGrams returns 0 only for TO_TASTE / TO_SERVE / GARNISH — flavour-only
  // markers that decrement nothing. Surface the row so the user knows the
  // recipe calls for "salt to taste", but leave it unchecked because a tick
  // would be a 0 g no-op.
  const isFlavourOnly = consumedGramsApprox === 0;

  const includedByDefault = !disabled && !isFlavourOnly;

  const state: RowState = {
    id: ri.id,
    ingredientCatalogId: ri.ingredientCatalogId,
    ingredientName: ri.ingredient.name,
    recipeUnit,
    pantryUnit,
    inPantry,
    approximate,
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
