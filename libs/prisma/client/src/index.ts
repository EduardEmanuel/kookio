// `lib/prisma-client.ts` is intentionally NOT re-exported here. The Prisma
// client instance + retry helpers live behind `@kookio/prisma-client/server`
// so a runtime import of the root barrel from the browser cannot drag in
// `Prisma.defineExtension` (which throws on hydration). This barrel is
// browser-safe by construction: types + zod schemas only.
export * from './prisma-zod-generator/schemas/index';
// !! -- Named re-exports shadow the wildcard above — keep this order -- !!
export {
  CookingSessionFindManyResultSchema,
  DietaryRestrictionFindManyResultSchema,
  IngredientCatalogFindManyResultSchema,
  MealAreaFindManyResultSchema,
  MealCategoryFindManyResultSchema,
  MealPlanFindManyResultSchema,
  MealPlanSlotFindManyResultSchema,
  PantryItemFindManyResultSchema,
  RecipeFindManyResultSchema,
  RecipeCollectionFindManyResultSchema,
  RecipeCollectionEntryFindManyResultSchema,
  RecipeIngredientFindManyResultSchema,
  RecipeTagFindManyResultSchema,
  UserFindManyResultSchema,
  UserDietaryRestrictionFindManyResultSchema,
  UserPreferredAreaFindManyResultSchema,
  UserPreferredCategoryFindManyResultSchema,
  UserProfileFindManyResultSchema,
  UserUtensilFindManyResultSchema,
  UtensilFindManyResultSchema,
} from './lib/prisma-zod-overrides/index';
export * from './lib/types/index';
