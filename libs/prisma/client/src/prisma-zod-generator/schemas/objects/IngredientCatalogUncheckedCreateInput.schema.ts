import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
import { RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInputObjectSchema as RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInputObjectSchema } from './RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInput.schema';
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
      recipeIngredients: z.lazy(
        () =>
          RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInputObjectSchema,
      ),
      pantryItems: z.lazy(
        () =>
          PantryItemUncheckedCreateNestedManyWithoutIngredientInputObjectSchema,
      ),
    })
    .strict();
export const IngredientCatalogUncheckedCreateInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUncheckedCreateInput>;
export const IngredientCatalogUncheckedCreateInputObjectZodSchema =
  makeSchema();
