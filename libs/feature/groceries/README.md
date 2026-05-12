# feature-groceries

Derived shopping list. The list is recomputed from `meal plan minus pantry`
on every read; "bought" markers persist across devices via the Redis-backed
`groceriesBought` store on the tRPC context.

## Surfaces

- `@kookio/feature-groceries` — heavy components (Material modules)
- `@kookio/feature-groceries/store` — `GroceriesStore` (light)
- `@kookio/feature-groceries/trpc` — `GROCERIES_TRPC` token + types (light)
