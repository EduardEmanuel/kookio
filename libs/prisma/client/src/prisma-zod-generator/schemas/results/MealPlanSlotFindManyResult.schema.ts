import * as z from 'zod';
export const MealPlanSlotFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      mealPlanId: z.string(),
      recipeId: z.string().optional(),
      date: z.date(),
      slotType: z.unknown(),
      servings: z.number().int(),
      mealPlan: z.unknown(),
      recipe: z.unknown().optional(),
    }),
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});
