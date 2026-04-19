import * as z from 'zod';
export const RecipeTagAggregateResultSchema = z.object({
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
});
