// The barrel keeps the store + tRPC token surface. Components live in
// sub-paths so a consumer that only needs the store (e.g. the dashboard
// "today's plan" widget) does not drag the planner's Material graph
// (drag-drop, bottom sheet, tabs) into its route's SSR module graph —
// same hazard as `feature-pantry` documents at length.
export * from './lib/meal-plan-trpc';
export * from './lib/store/plan.store';
