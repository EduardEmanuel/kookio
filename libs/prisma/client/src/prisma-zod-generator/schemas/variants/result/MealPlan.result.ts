import * as z from 'zod';

// prettier-ignore
export const MealPlanResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string().nullable(),
    startDate: z.date(),
    endDate: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    slots: z.array(z.unknown())
}).strict();

export type MealPlanResultType = z.infer<typeof MealPlanResultSchema>;
