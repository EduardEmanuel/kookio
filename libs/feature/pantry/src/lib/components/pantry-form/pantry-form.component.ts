import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  type ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { from, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs';

import {
  type IngredientSearchResult,
  type MeasureUnit,
  MeasureUnitSchema,
} from '@kookio/prisma-client';

import { PANTRY_TRPC } from '../../pantry-trpc';
import { MEASURE_UNIT_LABEL } from '../../utils/measure-unit-label';

const SEARCH_DEBOUNCE_MS = 300;
const SEARCH_MIN_LENGTH = 2;
const SEARCH_LIMIT = 20;

export type PantryFormMode = 'add' | 'edit';

export interface PantryFormInitial {
  ingredientCatalogId: string;
  ingredientName: string;
  ingredientImageUrl?: string | null;
  quantity: number;
  unit: MeasureUnit;
  expiresAt: Date | null;
}

export interface PantryFormValue {
  ingredientCatalogId: string;
  quantity: number;
  unit: MeasureUnit;
  /** ISO datetime string or null — the server schema rejects raw `Date`. */
  expiresAt: string | null;
}

const isIngredient = (value: unknown): value is IngredientSearchResult =>
  typeof value === 'object' &&
  value !== null &&
  'id' in value &&
  'name' in value;

/**
 * Validator: in add-mode the user must pick an option from the autocomplete
 * dropdown so we have a `catalogId` to send. A free-typed name is `unselected`
 * because the server only accepts known ingredient ids.
 */
const requiresSelection: ValidatorFn = (ctrl) =>
  isIngredient(ctrl.value) ? null : { unselected: true };

/**
 * Final-functionality TODO: the catalog enum exposes 18 units. The pantry only
 * really needs the measurable subset; the recipe-only labels (`TO_TASTE`,
 * `TO_SERVE`, `GARNISH`, `OTHER`) are kept here pending the menu/shopping-list
 * UX decision in week 6 — drop them then if they never make sense for a stored
 * pantry quantity.
 */
const ALL_UNITS = MeasureUnitSchema.options as readonly MeasureUnit[];

@Component({
  selector: 'kookio-pantry-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  // Date adapter is scoped to this component instead of the app root so
  // `@angular/material/core` does not bloat the SSR module graph for every
  // unrelated route — cold-start of `/login` regressed past Playwright's 30s
  // timeout when the adapter was provided app-wide.
  providers: [provideNativeDateAdapter()],
  templateUrl: './pantry-form.component.html',
  styleUrl: './pantry-form.component.scss',
})
export class PantryFormComponent {
  readonly mode = input<PantryFormMode>('add');
  readonly initial = input<PantryFormInitial | null>(null);

  // One-shot guard so the prefill effect below patches once even if the
  // parent passes a new `initial` later — by then the user may have edited
  // the form and we should not clobber their input.
  private initialized = false;

  private readonly trpc = inject(PANTRY_TRPC);

  protected readonly units = ALL_UNITS;
  protected readonly unitLabels = MEASURE_UNIT_LABEL;

  protected readonly form = new FormGroup({
    ingredient: new FormControl<IngredientSearchResult | string | null>(null, [
      Validators.required,
      requiresSelection,
    ]),
    quantity: new FormControl<number | null>(1, [
      Validators.required,
      Validators.min(0.01),
    ]),
    unit: new FormControl<MeasureUnit | null>('PIECE', Validators.required),
    expiresAt: new FormControl<Date | null>(null),
  });

  /**
   * Debounced ingredient search wired entirely through Signals — no manual
   * `subscribe()` and no `effect()` with side effects, per the RxJS rules in
   * `.ai/06_rxjs.md`. Errors are swallowed so a flaky network does not freeze
   * the dropdown — the user can keep typing and retry.
   */
  protected readonly searchResults = toSignal(
    this.form.controls.ingredient.valueChanges.pipe(
      startWith(this.form.controls.ingredient.value),
      debounceTime(SEARCH_DEBOUNCE_MS),
      map((v) => (typeof v === 'string' ? v.trim() : '')),
      distinctUntilChanged(),
      filter((q): q is string => q.length >= SEARCH_MIN_LENGTH),
      switchMap((query) =>
        from(
          this.trpc.pantry.searchIngredients.query({
            query,
            limit: SEARCH_LIMIT,
          }),
        ).pipe(catchError(() => of<IngredientSearchResult[]>([]))),
      ),
    ),
    { initialValue: [] as IngredientSearchResult[] },
  );

  private readonly formStatus = toSignal(
    this.form.statusChanges.pipe(startWith(this.form.status)),
    { initialValue: this.form.status },
  );

  // `getRawValue()` instead of the emitted payload because in edit-mode the
  // ingredient control is `disable()`d — disabled controls are stripped from
  // `valueChanges` payloads and `form.value`. getRawValue includes them.
  private readonly formValue = toSignal(
    this.form.valueChanges.pipe(
      startWith(null),
      map(() => this.form.getRawValue()),
    ),
    { initialValue: this.form.getRawValue() },
  );

  /** True when every required field is filled and an ingredient is selected. */
  readonly valid = computed(() => this.formStatus() === 'VALID');

  /**
   * Snapshot suitable for `pantry.add.mutate` / `pantry.update.mutate`.
   * Returns `null` while the form is invalid so callers do not have to
   * re-validate before reading.
   */
  readonly value = computed<PantryFormValue | null>(() => {
    if (!this.valid()) return null;
    const v = this.formValue();
    if (!isIngredient(v.ingredient) || v.quantity == null || !v.unit) {
      return null;
    }
    return {
      ingredientCatalogId: v.ingredient.id,
      quantity: v.quantity,
      unit: v.unit,
      expiresAt: v.expiresAt ? v.expiresAt.toISOString() : null,
    };
  });

  constructor() {
    // Pre-fill once when `initial` resolves. We use `effect` rather than
    // `ngOnInit` because the codebase consistently relies on effects in the
    // constructor (lint forbids method-form lifecycle hooks here, and signal
    // inputs are not reliably set by constructor time anyway).
    effect(() => {
      if (this.initialized) return;
      const init = this.initial();
      if (!init) return;
      this.initialized = true;

      this.form.patchValue({
        ingredient: {
          id: init.ingredientCatalogId,
          name: init.ingredientName,
          imageUrl: init.ingredientImageUrl ?? null,
          // category is irrelevant for an already-selected ingredient.
          category: 'OTHER',
        } as unknown as IngredientSearchResult,
        quantity: init.quantity,
        unit: init.unit,
        expiresAt: init.expiresAt,
      });

      if (this.mode() === 'edit') {
        this.form.controls.ingredient.disable();
      }
    });
  }

  /** Adapter for `[displayWith]` — show the ingredient name in the input. */
  protected readonly displayIngredient = (
    value: IngredientSearchResult | string | null,
  ): string => {
    if (value === null) return '';
    return typeof value === 'string' ? value : value.name;
  };

  protected readonly onOptionSelected = (
    event: MatAutocompleteSelectedEvent,
  ): void => {
    this.form.controls.ingredient.setValue(
      event.option.value as IngredientSearchResult,
    );
  };
}
