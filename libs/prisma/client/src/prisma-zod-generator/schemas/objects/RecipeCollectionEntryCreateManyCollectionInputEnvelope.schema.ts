import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryCreateManyCollectionInputObjectSchema as RecipeCollectionEntryCreateManyCollectionInputObjectSchema } from './RecipeCollectionEntryCreateManyCollectionInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(
          () => RecipeCollectionEntryCreateManyCollectionInputObjectSchema,
        ),
        z
          .lazy(
            () => RecipeCollectionEntryCreateManyCollectionInputObjectSchema,
          )
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RecipeCollectionEntryCreateManyCollectionInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateManyCollectionInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateManyCollectionInputEnvelope>;
export const RecipeCollectionEntryCreateManyCollectionInputEnvelopeObjectZodSchema =
  makeSchema();
