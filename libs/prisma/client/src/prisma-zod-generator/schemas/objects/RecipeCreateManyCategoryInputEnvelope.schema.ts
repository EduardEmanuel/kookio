import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateManyCategoryInputObjectSchema as RecipeCreateManyCategoryInputObjectSchema } from './RecipeCreateManyCategoryInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => RecipeCreateManyCategoryInputObjectSchema),
        z.lazy(() => RecipeCreateManyCategoryInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RecipeCreateManyCategoryInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeCreateManyCategoryInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateManyCategoryInputEnvelope>;
export const RecipeCreateManyCategoryInputEnvelopeObjectZodSchema =
  makeSchema();
