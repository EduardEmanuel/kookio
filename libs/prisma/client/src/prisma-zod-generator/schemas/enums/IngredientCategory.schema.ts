import * as z from 'zod';

export const IngredientCategorySchema = z.enum([
  'MEAT',
  'FISH',
  'DAIRY',
  'PRODUCE',
  'GRAINS',
  'LEGUMES',
  'SPICES',
  'CONDIMENTS',
  'HERBS',
  'NUTS',
  'BEVERAGES',
  'SWEETS',
  'OTHER',
]);

export type IngredientCategory = z.infer<typeof IngredientCategorySchema>;
