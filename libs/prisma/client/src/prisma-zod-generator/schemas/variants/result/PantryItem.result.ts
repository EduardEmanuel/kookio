import * as z from 'zod';

import { MeasureUnitSchema } from '../../enums/MeasureUnit.schema';
// prettier-ignore
export const PantryItemResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    ingredientCatalogId: z.string(),
    quantity: z.number(),
    unit: MeasureUnitSchema,
    expiresAt: z.date().nullable(),
    addedAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    ingredient: z.unknown()
}).strict();

export type PantryItemResultType = z.infer<typeof PantryItemResultSchema>;
