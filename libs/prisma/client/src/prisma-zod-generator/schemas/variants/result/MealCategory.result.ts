import * as z from 'zod';

// prettier-ignore
export const MealCategoryResultSchema = z.object({
    id: z.string(),
    externalId: z.string(),
    name: z.string(),
    imageUrl: z.string().nullable(),
    description: z.string().nullable(),
    createdAt: z.date(),
    recipes: z.array(z.unknown())
}).strict();

export type MealCategoryResultType = z.infer<typeof MealCategoryResultSchema>;
