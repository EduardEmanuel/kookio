import * as z from 'zod';
export const RecipeIngredientGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    recipeId: z.string(),
    ingredientCatalogId: z.string(),
    quantity: z.number(),
    notes: z.string(),
    _count: z
      .object({
        id: z.number(),
        recipeId: z.number(),
        ingredientCatalogId: z.number(),
        quantity: z.number(),
        unit: z.number(),
        notes: z.number(),
        recipe: z.number(),
        ingredient: z.number(),
      })
      .optional(),
    _sum: z
      .object({
        quantity: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _avg: z
      .object({
        quantity: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        recipeId: z.string().nullable(),
        ingredientCatalogId: z.string().nullable(),
        quantity: z.number().nullable(),
        notes: z.string().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        recipeId: z.string().nullable(),
        ingredientCatalogId: z.string().nullable(),
        quantity: z.number().nullable(),
        notes: z.string().nullable(),
      })
      .nullable()
      .optional(),
  }),
);
