import * as z from 'zod';

import { MealSlotTypeSchema } from '../../enums/MealSlotType.schema';
// prettier-ignore
export const MealPlanSlotInputSchema = z.object({
    id: z.string(),
    mealPlanId: z.string(),
    recipeId: z.string().optional().nullable(),
    date: z.date(),
    slotType: MealSlotTypeSchema,
    servings: z.number().int(),
    mealPlan: z.unknown(),
    recipe: z.unknown().optional().nullable()
}).strict();

export type MealPlanSlotInputType = z.infer<typeof MealPlanSlotInputSchema>;
