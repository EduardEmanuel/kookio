import * as z from 'zod';

// prettier-ignore
export const MealPlanInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string().optional().nullable(),
    startDate: z.date(),
    endDate: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    slots: z.array(z.unknown())
}).strict();

export type MealPlanInputType = z.infer<typeof MealPlanInputSchema>;
