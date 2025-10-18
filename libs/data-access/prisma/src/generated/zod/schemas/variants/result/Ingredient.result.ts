import * as z from 'zod';

// prettier-ignore
export const IngredientResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().int(),
    unit: z.string(),
    optional: z.boolean(),
    userId: z.string(),
    createdAt: z.date()
}).strict();

export type IngredientResultType = z.infer<typeof IngredientResultSchema>;
