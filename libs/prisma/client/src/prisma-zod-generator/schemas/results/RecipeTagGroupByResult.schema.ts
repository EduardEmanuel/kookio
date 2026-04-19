import * as z from 'zod';
export const RecipeTagGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    recipeId: z.string(),
    tag: z.string(),
    _count: z
      .object({
        id: z.number(),
        recipeId: z.number(),
        tag: z.number(),
        recipe: z.number(),
      })
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        recipeId: z.string().nullable(),
        tag: z.string().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        recipeId: z.string().nullable(),
        tag: z.string().nullable(),
      })
      .nullable()
      .optional(),
  }),
);
