import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import type { RecipeFeedItem } from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';

import { MEAL_PLAN_TRPC } from '../../meal-plan-trpc';

const PAGE_SIZE = 20;

/**
 * Bottom-sheet content used by the planner to pick a recipe for a slot.
 * Pulls from `recipes.feed` (newest-first, cursor-paginated) with a manual
 * "Load more" — virtual scroll would be overkill at the demo scale and
 * keeps the sheet's bundle footprint tight.
 *
 * Closes itself via `MatBottomSheetRef.dismiss(recipe)`. The opener resolves
 * the returned recipe to a slot mutation in `PlanStore.setSlot`.
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
      const cursor = this.nextCursor() ?? undefined;
      const page = await this.trpc.recipes.feed.query({
        limit: PAGE_SIZE,
        cursor,
      });
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

  protected readonly onLoadMore = (): void => {
    if (this.isLoading() || this.nextCursor() === null) return;
    this.loadPage();
  };
}
