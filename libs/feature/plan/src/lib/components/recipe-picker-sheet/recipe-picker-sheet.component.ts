import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { firstValueFrom, from } from 'rxjs';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  RECIPES_TRPC,
  RecipeMatchCardCompactComponent,
} from '@kookio/feature-recipes';
import type { RecipeMatchItem, RecipeMatchLevel } from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';

const PAGE_SIZE = 20;

/**
 * Pixel height handed to `cdk-virtual-scroll-viewport` for each item.
 * Same value as the desktop sidebar so both surfaces render the
 * `<kookio-recipe-match-card-compact>` with consistent vertical rhythm.
 */
const ITEM_SIZE_PX = 72;

/**
 * When the visible window comes within this many items of the loaded
 * tail, trigger another page fetch. Mirrors the desktop sidebar's
 * threshold.
 */
const PREFETCH_THRESHOLD = 5;

/**
 * Bottom-sheet content used by the planner to pick a recipe for a slot
 * on mobile. Mirrors the desktop sidebar: pantry-aware `recipes.match`
 * feed with the same A/B/C level toggle, the same
 * `<kookio-recipe-match-card-compact>` rows, and virtual scroll via
 * `cdk-virtual-scroll-viewport`. The opener (`onSlotClick` in
 * `PlanCalendarComponent`) reads the dismissed `RecipeMatchItem` and
 * forwards it to `PlanStore.setSlot`.
 *
 * No drag-drop here (the sheet is tap-to-select), so the cdkDrag-on-
 * *cdkVirtualFor structural constraint that drove the desktop sidebar
 * design doesn't apply — but virtual scroll is still worth having for
 * memory on long feeds and for visual consistency with the sidebar.
 */
@Component({
  selector: 'kookio-recipe-picker-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ScrollingModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    KookioIconComponent,
    RecipeMatchCardCompactComponent,
  ],
  templateUrl: './recipe-picker-sheet.component.html',
  styleUrl: './recipe-picker-sheet.component.scss',
})
export class RecipePickerSheetComponent {
  private readonly trpc = inject(RECIPES_TRPC);
  private readonly sheetRef =
    inject<
      MatBottomSheetRef<RecipePickerSheetComponent, RecipeMatchItem | null>
    >(MatBottomSheetRef);

  /**
   * Match level for the sheet. Default `A` (Alright to cook — pantry
   * covers every ingredient) so mobile users see "use what you have"
   * first, matching the desktop sidebar's default.
   */
  protected readonly level = signal<RecipeMatchLevel>('A');

  protected readonly levelHint = computed(() => {
    switch (this.level()) {
      case 'A':
        return 'Recipes you can cook with what you already have.';
      case 'B':
        return "Recipes where you're missing 1–3 ingredients.";
      case 'C':
        return 'Browse all available recipes.';
    }
  });

  protected readonly items = signal<RecipeMatchItem[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly nextCursor = signal<string | null>(null);
  protected readonly hasLoadedOnce = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly itemSize = ITEM_SIZE_PX;

  /**
   * Reference to the inline `cdk-virtual-scroll-viewport`. Same
   * rendered-range-based prefetch pattern as the desktop sidebar — we
   * compare `getRenderedRange().end` (index past the last rendered
   * item) against the loaded total, not the first-visible index.
   */
  private readonly viewport = viewChild(CdkVirtualScrollViewport);

  /**
   * Monotonic counter incremented on every fetch kick-off so a stale
   * response (e.g. level A's page-1 still in flight when the user flips
   * to level B) gets dropped instead of mutating the wrong-level items.
   * The RxJS equivalent is `switchMap` on a reset stream; this mirrors
   * the same last-wins guarantee in imperative async/await code.
   */
  private requestVersion = 0;

  protected readonly trackById = (_: number, item: RecipeMatchItem): string =>
    item.id;

  private readonly fetchPage = async (): Promise<void> => {
    const myVersion = ++this.requestVersion;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const cursor = this.nextCursor();
      // `@analogjs/trpc` exposes procedures as Observables, not Promises.
      // Awaiting the bare call resolves to the Observable itself, leaving
      // `page.items` undefined — wrapping with `from()` + `firstValueFrom`
      // works for both Observable and Promise return shapes.
      const page = await firstValueFrom(
        from(
          this.trpc.recipes.match.query({
            level: this.level(),
            limit: PAGE_SIZE,
            ...(cursor ? { cursor } : {}),
          }),
        ),
      );
      if (myVersion !== this.requestVersion) return;
      this.items.update((prev) => [...prev, ...page.items]);
      this.nextCursor.set(page.nextCursor);
      this.hasLoadedOnce.set(true);
    } catch (err) {
      if (myVersion !== this.requestVersion) return;
      this.errorMessage.set(
        err instanceof Error && err.message
          ? err.message
          : 'Could not load recipes',
      );
    } finally {
      if (myVersion === this.requestVersion) this.isLoading.set(false);
    }
  };

  constructor() {
    // Tracking `level()` drives both the initial load (effect runs once
    // with the default value) and the reset+refetch when the toggle
    // flips. `untracked` so the reset writes don't re-trigger the effect.
    // `fetchPage` always proceeds — the version counter discards any
    // previous in-flight result when its resolve loses the race.
    effect(() => {
      this.level();
      untracked(() => {
        this.items.set([]);
        this.nextCursor.set(null);
        this.hasLoadedOnce.set(false);
        this.errorMessage.set(null);
        this.fetchPage();
      });
    });
  }

  protected readonly onLevelChange = (next: RecipeMatchLevel): void => {
    this.level.set(next);
  };

  protected readonly onSelect = (recipe: RecipeMatchItem): void => {
    this.sheetRef.dismiss(recipe);
  };

  protected readonly onCancel = (): void => {
    this.sheetRef.dismiss(null);
  };

  /**
   * Prefetch the next page when the rendered tail is within
   * `PREFETCH_THRESHOLD` of the loaded total. Same algorithm as the
   * desktop sidebar — see the rendered-range refactor commit for why
   * we don't use the `scrolledIndexChange`-emitted index directly.
   */
  protected readonly onScrolledIndexChange = (): void => {
    const viewport = this.viewport();
    if (!viewport) return;
    const total = this.items().length;
    if (
      total > PREFETCH_THRESHOLD &&
      total - viewport.getRenderedRange().end <= PREFETCH_THRESHOLD &&
      this.nextCursor() !== null &&
      !this.isLoading() &&
      this.errorMessage() === null
    ) {
      this.fetchPage();
    }
  };
}
