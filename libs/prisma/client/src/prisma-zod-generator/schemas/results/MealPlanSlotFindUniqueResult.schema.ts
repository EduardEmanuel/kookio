import * as z from 'zod';
export const MealPlanSlotFindUniqueResultSchema = z.nullable(
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
);
