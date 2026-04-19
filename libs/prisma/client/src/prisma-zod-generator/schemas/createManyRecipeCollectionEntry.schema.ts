import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntryCreateManyInputObjectSchema as RecipeCollectionEntryCreateManyInputObjectSchema } from './objects/RecipeCollectionEntryCreateManyInput.schema';

export const RecipeCollectionEntryCreateManySchema: z.ZodType<Prisma.RecipeCollectionEntryCreateManyArgs> =
  z
    .object({
      data: z.union([
        RecipeCollectionEntryCreateManyInputObjectSchema,
        z.array(RecipeCollectionEntryCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateManyArgs>;

export const RecipeCollectionEntryCreateManyZodSchema = z
  .object({
    data: z.union([
      RecipeCollectionEntryCreateManyInputObjectSchema,
      z.array(RecipeCollectionEntryCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
