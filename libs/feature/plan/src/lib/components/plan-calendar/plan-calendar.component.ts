import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { firstValueFrom, from } from 'rxjs';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  type CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BreakpointService } from '@kookio/feature-shell';
import {
  MealSlotTypeSchema,
  type MealSlotType,
  type RecipeFeedItem,
} from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';

import { MEAL_PLAN_TRPC } from '../../meal-plan-trpc';
import { PlanStore, slotKey } from '../../store/plan.store';
import { RecipePickerSheetComponent } from '../recipe-picker-sheet/recipe-picker-sheet.component';

interface DayColumn {
  /** ISO datetime, UTC midnight — matches what the store keys slots by. */
  date: string;
  /** Day-of-month numeral, locale-independent (e.g. 9). */
  dayOfMonth: number;
  /** Localized weekday abbreviation (e.g. "Sat"). */
  weekdayShort: string;
  /** Localized full date for ARIA labels (e.g. "Saturday, May 9"). */
  ariaLabel: string;
  /** True if this column is today — drives the "today" highlight. */
  isToday: boolean;
}

/**
 * Discriminated payload attached to every CDK drag origin. The drop
 * handler reads it to decide between "set a slot" (recipe came from the
 * sidebar or another slot) and "clear a slot" (recipe was dragged onto
 * the sidebar — the bin gesture).
 *
 * Slot→slot drag uses *copy* semantics: dragging Lasagna from one cell
 * to another leaves Lasagna in both. To "move", drop the source cell
 * onto the sidebar afterwards.
 */
type DragPayload =
  | { kind: 'sidebar-recipe'; recipe: RecipeFeedItem }
  | {
      kind: 'slot';
      date: string;
      slotType: MealSlotType;
      recipe: RecipeFeedItem;
    };

const SIDEBAR_PAGE_SIZE = 20;

/**
 * The three slot types the planner exposes today. SNACK exists in the
 * schema (and the server accepts it) but we keep the editor at a tidy
 * 3 cells per day until there's a product reason to surface SNACK.
 */
const EDITABLE_SLOT_TYPES: readonly MealSlotType[] = [
  MealSlotTypeSchema.enum.BREAKFAST,
  MealSlotTypeSchema.enum.LUNCH,
  MealSlotTypeSchema.enum.DINNER,
];

const SLOT_LABELS: Record<MealSlotType, string> = {
  BREAKFAST: 'Breakfast',
  LUNCH: 'Lunch',
  DINNER: 'Dinner',
  SNACK: 'Snack',
};

const SLOT_ABBREVIATIONS: Record<MealSlotType, string> = {
  BREAKFAST: 'B',
  LUNCH: 'L',
  DINNER: 'D',
  SNACK: 'S',
};

/** UTC midnight at the start of `iso`. Idempotent. */
const floorToUtcMidnight = (iso: string): Date => {
  const d = new Date(iso);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

/** UTC midnight ISO for today's calendar day. */
const todayUtcMidnightIso = (): string => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
};

/** Add `dayDelta` days to an ISO date and return a new ISO string. */
const shiftDayIso = (iso: string, dayDelta: number): string => {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + dayDelta);
  return d.toISOString();
};

@Component({
  selector: 'kookio-plan-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    KookioIconComponent,
  ],
  templateUrl: './plan-calendar.component.html',
  styleUrl: './plan-calendar.component.scss',
})
export class PlanCalendarComponent {
  protected readonly store = inject(PlanStore);
  protected readonly bp = inject(BreakpointService);
  private readonly sheet = inject(MatBottomSheet);
  private readonly snackBar = inject(MatSnackBar);
  private readonly trpc = inject(MEAL_PLAN_TRPC);

  protected readonly editableSlotTypes = EDITABLE_SLOT_TYPES;
  protected readonly slotLabels = SLOT_LABELS;
  protected readonly slotAbbreviations = SLOT_ABBREVIATIONS;

  /**
   * The middle column's date — the user navigates this with the
   * arrows. The visible window is always [center - 1, center, center + 1].
   * Initialised to today so the first frame always has today centered.
   */
  protected readonly centerDate = signal(todayUtcMidnightIso());

  /** Recipes pulled into the desktop sidebar (newest-first feed pagination). */
  protected readonly sidebarRecipes = signal<RecipeFeedItem[]>([]);
  protected readonly sidebarLoading = signal(false);
  protected readonly sidebarNextCursor = signal<string | null>(null);
  protected readonly sidebarHasLoadedOnce = signal(false);
  protected readonly sidebarErrorMessage = signal<string | null>(null);

  protected readonly canLoadMoreSidebar = computed(
    () => this.sidebarNextCursor() !== null && !this.sidebarLoading(),
  );

