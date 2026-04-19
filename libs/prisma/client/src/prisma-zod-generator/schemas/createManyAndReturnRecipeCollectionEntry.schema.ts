import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntrySelectObjectSchema as RecipeCollectionEntrySelectObjectSchema } from './objects/RecipeCollectionEntrySelect.schema';
import { RecipeCollectionEntryCreateManyInputObjectSchema as RecipeCollectionEntryCreateManyInputObjectSchema } from './objects/RecipeCollectionEntryCreateManyInput.schema';

export const RecipeCollectionEntryCreateManyAndReturnSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateManyAndReturnArgs> =
  z
    .object({
      select: RecipeCollectionEntrySelectObjectSchema.optional(),
      data: z.union([
        RecipeCollectionEntryCreateManyInputObjectSchema,
        z.array(RecipeCollectionEntryCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateManyAndReturnArgs>;

export const RecipeCollectionEntryCreateManyAndReturnZodSchema = z
  .object({
    select: RecipeCollectionEntrySelectObjectSchema.optional(),
    data: z.union([
      RecipeCollectionEntryCreateManyInputObjectSchema,
      z.array(RecipeCollectionEntryCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
