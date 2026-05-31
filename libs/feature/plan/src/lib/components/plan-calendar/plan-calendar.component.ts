import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  Subject,
  catchError,
  exhaustMap,
  firstValueFrom,
  from,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  type CdkDragDrop,
} from '@angular/cdk/drag-drop';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MatDatepickerModule,
  type MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BreakpointService } from '@kookio/feature-shell';
import {
  RECIPES_TRPC,
  RecipeMatchCardCompactComponent,
} from '@kookio/feature-recipes';
import {
  MealSlotTypeSchema,
  type MealSlotType,
  type RecipeFeedItem,
  type RecipeMatchItem,
} from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';
import type { RecipeMatchLevel } from '@kookio/shared-utility/recipe-match-level';

import {
  PlanStore,
  localDateToUtcMidnightIso,
  slotKey,
  todayUtcMidnightIso,
  utcMidnightIsoToLocalDate,
} from '../../store/plan.store';
import { RecipePickerSheetComponent } from '../recipe-picker-sheet/recipe-picker-sheet.component';

/**
 * The single source of truth for date-formatting locale across the
 * calendar surface — feeds both:
 *  - `MAT_DATE_LOCALE` so the datepicker input + popup speak D/M/Y
 *  - `Intl.DateTimeFormat` for the column headers
 *
 * Hardcoded to `en-GB` so day-first ordering is consistent regardless
 * of the user's browser locale (a US default would silently flip to
 * M/D/Y in the picker while the columns stay D/M/Y, producing the
 * mismatch the planner just shipped a fix for).
 */
const PLAN_DATE_LOCALE = 'en-GB';

interface DayColumn {
  /** ISO datetime, UTC midnight — matches what the store keys slots by. */
  date: string;
  /**
   * Compact date label `dd/mm/yy` — locked to en-GB so day-first ordering
   * is consistent regardless of the user's browser locale (US default
   * would otherwise flip month/day and cause confusion in mixed-locale
   * teams).
   */
  dateLabel: string;
  /** Localized full date for ARIA labels (e.g. "Saturday, May 9, 2026"). */
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

/**
 * Pixel height handed to `cdk-virtual-scroll-viewport` for each sidebar
 * card. Has to be a fixed value (the experimental autosize strategy is
 * the alternative, deliberately not used) — slightly taller than the
 * compact card's intrinsic height so two-line variations don't clip.
 */
const SIDEBAR_ITEM_SIZE_PX = 72;

/** Page size for the cursor-paginated match feed in the desktop sidebar. */
const SIDEBAR_PAGE_SIZE = 20;

/**
 * When the visible window comes within this many items of the loaded
 * tail, trigger another page fetch. Mirrors `recipes-feed`'s threshold
 * — generous enough to hide network latency, tight enough that we don't
 * pre-fetch pages the user never reaches.
 */
const SIDEBAR_PREFETCH_THRESHOLD = 5;

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
    RouterLink,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    ScrollingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    KookioIconComponent,
    RecipeMatchCardCompactComponent,
  ],
  // Scope `provideNativeDateAdapter()` and the date locale to the
  // component rather than the root config — the picker is only present
  // on `/plan`, and a root-level provider would tax every route's SSR
  // cold-start. Pattern documented in `.ai/02_angular.md` under
  // "Feature-lib barrel bloat".
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: PLAN_DATE_LOCALE },
  ],
  templateUrl: './plan-calendar.component.html',
  styleUrl: './plan-calendar.component.scss',
})
export class PlanCalendarComponent {
  protected readonly store = inject(PlanStore);
  protected readonly bp = inject(BreakpointService);
  private readonly sheet = inject(MatBottomSheet);
  private readonly snackBar = inject(MatSnackBar);
  private readonly recipesTrpc = inject(RECIPES_TRPC);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly editableSlotTypes = EDITABLE_SLOT_TYPES;
  protected readonly slotLabels = SLOT_LABELS;
  protected readonly slotAbbreviations = SLOT_ABBREVIATIONS;
  protected readonly sidebarItemSize = SIDEBAR_ITEM_SIZE_PX;

  /** URL helper exposed to the template — sends the user to the recipe
   * detail page rather than straight into a cook session, so they can
   * review the steps before committing. */
  protected readonly recipeUrl = (recipeId: string): string =>
    URLS.RECIPE(recipeId);

  /**
   * Match level for the desktop sidebar. Default `Alright` (pantry
   * covers every ingredient) so the planner surfaces "use what you
   * already have" first; users planning a shopping week toggle to
   * `Almost` or `All`. Mirrors the `/recipes/match` page semantics.
   */
  protected readonly level = signal<RecipeMatchLevel>('Alright');

