import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionCreateManyUserInputObjectSchema as RecipeCollectionCreateManyUserInputObjectSchema } from './RecipeCollectionCreateManyUserInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => RecipeCollectionCreateManyUserInputObjectSchema),
        z.lazy(() => RecipeCollectionCreateManyUserInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RecipeCollectionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateManyUserInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateManyUserInputEnvelope>;
export const RecipeCollectionCreateManyUserInputEnvelopeObjectZodSchema =
  makeSchema();
