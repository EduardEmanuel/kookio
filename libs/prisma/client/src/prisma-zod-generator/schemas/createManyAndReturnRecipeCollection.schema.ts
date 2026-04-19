import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionSelectObjectSchema as RecipeCollectionSelectObjectSchema } from './objects/RecipeCollectionSelect.schema';
import { RecipeCollectionCreateManyInputObjectSchema as RecipeCollectionCreateManyInputObjectSchema } from './objects/RecipeCollectionCreateManyInput.schema';

export const RecipeCollectionCreateManyAndReturnSchema: z.ZodType<Prisma.RecipeCollectionCreateManyAndReturnArgs> =
  z
    .object({
      select: RecipeCollectionSelectObjectSchema.optional(),
      data: z.union([
        RecipeCollectionCreateManyInputObjectSchema,
        z.array(RecipeCollectionCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionCreateManyAndReturnArgs>;

export const RecipeCollectionCreateManyAndReturnZodSchema = z
  .object({
    select: RecipeCollectionSelectObjectSchema.optional(),
    data: z.union([
      RecipeCollectionCreateManyInputObjectSchema,
      z.array(RecipeCollectionCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
