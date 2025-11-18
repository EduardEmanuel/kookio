import * as z from 'zod';

// prettier-ignore
export const IngredientModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().int(),
    unit: z.string(),
    optional: z.boolean(),
    userId: z.string(),
    createdAt: z.date()
}).strict();

export type IngredientPureType = z.infer<typeof IngredientModelSchema>;
