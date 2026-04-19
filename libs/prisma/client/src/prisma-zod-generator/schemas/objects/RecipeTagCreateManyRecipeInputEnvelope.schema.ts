import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeTagCreateManyRecipeInputObjectSchema as RecipeTagCreateManyRecipeInputObjectSchema } from './RecipeTagCreateManyRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => RecipeTagCreateManyRecipeInputObjectSchema),
        z.lazy(() => RecipeTagCreateManyRecipeInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RecipeTagCreateManyRecipeInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeTagCreateManyRecipeInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagCreateManyRecipeInputEnvelope>;
export const RecipeTagCreateManyRecipeInputEnvelopeObjectZodSchema =
  makeSchema();
