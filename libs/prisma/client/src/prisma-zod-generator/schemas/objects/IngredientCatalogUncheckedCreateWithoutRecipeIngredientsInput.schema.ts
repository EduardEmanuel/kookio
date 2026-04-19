import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
import { PantryItemUncheckedCreateNestedManyWithoutIngredientInputObjectSchema as PantryItemUncheckedCreateNestedManyWithoutIngredientInputObjectSchema } from './PantryItemUncheckedCreateNestedManyWithoutIngredientInput.schema';

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
          () =>
            PantryItemUncheckedCreateNestedManyWithoutIngredientInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInput>;
export const IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectZodSchema =
  makeSchema();
