import * as z from 'zod';

// prettier-ignore
export const MealCategoryInputSchema = z.object({
    id: z.string(),
    externalId: z.string(),
    name: z.string(),
    imageUrl: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    createdAt: z.date(),
    recipes: z.array(z.unknown())
}).strict();

export type MealCategoryInputType = z.infer<typeof MealCategoryInputSchema>;
