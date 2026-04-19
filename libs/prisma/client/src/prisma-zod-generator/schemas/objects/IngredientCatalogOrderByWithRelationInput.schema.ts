import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RecipeIngredientOrderByRelationAggregateInputObjectSchema as RecipeIngredientOrderByRelationAggregateInputObjectSchema } from './RecipeIngredientOrderByRelationAggregateInput.schema';
import { PantryItemOrderByRelationAggregateInputObjectSchema as PantryItemOrderByRelationAggregateInputObjectSchema } from './PantryItemOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      name: SortOrderSchema.optional(),
      normalizedName: SortOrderSchema.optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      imageUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      category: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      recipeIngredients: z
        .lazy(() => RecipeIngredientOrderByRelationAggregateInputObjectSchema)
        .optional(),
      pantryItems: z
        .lazy(() => PantryItemOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const IngredientCatalogOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.IngredientCatalogOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogOrderByWithRelationInput>;
export const IngredientCatalogOrderByWithRelationInputObjectZodSchema =
  makeSchema();
