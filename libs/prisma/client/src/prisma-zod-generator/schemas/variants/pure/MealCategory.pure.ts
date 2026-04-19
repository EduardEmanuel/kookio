import * as z from 'zod';

// prettier-ignore
export const MealCategoryModelSchema = z.object({
    id: z.string(),
    externalId: z.string(),
    name: z.string(),
    imageUrl: z.string().nullable(),
    description: z.string().nullable(),
    createdAt: z.date(),
    recipes: z.array(z.unknown())
}).strict();

export type MealCategoryPureType = z.infer<typeof MealCategoryModelSchema>;
