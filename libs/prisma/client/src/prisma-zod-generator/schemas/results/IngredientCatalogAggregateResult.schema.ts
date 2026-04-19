import * as z from 'zod';
export const IngredientCatalogAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      externalId: z.number(),
      name: z.number(),
      normalizedName: z.number(),
      description: z.number(),
      imageUrl: z.number(),
      category: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      recipeIngredients: z.number(),
      pantryItems: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      externalId: z.string().nullable(),
      name: z.string().nullable(),
      normalizedName: z.string().nullable(),
      description: z.string().nullable(),
      imageUrl: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      externalId: z.string().nullable(),
      name: z.string().nullable(),
      normalizedName: z.string().nullable(),
      description: z.string().nullable(),
      imageUrl: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
