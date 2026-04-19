import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
import { RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInputObjectSchema as RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInputObjectSchema } from './RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInput.schema';

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
      recipeIngredients: z
        .lazy(
          () =>
            RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUncheckedCreateWithoutPantryItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUncheckedCreateWithoutPantryItemsInput>;
export const IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectZodSchema =
  makeSchema();
