// The barrel is the *heavy* surface — the dialog and form pull MatDialog,
// MatDatepicker, MatAutocomplete and the rest of the form's Material
// modules. Lightweight surfaces are exposed through sub-paths so a
// consumer that only needs the store or expiration helpers (e.g. a
// dashboard widget) does not drag the form's Material graph into its
// route's SSR module graph:
//
//   - `@kookio/feature-pantry/store`      → PantryStore
//   - `@kookio/feature-pantry/expiration` → expiration helpers
//   - `@kookio/feature-pantry/trpc`       → PANTRY_TRPC token + types
//
// The eager re-export of `pantry-trpc.ts` previously added 25-30s to
// /login cold-start; the same hazard applies to the store and the
// expiration utils once anything outside `/pantry` consumes them.
export * from './lib/components/pantry-dialog/pantry-dialog.component';
export * from './lib/components/pantry-form/pantry-form.component';
export * from './lib/components/pantry-item/pantry-item.component';
