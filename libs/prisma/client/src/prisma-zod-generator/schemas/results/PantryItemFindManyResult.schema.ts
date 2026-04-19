import * as z from 'zod';
export const PantryItemFindManyResultSchema = z.object({
  data: z.array(
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
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});
