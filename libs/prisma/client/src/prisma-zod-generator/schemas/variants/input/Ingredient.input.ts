import * as z from 'zod';

// prettier-ignore
export const IngredientInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().int(),
    unit: z.string(),
    optional: z.boolean(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type IngredientInputType = z.infer<typeof IngredientInputSchema>;
