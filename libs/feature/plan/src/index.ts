// The barrel exposes the *heavy* surface — `PlanCalendarComponent` pulls
// MatBottomSheet, MatCard, MatSnackBar and the recipe-picker bundle. The
// store + tRPC token live behind sub-paths so a lightweight consumer
// (e.g. a future dashboard widget that only displays today's planned
// meals) can import them without paying for the calendar's Material
// graph in its route's SSR module graph. Pattern mirrors
// `@kookio/feature-pantry`.
//
//   - `@kookio/feature-plan/store` → PlanStore + slot helpers
//   - `@kookio/feature-plan/trpc`  → MEAL_PLAN_TRPC token + types
export * from './lib/components/plan-calendar/plan-calendar.component';
export * from './lib/components/recipe-picker-sheet/recipe-picker-sheet.component';
export * from './lib/plan-can-deactivate.guard';
