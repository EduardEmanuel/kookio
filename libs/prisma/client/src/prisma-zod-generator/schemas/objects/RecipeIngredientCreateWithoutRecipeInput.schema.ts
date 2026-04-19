import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      quantity: z.number().optional().nullable(),
      unit: MeasureUnitSchema.optional().nullable(),
      notes: z.string().optional().nullable(),
      ingredient: z.lazy(
        () =>
          IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInputObjectSchema,
      ),
    })
    .strict();
export const RecipeIngredientCreateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeIngredientCreateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientCreateWithoutRecipeInput>;
export const RecipeIngredientCreateWithoutRecipeInputObjectZodSchema =
  makeSchema();
