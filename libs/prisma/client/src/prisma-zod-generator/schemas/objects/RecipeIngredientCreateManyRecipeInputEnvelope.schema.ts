import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientCreateManyRecipeInputObjectSchema as RecipeIngredientCreateManyRecipeInputObjectSchema } from './RecipeIngredientCreateManyRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => RecipeIngredientCreateManyRecipeInputObjectSchema),
        z.lazy(() => RecipeIngredientCreateManyRecipeInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RecipeIngredientCreateManyRecipeInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeIngredientCreateManyRecipeInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientCreateManyRecipeInputEnvelope>;
export const RecipeIngredientCreateManyRecipeInputEnvelopeObjectZodSchema =
  makeSchema();
