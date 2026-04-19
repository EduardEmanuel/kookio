import * as z from 'zod';
export const MealPlanSlotAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      mealPlanId: z.number(),
      recipeId: z.number(),
      date: z.number(),
      slotType: z.number(),
      servings: z.number(),
      mealPlan: z.number(),
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
      mealPlanId: z.string().nullable(),
      recipeId: z.string().nullable(),
      date: z.date().nullable(),
      servings: z.number().int().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      mealPlanId: z.string().nullable(),
      recipeId: z.string().nullable(),
      date: z.date().nullable(),
      servings: z.number().int().nullable(),
    })
    .nullable()
    .optional(),
});
