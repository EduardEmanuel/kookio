import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { firstValueFrom, map } from 'rxjs';

import { injectLoad, type RouteMeta } from '@analogjs/router';

import { authGuard, AuthStore, onboardingGuard } from '@kookio/feature-auth';
import { COOKING_SESSION_TRPC } from '@kookio/feature-recipes/cooking-trpc';
import {
  type IngredientConfirmDialogData,
  type IngredientConfirmDialogResult,
  IngredientConfirmDialogComponent,
} from '@kookio/feature-recipes/ingredient-confirm-dialog';
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
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    KookioIconComponent,
  ],
  templateUrl: './cook.[recipeId].page.html',
  styleUrl: './cook.[recipeId].page.scss',
})
export default class CookPage {
  private readonly trpc = inject(COOKING_SESSION_TRPC);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

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
    pickDefaultServings(this.recipe().servings ?? 4),
  );

  protected readonly recipeServings = computed(
    () => this.recipe().servings ?? 4,
  );

  protected readonly steps = computed(() => {
    const text = this.recipe().instructions ?? '';
    return text
      .split(/\r?\n+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  });

  protected readonly canPrev = computed(() => this.currentStep() > 0);
  protected readonly canNext = computed(
    () => this.currentStep() < this.steps().length - 1,
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

  protected readonly onStart = async (): Promise<void> => {
    if (this.isStarting()) return;
    this.isStarting.set(true);
    try {
      const result = await this.trpc.cookingSession.start.mutate({
        recipeId: this.recipe().id,
        servings: this.servings(),
      });
      this.sessionId.set(result.sessionId);
      this.phase.set('cooking');
      this.currentStep.set(0);
    } catch {
      this.snackBar.open('Failed to start cooking session.', 'OK', {
        duration: 4000,
      });
    } finally {
      this.isStarting.set(false);
    }
  };

  protected readonly onFinish = async (): Promise<void> => {
    const sessionId = this.sessionId();
    if (!sessionId || this.isCompleting()) return;

    const ratio = this.servings() / this.recipeServings();
    const ref = this.dialog.open<
      IngredientConfirmDialogComponent,
      IngredientConfirmDialogData,
      IngredientConfirmDialogResult
    >(IngredientConfirmDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
      data: { ingredients: this.recipe().ingredients, ratio },
    });

    const consumed = await firstValueFrom(ref.afterClosed());
    if (!consumed) return; // user cancelled — keep the cook session open

    this.isCompleting.set(true);
    try {
      await this.trpc.cookingSession.complete.mutate({
        sessionId,
        consumed: [...consumed],
      });
      this.authStore.loadCounts();
      this.snackBar.open('Cooking complete — pantry updated.', 'OK', {
        duration: 3000,
      });
      this.router.navigate([URLS.DASHBOARD]);
    } catch {
      this.snackBar.open('Failed to save. Try again.', 'OK', {
        duration: 4000,
      });
    } finally {
      this.isCompleting.set(false);
    }
  };
}
