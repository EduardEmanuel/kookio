import * as z from 'zod';
export const PantryItemAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      userId: z.number(),
      ingredientCatalogId: z.number(),
      quantity: z.number(),
      unit: z.number(),
      expiresAt: z.number(),
      addedAt: z.number(),
      updatedAt: z.number(),
      user: z.number(),
      ingredient: z.number(),
    })
    .optional(),
  _sum: z
    .object({
      quantity: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _avg: z
    .object({
      quantity: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      ingredientCatalogId: z.string().nullable(),
      quantity: z.number().nullable(),
      expiresAt: z.date().nullable(),
      addedAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      ingredientCatalogId: z.string().nullable(),
      quantity: z.number().nullable(),
      expiresAt: z.date().nullable(),
      addedAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
