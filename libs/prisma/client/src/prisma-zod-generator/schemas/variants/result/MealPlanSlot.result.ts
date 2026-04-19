import * as z from 'zod';

import { MealSlotTypeSchema } from '../../enums/MealSlotType.schema';
// prettier-ignore
export const MealPlanSlotResultSchema = z.object({
    id: z.string(),
    mealPlanId: z.string(),
    recipeId: z.string().nullable(),
    date: z.date(),
    slotType: MealSlotTypeSchema,
    servings: z.number().int(),
    mealPlan: z.unknown(),
    recipe: z.unknown().nullable()
}).strict();

export type MealPlanSlotResultType = z.infer<typeof MealPlanSlotResultSchema>;