  protected readonly levelHint = computed(() => {
    switch (this.level()) {
      case 'Alright':
        return 'Drag recipes you can cook with what you already have.';
      case 'Almost':
        return "Recipes where you're missing 1–3 ingredients.";
      case 'All':
        return 'Browse all available recipes.';
    }
  });

  // ─── Sidebar feed state ────────────────────────────────────────────
  //
  // The sidebar inlines its own virtual-scroll viewport instead of
  // reusing `<kookio-recipes-feed>`. That keeps `cdkDrag` directly on
  // the `*cdkVirtualFor` element — CDK's canonical pattern for
  // virtual-scroll + drag-drop. The feed component wraps each item in
  // an extra `<div class="recipes-feed__item">`, which moves the
  // cdkDrag two levels below the *cdkVirtualFor root and breaks CDK's
  // drag-position math (the dragged element gets visually trapped
  // inside the viewport instead of following the cursor).
  //
  // The pagination/reset/error machinery mirrors
  // `recipes-feed.component.ts` — same RxJS shape (switchMap on reset,
  // exhaustMap on loadMore, takeUntil(reset$) to cancel in-flight
  // pages when the level toggle flips).

  protected readonly sidebarItems = signal<RecipeMatchItem[]>([]);
  protected readonly sidebarNextCursor = signal<string | null>(null);
  protected readonly sidebarHasMore = signal(true);
  protected readonly sidebarIsLoading = signal(false);
  protected readonly sidebarHasError = signal(false);

  /** Reset trigger — fires whenever `level()` changes. switchMap on this
   * stream cancels any pending fetch from the previous level. */
  private readonly sidebarReset$ = new Subject<void>();

  /** Pagination trigger — emitted from `onSidebarScrolledIndexChange`
   * when the viewport approaches the loaded tail. exhaustMap drops
   * emissions arriving while a fetch is in flight. */
  private readonly sidebarLoadMore$ = new Subject<void>();

  /**
   * Reference to the inline `cdk-virtual-scroll-viewport` so the
   * prefetch check can read `getRenderedRange().end` — the index just
   * past the *last* rendered item, which is what we actually want to
   * compare against the loaded total. Comparing against the index of
   * the first visible item (what `scrolledIndexChange` emits) tops out
   * at `total - visibleCount`, so a tight threshold never fires when
   * the viewport is tall enough to show most of the loaded items.
   */
  private readonly sidebarViewport = viewChild(CdkVirtualScrollViewport);

  protected readonly sidebarTrackById = (
    _: number,
    item: RecipeMatchItem,
  ): string => item.id;

  protected readonly sidebarRetry = (): void => {
    this.sidebarLoadMore$.next();
  };

  protected readonly onSidebarScrolledIndexChange = (): void => {
    const viewport = this.sidebarViewport();
    if (!viewport) return;
    const total = this.sidebarItems().length;
    // `total > PREFETCH_THRESHOLD` keeps tiny first pages (rare but
    // possible — e.g. level B with very few matches) from auto-
    // prefetching the moment everything renders. Without it,
    // `renderedEnd === total` on initial layout would satisfy the
    // proximity check and load every page back-to-back without any
    // real user scrolling. Mirrors the recipes-feed guard.
    if (
      total > SIDEBAR_PREFETCH_THRESHOLD &&
      total - viewport.getRenderedRange().end <= SIDEBAR_PREFETCH_THRESHOLD &&
      this.sidebarHasMore() &&
      !this.sidebarIsLoading() &&
      !this.sidebarHasError()
    ) {
      this.sidebarLoadMore$.next();
    }
  };

  private readonly fetchSidebarPage = (cursor: string | null) =>
    from(
      this.recipesTrpc.recipes.match.query({
        level: this.level(),
        ...(cursor ? { cursor } : {}),
        limit: SIDEBAR_PAGE_SIZE,
      }),
    );

  /**
   * The middle column's date — the user navigates this with the
   * arrows. The visible window is always [center - 1, center, center + 1].
   * Initialised to today so the first frame always has today centered.
   */
  protected readonly centerDate = signal(todayUtcMidnightIso());

