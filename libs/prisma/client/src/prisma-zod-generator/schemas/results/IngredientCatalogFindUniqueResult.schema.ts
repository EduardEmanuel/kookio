import * as z from 'zod';
export const IngredientCatalogFindUniqueResultSchema = z.nullable(
  z.object({
    id: z.string(),
    externalId: z.string().optional(),
    name: z.string(),
    normalizedName: z.string(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    category: z.unknown().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    recipeIngredients: z.array(z.unknown()),
    pantryItems: z.array(z.unknown()),
  }),
);
