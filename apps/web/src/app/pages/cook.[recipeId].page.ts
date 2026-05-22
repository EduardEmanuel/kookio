import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkListboxModule } from '@angular/cdk/listbox';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, from, of } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, tap } from 'rxjs';

import { injectLoad, type RouteMeta } from '@analogjs/router';

import { authGuard, AuthStore, onboardingGuard } from '@kookio/feature-auth';
import { PANTRY_TRPC } from '@kookio/feature-pantry/trpc';
import { COOKING_SESSION_TRPC } from '@kookio/feature-recipes/cooking-trpc';
import {
  type IngredientConfirmDialogData,
  type IngredientConfirmDialogResult,
  IngredientConfirmDialogComponent,
} from '@kookio/feature-recipes/ingredient-confirm-dialog';
import type {
  CookingRecipeIngredient,
  PantryItemWithIngredient,
} from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';

import type { load } from './cook.[recipeId].server';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Cook session — Kookio',
};

const SERVING_OPTIONS = [1, 2, 3, 4, 6, 8] as const;
type Phase = 'setup' | 'cooking';

/**
 * Default the toggle to the recipe's own servings when it falls inside the
 * preset set, otherwise to the closest preset rounded **down** so we never
 * silently imply we'll cook more than the user signed up for.
 */
const pickDefaultServings = (recipeServings: number): number => {
  const exact = SERVING_OPTIONS.find((n) => n === recipeServings);
  if (exact) return exact;
  const sorted = [...SERVING_OPTIONS].sort((a, b) => a - b);
  let best = sorted[0]!;
  for (const n of sorted) if (n <= recipeServings) best = n;
  return best;
};

@Component({
  selector: 'kookio-cook-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkListboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    KookioIconComponent,
  ],
  templateUrl: './cook.[recipeId].page.html',
  styleUrl: './cook.[recipeId].page.scss',
})
export default class CookPage {
  private readonly trpc = inject(COOKING_SESSION_TRPC);
  private readonly pantryTrpc = inject(PANTRY_TRPC);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly recipe = toSignal(
    injectLoad<typeof load>().pipe(map((d) => d.recipe)),
    { requireSync: true },
  );

  protected readonly servingOptions = SERVING_OPTIONS;

  protected readonly phase = signal<Phase>('setup');
  protected readonly isStarting = signal(false);
  protected readonly isCompleting = signal(false);
  protected readonly currentStep = signal(0);
  protected readonly sessionId = signal<string | null>(null);

  protected readonly servings = signal(
    pickDefaultServings(this.recipe().servings ?? 2),
  );

  protected readonly recipeServings = computed(
    () => this.recipe().servings ?? 2,
  );

  protected readonly steps = computed(() => this.recipe().steps);

