import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RecipeOrderByWithRelationInputObjectSchema as RecipeOrderByWithRelationInputObjectSchema } from './RecipeOrderByWithRelationInput.schema';
import { IngredientCatalogOrderByWithRelationInputObjectSchema as IngredientCatalogOrderByWithRelationInputObjectSchema } from './IngredientCatalogOrderByWithRelationInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      ingredientCatalogId: SortOrderSchema.optional(),
      quantity: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      unit: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      notes: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      recipe: z
        .lazy(() => RecipeOrderByWithRelationInputObjectSchema)
        .optional(),
      ingredient: z
        .lazy(() => IngredientCatalogOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeIngredientOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RecipeIngredientOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientOrderByWithRelationInput>;
export const RecipeIngredientOrderByWithRelationInputObjectZodSchema =
  makeSchema();
