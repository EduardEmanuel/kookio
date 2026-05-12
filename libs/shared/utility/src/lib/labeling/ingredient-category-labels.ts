import {
  IngredientCategorySchema,
  type IngredientCategory,
} from '@kookio/prisma-client';

/**
 * Runtime list of every `IngredientCategory` in the schema, derived from the
 * generated zod enum. Centralised here so frontend consumers depend on the
 * small `@kookio/shared-utility` surface instead of importing the prisma
 * barrel at every call site.
 */
export const INGREDIENT_CATEGORIES = IngredientCategorySchema.options;

/**
 * Display labels — one short, capitalised word that fits a section header.
 * Exhaustive `Record` so a schema rename breaks compilation here, not in UI.
 */
export const INGREDIENT_CATEGORY_LABEL: Record<IngredientCategory, string> = {
  MEAT: 'Meat',
  FISH: 'Fish & Seafood',
  DAIRY: 'Dairy',
  PRODUCE: 'Produce',
  GRAINS: 'Grains',
  LEGUMES: 'Legumes',
  SPICES: 'Spices',
  CONDIMENTS: 'Condiments',
  HERBS: 'Herbs',
  NUTS: 'Nuts',
  BEVERAGES: 'Beverages',
  SWEETS: 'Sweets',
  OTHER: 'Other',
};

/**
 * Twemoji literal characters per category — used as the icon next to the
 * section header on the groceries page and any future surface that groups
 * ingredients by category. Exhaustive so the build:twemoji scanner picks
 * each one up and a schema rename surfaces here at compile time.
 */
export const INGREDIENT_CATEGORY_EMOJI: Record<IngredientCategory, string> = {
  MEAT: '🥩',
  FISH: '🐟',
  DAIRY: '🥛',
  PRODUCE: '🥬',
  GRAINS: '🌾',
  LEGUMES: '🫘',
  SPICES: '🌶️',
  CONDIMENTS: '🧂',
  HERBS: '🌿',
  NUTS: '🥜',
  BEVERAGES: '🥤',
  SWEETS: '🍰',
  OTHER: '📦',
};

/** Fallbacks used when `IngredientCatalog.category` is null on a row. */
export const UNCATEGORIZED_LABEL = 'Other';
export const UNCATEGORIZED_EMOJI = '📦';

export const formatIngredientCategoryLabel = (
  cat: IngredientCategory | null,
): string => (cat ? INGREDIENT_CATEGORY_LABEL[cat] : UNCATEGORIZED_LABEL);

export const formatIngredientCategoryEmoji = (
  cat: IngredientCategory | null,
): string => (cat ? INGREDIENT_CATEGORY_EMOJI[cat] : UNCATEGORIZED_EMOJI);
