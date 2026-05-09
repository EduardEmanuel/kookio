import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { firstValueFrom, from } from 'rxjs';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import type { RecipeFeedItem } from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';

import { MEAL_PLAN_TRPC } from '../../meal-plan-trpc';

const PAGE_SIZE = 20;

/**
 * Trigger the next page when the scroll position lands within this many
 * pixels of the list's bottom. Generous enough to start the request before
 * the user runs out of items to read; tight enough that a half-loaded
 * sheet doesn't pre-fetch everything.
 */
const PREFETCH_PIXELS = 200;

/**
 * Bottom-sheet content used by the planner to pick a recipe for a slot.
 * Pulls from `recipes.feed` (newest-first, cursor-paginated) with a
 * scroll-triggered auto-load — see `onScroll` for the rationale on why we
 * don't use CDK Virtual Scroll here. Closes itself via
 * `MatBottomSheetRef.dismiss(recipe)`; the opener resolves the returned
 * recipe to a slot mutation in `PlanStore.setSlot`.
 */

@Component({
  selector: 'kookio-recipe-picker-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    KookioIconComponent,
  ],
  templateUrl: './recipe-picker-sheet.component.html',
  styleUrl: './recipe-picker-sheet.component.scss',
})
export class RecipePickerSheetComponent {
  private readonly trpc = inject(MEAL_PLAN_TRPC);
  private readonly sheetRef =
    inject<
      MatBottomSheetRef<RecipePickerSheetComponent, RecipeFeedItem | null>
    >(MatBottomSheetRef);

  protected readonly items = signal<RecipeFeedItem[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly nextCursor = signal<string | null>(null);
  protected readonly hasLoadedOnce = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  /**
   * Field-initialised arrow keeps the project's `prefer-arrow` rule happy
   * and ensures the binding exists before the constructor's first call.
   * Field initialisers run in declaration order before the constructor
   * body, so the kick-off below is safe.
   */
  private readonly loadPage = async (): Promise<void> => {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const cursor = this.nextCursor();
      // `@analogjs/trpc` exposes procedures as Observables, not Promises.
      // Awaiting the bare call resolves to the Observable itself, leaving
      // `page.items` undefined — wrapping with `from()` + `firstValueFrom`
      // works for both Observable and Promise return shapes, mirroring the
      // pattern in pantry.store/recipes-feed.
      const page = await firstValueFrom(
        from(
          this.trpc.recipes.feed.query({
            limit: PAGE_SIZE,
            ...(cursor ? { cursor } : {}),
          }),
        ),
      );
      this.items.update((prev) => [...prev, ...page.items]);
      this.nextCursor.set(page.nextCursor);
      this.hasLoadedOnce.set(true);
    } catch (err) {
      this.errorMessage.set(
        err instanceof Error && err.message
          ? err.message
          : 'Could not load recipes',
      );
    } finally {
      this.isLoading.set(false);
    }
  };

  constructor() {
    this.loadPage();
  }

  protected readonly onSelect = (recipe: RecipeFeedItem): void => {
    this.sheetRef.dismiss(recipe);
  };

  protected readonly onCancel = (): void => {
    this.sheetRef.dismiss(null);
  };

  /**
   * Auto-load on scroll near bottom. Replaces the manual "Load more"
   * button — the `isLoading` / `nextCursor` checks make this idempotent
   * even though scroll events fire dozens of times per gesture.
   *
   * Drag-and-drop is not active inside the picker, so the
   * virtual-scroll-vs-drag concern (items unmounting mid-drag) doesn't
   * apply here; auto-load with a stable DOM is the simpler, safer
   * choice.
   */
  protected readonly onScroll = (event: Event): void => {
    if (this.isLoading() || this.nextCursor() === null) return;
    const el = event.target as HTMLElement;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - PREFETCH_PIXELS) {
      this.loadPage();
    }
  };
}
