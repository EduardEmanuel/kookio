import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { RecipeCreateNestedOneWithoutIngredientsInputObjectSchema as RecipeCreateNestedOneWithoutIngredientsInputObjectSchema } from './RecipeCreateNestedOneWithoutIngredientsInput.schema';

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
    })
    .strict();
export const RecipeIngredientCreateWithoutIngredientInputObjectSchema: z.ZodType<Prisma.RecipeIngredientCreateWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientCreateWithoutIngredientInput>;
export const RecipeIngredientCreateWithoutIngredientInputObjectZodSchema =
  makeSchema();
