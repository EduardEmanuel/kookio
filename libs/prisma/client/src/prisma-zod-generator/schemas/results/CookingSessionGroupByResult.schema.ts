import * as z from 'zod';
export const CookingSessionGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    recipeId: z.string(),
    servings: z.number().int(),
    completedAt: z.date(),
    createdAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        userId: z.number(),
        recipeId: z.number(),
        servings: z.number(),
        completedAt: z.number(),
        createdAt: z.number(),
        user: z.number(),
        recipe: z.number(),
      })
      .optional(),
    _sum: z
      .object({
        servings: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _avg: z
      .object({
        servings: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        recipeId: z.string().nullable(),
        servings: z.number().int().nullable(),
        completedAt: z.date().nullable(),
        createdAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        recipeId: z.string().nullable(),
        servings: z.number().int().nullable(),
        completedAt: z.date().nullable(),
        createdAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  }),
);
