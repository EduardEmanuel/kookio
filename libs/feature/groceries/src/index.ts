// The barrel exposes the *heavy* surface — `GroceryItemComponent` pulls
// `MatCheckboxModule`. Lightweight surfaces are exposed through sub-paths
// so a consumer that only needs the store or the tRPC token (e.g. the
// dashboard widget that calls `groceries.stats`) does not drag the
// checkbox's Material graph into its route's SSR module graph:
//
//   - `@kookio/feature-groceries/store` → GroceriesStore + GroceryGroup
//   - `@kookio/feature-groceries/trpc`  → GROCERIES_TRPC token + types
export * from './lib/components/grocery-item/grocery-item.component';
