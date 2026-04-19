import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
import { PantryItemCreateNestedManyWithoutIngredientInputObjectSchema as PantryItemCreateNestedManyWithoutIngredientInputObjectSchema } from './PantryItemCreateNestedManyWithoutIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      externalId: z.string().optional().nullable(),
      name: z.string(),
      normalizedName: z.string(),
      description: z.string().optional().nullable(),
      imageUrl: z.string().optional().nullable(),
      category: IngredientCategorySchema.optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      pantryItems: z
        .lazy(
          () => PantryItemCreateNestedManyWithoutIngredientInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogCreateWithoutRecipeIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogCreateWithoutRecipeIngredientsInput>;
export const IngredientCatalogCreateWithoutRecipeIngredientsInputObjectZodSchema =
  makeSchema();
