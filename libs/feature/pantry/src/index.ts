// `pantry-trpc.ts` is intentionally NOT re-exported here. The token + types
// live behind the `@kookio/feature-pantry/trpc` sub-path so `app.config.ts`
// can wire `PANTRY_TRPC` without the barrel pulling MatDatepicker, MatDialog
// and the rest of the form's Material modules into every route's SSR
// module graph — the eager re-export added 25-30s to /login cold-start.
export * from './lib/components/pantry-dialog/pantry-dialog.component';
export * from './lib/components/pantry-form/pantry-form.component';
export * from './lib/components/pantry-item/pantry-item.component';
export * from './lib/store/pantry.store';
export * from './lib/utils/expiration';
export * from './lib/utils/measure-unit-label';
