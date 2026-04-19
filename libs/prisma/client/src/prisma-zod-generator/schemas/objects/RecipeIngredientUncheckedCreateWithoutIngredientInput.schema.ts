import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      recipeId: z.string(),
      quantity: z.number().optional().nullable(),
      unit: MeasureUnitSchema.optional().nullable(),
      notes: z.string().optional().nullable(),
    })
    .strict();
export const RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUncheckedCreateWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUncheckedCreateWithoutIngredientInput>;
export const RecipeIngredientUncheckedCreateWithoutIngredientInputObjectZodSchema =
  makeSchema();