  /**
   * The 3 visible day columns: yesterday-of-center, center, tomorrow-of-center.
   * Recomputed whenever `centerDate` changes (i.e. when arrows fire).
   */
  protected readonly visibleDays = computed<DayColumn[]>(() => {
    const center = this.centerDate();
    const today = todayUtcMidnightIso();
    return [-1, 0, 1].map((delta) => {
      const iso = shiftDayIso(center, delta);
      const d = floorToUtcMidnight(iso);
      return {
        date: iso,
        dayOfMonth: d.getUTCDate(),
        weekdayShort: new Intl.DateTimeFormat(undefined, {
          weekday: 'short',
        }).format(d),
        ariaLabel: new Intl.DateTimeFormat(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }).format(d),
        isToday: iso === today,
      };
    });
  });

  protected readonly slotKey = slotKey;

  /** Drag payload builders — kept as fields so the template binds tightly. */
  protected readonly slotDragPayload = (
    date: string,
    slotType: MealSlotType,
    recipe: RecipeFeedItem,
  ): DragPayload => ({ kind: 'slot', date, slotType, recipe });

  protected readonly sidebarDragPayload = (
    recipe: RecipeFeedItem,
  ): DragPayload => ({ kind: 'sidebar-recipe', recipe });

  /**
   * Reject drops on the sidebar that didn't originate from a slot. Without
   * the predicate, a sidebar item dragged briefly off and back onto its
   * own list would also fire `cdkDropListDropped` here.
   */
  protected readonly sidebarEnterPredicate = (
    drag: CdkDrag<DragPayload>,
  ): boolean => drag.data?.kind === 'slot';

  /**
   * Field-initialised arrow keeps the project's `prefer-arrow` rule happy
   * and ensures the binding exists before the constructor's first call.
   */
  private readonly loadSidebarPage = async (): Promise<void> => {
    if (this.sidebarLoading()) return;
    this.sidebarLoading.set(true);
    this.sidebarErrorMessage.set(null);
    try {
      const cursor = this.sidebarNextCursor();
      // See note in recipe-picker-sheet: @analogjs/trpc returns Observables;
      // awaiting bare leaves the resolved value as the Observable instance.
      const page = await firstValueFrom(
        from(
          this.trpc.recipes.feed.query({
            limit: SIDEBAR_PAGE_SIZE,
            ...(cursor ? { cursor } : {}),
          }),
        ),
      );
      this.sidebarRecipes.update((prev) => [...prev, ...page.items]);
      this.sidebarNextCursor.set(page.nextCursor);
      this.sidebarHasLoadedOnce.set(true);
    } catch (err) {
      this.sidebarErrorMessage.set(
        err instanceof Error && err.message
          ? err.message
          : 'Could not load recipes',
      );
    } finally {
      this.sidebarLoading.set(false);
    }
  };

  constructor() {
    // Surface store errors as a transient snackbar; clear after acknowledging.
    effect(() => {
      const msg = this.store.error();
      if (msg) {
        this.snackBar.open(msg, 'Dismiss', { duration: 5000 });
        this.store.clearError();
      }
    });

    // Trigger the initial load when the component mounts.
    queueMicrotask(() => this.store.load());

    // Pre-load the desktop sidebar lazily once the component decides it's on
    // a desktop viewport — saves the request on mobile where the sidebar is
    // not rendered. The effect re-runs if the user drags the window across
    // the breakpoint mid-session.
    effect(() => {
      if (this.bp.isDesktop() && !this.sidebarHasLoadedOnce()) {
        this.loadSidebarPage();
      }
    });
  }

  protected readonly onPrev = (): void => {
    this.centerDate.set(shiftDayIso(this.centerDate(), -1));
  };

  protected readonly onNext = (): void => {
    this.centerDate.set(shiftDayIso(this.centerDate(), 1));
  };

  protected readonly onToday = (): void => {
    this.centerDate.set(todayUtcMidnightIso());
  };

  protected readonly onSlotClick = async (
    date: string,
    slotType: MealSlotType,
  ): Promise<void> => {
    const ref = this.sheet.open(RecipePickerSheetComponent, {
      panelClass: 'plan-recipe-picker-sheet',
    });
    const recipe = (await firstValueFrom(ref.afterDismissed())) as
      | RecipeFeedItem
      | null
      | undefined;
    if (!recipe) return;
    this.store.setSlot({
      date,
      slotType,
      recipeId: recipe.id,
      recipe,
    });
  };

  protected readonly onClearSlot = (
    date: string,
    slotType: MealSlotType,
    event: Event,
  ): void => {
    event.stopPropagation();
    this.store.clearSlot(date, slotType);
  };

  protected readonly onSave = (): void => {
    this.store.submit();
  };

  protected readonly onClearAll = (): void => {
    if (this.store.plannedCount() === 0) return;
    const ok =
      typeof window !== 'undefined' &&
      window.confirm(
        'Clear all planned meals? This cannot be undone until you save.',
      );
    if (ok) this.store.clearAll();
  };

  protected readonly onDiscardDraft = (): void => {
    this.store.discardDraft();
    this.store.load();
  };

  protected readonly onLoadMoreSidebar = (): void => {
    this.loadSidebarPage();
  };

  /** Drop handler for a calendar cell. Uses copy semantics — see DragPayload. */
  protected readonly onCellDrop = (
    targetDate: string,
    targetSlotType: MealSlotType,
    event: CdkDragDrop<unknown, unknown, DragPayload>,
  ): void => {
    const payload = event.item.data;
    if (!payload) return;
    this.store.setSlot({
      date: targetDate,
      slotType: targetSlotType,
      recipeId: payload.recipe.id,
      recipe: payload.recipe,
    });
  };

  /**
   * Drop handler for the sidebar — only acts when the drag originated
   * from a slot (gated by `sidebarEnterPredicate`). The bin gesture:
   * drop a planned slot back on the sidebar to clear it.
   */
  protected readonly onSidebarDrop = (
    event: CdkDragDrop<unknown, unknown, DragPayload>,
  ): void => {
    const payload = event.item.data;
    if (!payload || payload.kind !== 'slot') return;
    this.store.clearSlot(payload.date, payload.slotType);
  };
}
