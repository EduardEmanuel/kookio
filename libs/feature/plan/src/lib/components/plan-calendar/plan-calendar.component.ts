import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
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

import { PlanStore, slotKey } from '../../store/plan.store';
import { RecipePickerSheetComponent } from '../recipe-picker-sheet/recipe-picker-sheet.component';

interface DayCell {
  /** ISO datetime, UTC midnight — matches what the store keys slots by. */
  date: string;
  /** Day-of-month as plain integer for the tab strip glyph. */
  dayOfMonth: number;
  /** Number of populated slots out of `editableSlotTypes.length`. */
  plannedCount: number;
}

/**
 * The three slot types we expose in the planner UI today. SNACK exists in
 * the schema (and the server accepts it) but we keep the editor at a tidy
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

/** UTC midnight at the start of `iso`. Idempotent. */
const floorToUtcMidnight = (iso: string): Date => {
  const d = new Date(iso);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

/** ISO list of the [startDate, endDate] day boundaries, inclusive. */
const enumerateDays = (startIso: string, endIso: string): string[] => {
  const start = floorToUtcMidnight(startIso);
  const end = floorToUtcMidnight(endIso);
  const days: string[] = [];
  const cursor = new Date(start);
  while (cursor.getTime() <= end.getTime()) {
    days.push(cursor.toISOString());
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
};

@Component({
  selector: 'kookio-plan-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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

  protected readonly editableSlotTypes = EDITABLE_SLOT_TYPES;
  protected readonly slotLabels = SLOT_LABELS;

  /** Index into `days()` for the active day in the mobile editor. */
  protected readonly activeDayIndex = signal(0);

  /** The expanded list of days the plan covers. */
  protected readonly days = computed<DayCell[]>(() => {
    const start = this.store.startDate();
    const end = this.store.endDate();
    if (!start || !end) return [];
    const slotsByKey = this.store.slotsByKey();
    return enumerateDays(start, end).map((iso) => {
      let plannedCount = 0;
      for (const t of EDITABLE_SLOT_TYPES) {
        if (slotsByKey.has(slotKey(iso, t))) plannedCount += 1;
      }
      return {
        date: iso,
        dayOfMonth: floorToUtcMidnight(iso).getUTCDate(),
        plannedCount,
      };
    });
  });

  /** ISO of the day currently being edited on mobile. */
  protected readonly activeDay = computed(() => {
    const list = this.days();
    if (list.length === 0) return null;
    const idx = Math.min(this.activeDayIndex(), list.length - 1);
    return list[idx]?.date ?? null;
  });

  /**
   * Localized header for the active day's editor — uses the platform's
   * `Intl.DateTimeFormat` so we don't ship a translation table for weekday
   * and month names.
   */
  protected readonly activeDayLabel = computed(() => {
    const iso = this.activeDay();
    if (!iso) return '';
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso));
  });

  protected readonly slotKey = slotKey;

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
  }

  protected readonly onTabClick = (idx: number): void => {
    this.activeDayIndex.set(idx);
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

  protected readonly onClearWeek = (): void => {
    if (this.store.plannedCount() === 0) return;
    const ok =
      typeof window !== 'undefined' &&
      window.confirm(
        'Clear all planned meals for this range? This cannot be undone until you save.',
      );
    if (ok) this.store.clearAll();
  };

  protected readonly onDiscardDraft = (): void => {
    this.store.discardDraft();
    this.store.load();
  };
}
