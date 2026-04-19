import * as z from 'zod';
export const PantryItemDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    ingredientCatalogId: z.string(),
    quantity: z.number(),
    unit: z.unknown(),
    expiresAt: z.date().optional(),
    addedAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    ingredient: z.unknown(),
  }),
);
