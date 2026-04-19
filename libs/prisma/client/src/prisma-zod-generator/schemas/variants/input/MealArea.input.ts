import * as z from 'zod';

// prettier-ignore
export const MealAreaInputSchema = z.object({
    id: z.string(),
    externalId: z.string(),
    name: z.string(),
    flag: z.string().optional().nullable(),
    createdAt: z.date(),
    recipes: z.array(z.unknown())
}).strict();

export type MealAreaInputType = z.infer<typeof MealAreaInputSchema>;
