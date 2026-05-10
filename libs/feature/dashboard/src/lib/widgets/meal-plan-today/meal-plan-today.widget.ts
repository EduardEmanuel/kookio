import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

import {
  PlanStore,
  slotKey,
  todayUtcMidnightIso,
  type PlanSlot,
} from '@kookio/feature-plan/store';
import { MealSlotTypeSchema, type MealSlotType } from '@kookio/prisma-client';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';

/**
 * Same three slot types the planner exposes on `/plan`. Kept duplicated
 * (rather than imported from the calendar component) because pulling the
 * calendar's heavy module graph into the dashboard would defeat the
 * `@kookio/feature-plan/store` sub-path split.
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

interface TodayRow {
  type: MealSlotType;
  label: string;
  slot: PlanSlot | null;
}

@Component({
  selector: 'kookio-meal-plan-today-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './meal-plan-today.widget.html',
  styleUrl: './meal-plan-today.widget.scss',
})
export class MealPlanTodayWidgetComponent {
  protected readonly store = inject(PlanStore);

  /**
   * UTC date used to look up today's slots. The planner stores every slot
   * date at UTC midnight, so we floor the same way to keep both views
   * agreeing on what "today" means for users in non-UTC timezones.
   */
  protected readonly todayIso = todayUtcMidnightIso();

  protected readonly todayRows = computed<TodayRow[]>(() => {
    const slotsByKey = this.store.slotsByKey();
    return EDITABLE_SLOT_TYPES.map((type) => ({
      type,
      label: SLOT_LABELS[type],
      slot: slotsByKey.get(slotKey(this.todayIso, type)) ?? null,
    }));
  });

  protected readonly plannedToday = computed(
    () => this.todayRows().filter((row) => row.slot !== null).length,
  );

  constructor() {
    // Mirrors `/dashboard`'s other widgets: load is client-only — both
    // dashboard and the planner page are gated by `authGuard` +
    // `onboardingGuard`, so SSR redirects before this widget bootstraps.
    afterNextRender(() => this.store.load());
  }
}
