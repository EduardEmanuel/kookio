import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { RecipeCreateNestedOneWithoutIngredientsInputObjectSchema as RecipeCreateNestedOneWithoutIngredientsInputObjectSchema } from './RecipeCreateNestedOneWithoutIngredientsInput.schema';
import { IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      quantity: z.number().optional().nullable(),
      unit: MeasureUnitSchema.optional().nullable(),
      notes: z.string().optional().nullable(),
      recipe: z.lazy(
        () => RecipeCreateNestedOneWithoutIngredientsInputObjectSchema,
      ),
      ingredient: z.lazy(
        () =>
          IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInputObjectSchema,
      ),
    })
    .strict();
export const RecipeIngredientCreateInputObjectSchema: z.ZodType<Prisma.RecipeIngredientCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientCreateInput>;
export const RecipeIngredientCreateInputObjectZodSchema = makeSchema();