  /**
   * Initial step pulled from the `?step=N` query parameter, clamped to the
   * recipe's step range. Read once at construction time — we do NOT track
   * `route.queryParams` reactively here because we own URL writes via
   * `history.replaceState` (see the effect below), and re-reading would
   * cause a feedback loop. A fresh tab with no param resolves to 0.
   */
  private readonly initialStep = ((): number => {
    const raw = this.route.snapshot.queryParamMap.get('step');
    if (raw == null) return 0;
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed)) return 0;
    const max = Math.max(0, this.recipe().steps.length - 1);
    return Math.max(0, Math.min(parsed, max));
  })();

  protected readonly canPrev = computed(() => this.currentStep() > 0);
  protected readonly canNext = computed(
    () => this.currentStep() < this.steps().length - 1,
  );

  /**
   * URL persistence for the cooking step. Uses `history.replaceState` —
   * not `router.navigate` — because `navigate` re-runs route guards and
   * triggers a full hydration on Vercel SSR, which is dramatic for what
   * is just a query-param swap. `replaceState` keeps the navigation
   * stack clean: the back button skips through historical step values
   * and lands on whatever page the user came from.
   *
   * Only active in the `cooking` phase. During setup the param is
   * meaningless (no step to point at) and writing it would muddle the
   * setup URL. SSR is skipped via the `isBrowser` guard — `history` is
   * undefined on the server.
   */
  constructor() {
    effect(() => {
      if (!this.isBrowser) return;
      if (this.phase() !== 'cooking') return;
      const step = this.currentStep();
      const url = new URL(window.location.href);
      url.searchParams.set('step', String(step));
      window.history.replaceState({}, '', url.toString());
    });
  }

  /**
   * Pantry hydration. Eager fetch on the browser so by the time the user
   * reaches the finish dialog the overlay is already in hand; on the
   * server `pantry.list` would 401 (no auth header in Analog's page-server
   * fetch — see `cook.[recipeId].server.ts` for the full story), so the
   * browser-only guard short-circuits SSR. Failure surfaces as an empty
   * array: the dialog then marks every ingredient "not in pantry" and the
   * user confirms what they used by hand.
   */
  private readonly pantryItems = toSignal(
    this.isBrowser
      ? from(this.pantryTrpc.pantry.list.query()).pipe(
          catchError(() => of<PantryItemWithIngredient[]>([])),
        )
      : of<PantryItemWithIngredient[]>([]),
    { initialValue: [] as PantryItemWithIngredient[] },
  );

  /**
   * Recipe ingredients joined with current pantry state — drives the
   * confirm dialog at finish time. A computed signal means a click on
   * "Done" lands on the current snapshot without re-fetching, and the
   * dialog opens instantly once pantry has resolved.
   */
  protected readonly enrichedIngredients = computed<CookingRecipeIngredient[]>(
    () => {
      const recipe = this.recipe();
      const pantryMap = new Map(
        this.pantryItems().map((p) => [
          p.ingredientCatalogId,
          { quantity: p.quantity, unit: p.unit },
        ]),
      );
      return recipe.ingredients.map((ri) => ({
        id: ri.id,
        ingredientCatalogId: ri.ingredient.id,
        quantity: ri.quantity,
        unit: ri.unit,
        notes: ri.notes,
        ingredient: ri.ingredient,
        pantryAvailable: pantryMap.get(ri.ingredient.id) ?? null,
      }));
    },
  );

  protected readonly setServings = (value: number): void => {
    this.servings.set(value);
  };

  protected readonly nextStep = (): void => {
    this.currentStep.update((n) => Math.min(n + 1, this.steps().length - 1));
  };

  protected readonly prevStep = (): void => {
    this.currentStep.update((n) => Math.max(n - 1, 0));
  };

  /**
   * Wired to `cdkListbox`'s value-change event. The listbox emits the new
   * selection as an array (cdk supports multi-select); single-select here
   * means we take the first element. Clamped against the step bounds even
   * though cdk guarantees the value matches an existing `cdkOption` — a
   * stale recipe payload from cache could in theory yield an index past
   * the current `steps().length`.
   */
  protected readonly onStepSelect = (index: number): void => {
    const clamped = Math.max(0, Math.min(index, this.steps().length - 1));
    this.currentStep.set(clamped);
  };

  protected readonly onStart = (): void => {
    if (this.isStarting()) return;
    this.isStarting.set(true);
    // `from(trpc.X.mutate(...))` is the canonical pattern — `@analogjs/trpc`
    // procedures return RxJS Observables at runtime even though the
    // injection-token interfaces declare `Promise<T>`. Bare `await` on the
    // call resolves to the Observable instance (no subscription, no fetch),
    // so without `from` + an explicit subscribe the request would never
    // leave the browser. See `.ai/11_trpc.md` "Procedures return
    // Observables".
    from(
      this.trpc.cookingSession.start.mutate({
        recipeId: this.recipe().id,
        servings: this.servings(),
      }),
    )
      .pipe(
        tap((result) => {
          this.sessionId.set(result.sessionId);
          this.phase.set('cooking');
          // Seed from `?step=N` (clamped at construction) so a shared
          // URL deep-links into the right step. With no param this
          // resolves to 0 — same as before.
          this.currentStep.set(this.initialStep);
        }),
        catchError(() => {
          this.snackBar.open('Failed to start cooking session.', 'OK', {
            duration: 4000,
          });
          return EMPTY;
        }),
        finalize(() => this.isStarting.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  };

  protected readonly onFinish = (): void => {
    const sessionId = this.sessionId();
    if (!sessionId || this.isCompleting()) return;

    const ref = this.dialog.open<
      IngredientConfirmDialogComponent,
      IngredientConfirmDialogData,
      IngredientConfirmDialogResult
    >(IngredientConfirmDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        ingredients: this.enrichedIngredients(),
        ratio: this.servings() / this.recipeServings(),
      },
    });

    ref
      .afterClosed()
      .pipe(
        // Cancel from the dialog closes with `null` — drop those so we never
        // dispatch a complete with an empty payload.
        filter(
          (consumed): consumed is NonNullable<IngredientConfirmDialogResult> =>
            consumed !== null && consumed !== undefined,
        ),
        tap(() => this.isCompleting.set(true)),
        switchMap((consumed) =>
          from(
            this.trpc.cookingSession.complete.mutate({
              sessionId,
              consumed: [...consumed],
            }),
          ).pipe(
            tap(() => {
              this.authStore.loadCounts();
              this.snackBar.open('Cooking complete — pantry updated.', 'OK', {
                duration: 3000,
              });
              this.router.navigate([URLS.DASHBOARD]);
            }),
            catchError(() => {
              this.snackBar.open('Failed to save. Try again.', 'OK', {
                duration: 4000,
              });
              return EMPTY;
            }),
            finalize(() => this.isCompleting.set(false)),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  };
}
