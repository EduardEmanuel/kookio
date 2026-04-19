import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryCreateManyRecipeInputObjectSchema as RecipeCollectionEntryCreateManyRecipeInputObjectSchema } from './RecipeCollectionEntryCreateManyRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => RecipeCollectionEntryCreateManyRecipeInputObjectSchema),
        z
          .lazy(() => RecipeCollectionEntryCreateManyRecipeInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RecipeCollectionEntryCreateManyRecipeInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateManyRecipeInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateManyRecipeInputEnvelope>;
export const RecipeCollectionEntryCreateManyRecipeInputEnvelopeObjectZodSchema =
  makeSchema();