  /**
   * The 3 visible day columns: yesterday-of-center, center, tomorrow-of-center.
   * Recomputed whenever `centerDate` changes (i.e. when arrows fire or the
   * date picker is used to jump).
   */
  protected readonly visibleDays = computed<DayColumn[]>(() => {
    const center = this.centerDate();
    const today = todayUtcMidnightIso();
    return [-1, 0, 1].map((delta) => {
      const iso = shiftDayIso(center, delta);
      const d = floorToUtcMidnight(iso);
      return {
        date: iso,
        dateLabel: new Intl.DateTimeFormat(PLAN_DATE_LOCALE, {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(d),
        ariaLabel: new Intl.DateTimeFormat(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }).format(d),
        isToday: iso === today,
      };
    });
  });

  /**
   * Center date as a JS `Date` for two-way binding with the Material date
   * picker. Uses `utcMidnightIsoToLocalDate` so the picker reads the
   * *same calendar day* the timeline highlights — without it, users in
   * negative-UTC timezones (e.g. NY, -5) see a 1-day skew between the
   * picker and the highlighted column.
   */
  protected readonly centerAsDate = computed(() =>
    utcMidnightIsoToLocalDate(this.centerDate()),
  );

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

  constructor() {
    // Surface store errors as a transient snackbar; clear after acknowledging.
    effect(() => {
      const msg = this.store.error();
      if (msg) {
        this.snackBar.open(msg, 'Dismiss', { duration: 5000 });
        this.store.clearError();
      }
    });

    // Trigger the initial slot load when the component mounts.
    queueMicrotask(() => this.store.load());

    // Reset + refetch whenever the level toggle flips. Tracking
    // `level()` inside the effect also drives the initial fetch on
    // mount (the effect runs once with the initial value).
    effect(() => {
      this.level();
      untracked(() => {
        this.sidebarItems.set([]);
        this.sidebarNextCursor.set(null);
        this.sidebarHasMore.set(true);
        this.sidebarHasError.set(false);
        this.sidebarIsLoading.set(false);
        this.sidebarReset$.next();
      });
    });

    // Reset stream: switchMap cancels any in-flight reset fetch when a
    // new level arrives — last-wins semantics.
    this.sidebarReset$
      .pipe(
        switchMap(() => {
          this.sidebarIsLoading.set(true);
          this.sidebarHasError.set(false);
          return this.fetchSidebarPage(null).pipe(
            tap((page) => {
              this.sidebarItems.set(page.items);
              this.sidebarNextCursor.set(page.nextCursor);
              this.sidebarHasMore.set(page.nextCursor !== null);
              this.sidebarIsLoading.set(false);
            }),
            catchError(() => {
              this.sidebarHasError.set(true);
              this.sidebarIsLoading.set(false);
              return of(null);
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    // Pagination stream: exhaustMap drops emissions arriving while a
    // fetch is in flight; takeUntil(reset$) cancels the inner observable
    // if a reset arrives mid-pagination so its tap never writes stale
    // items into the already-cleared state.
    this.sidebarLoadMore$
      .pipe(
        exhaustMap(() => {
          if (!this.sidebarHasMore() || this.sidebarIsLoading())
            return of(null);
          this.sidebarIsLoading.set(true);
          this.sidebarHasError.set(false);
          return this.fetchSidebarPage(this.sidebarNextCursor()).pipe(
            tap((page) => {
              this.sidebarItems.update((prev) => [...prev, ...page.items]);
              this.sidebarNextCursor.set(page.nextCursor);
              this.sidebarHasMore.set(page.nextCursor !== null);
              this.sidebarIsLoading.set(false);
            }),
            catchError(() => {
              this.sidebarHasError.set(true);
              this.sidebarIsLoading.set(false);
              return of(null);
            }),
            takeUntil(this.sidebarReset$),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected readonly onLevelChange = (next: RecipeMatchLevel): void => {
    this.level.set(next);
  };

  protected readonly onPrev = (): void => {
    this.centerDate.set(shiftDayIso(this.centerDate(), -1));
  };

  protected readonly onNext = (): void => {
    this.centerDate.set(shiftDayIso(this.centerDate(), 1));
  };

  protected readonly onToday = (): void => {
    this.centerDate.set(todayUtcMidnightIso());
  };

  /**
   * Date picker handler. Inverse of `centerAsDate` — converts the
   * picker's local-timezone `Date` back to a UTC-midnight ISO so the
   * slot-key alignment with how the planner stores dates is preserved.
   */
  protected readonly onDateChange = (
    event: MatDatepickerInputEvent<Date>,
  ): void => {
    const value = event.value;
    if (!value) return;
    this.centerDate.set(localDateToUtcMidnightIso(value));
  };

  protected readonly onSlotClick = async (
    date: string,
    slotType: MealSlotType,
  ): Promise<void> => {
    const ref = this.sheet.open(RecipePickerSheetComponent, {
      panelClass: 'plan-recipe-picker-sheet',
    });
    // The sheet dismisses with a `RecipeMatchItem` — a structural
    // superset of `RecipeFeedItem` (adds `matchInfo`). `PlanStore.setSlot`
    // accepts the wider shape because every read it does (`recipe.id`,
    // `recipe.title`, etc.) is in the narrower interface.
    const recipe = (await firstValueFrom(ref.afterDismissed())) as
      | RecipeMatchItem
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

  protected readonly onDiscardDraft = (): void => {
    this.store.discardDraft();
    this.store.load();
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
