import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientCreateManyIngredientInputObjectSchema as RecipeIngredientCreateManyIngredientInputObjectSchema } from './RecipeIngredientCreateManyIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => RecipeIngredientCreateManyIngredientInputObjectSchema),
        z
          .lazy(() => RecipeIngredientCreateManyIngredientInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RecipeIngredientCreateManyIngredientInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeIngredientCreateManyIngredientInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientCreateManyIngredientInputEnvelope>;
export const RecipeIngredientCreateManyIngredientInputEnvelopeObjectZodSchema =
  makeSchema();
