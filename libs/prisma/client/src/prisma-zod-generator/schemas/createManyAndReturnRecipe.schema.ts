import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeSelectObjectSchema as RecipeSelectObjectSchema } from './objects/RecipeSelect.schema';
import { RecipeCreateManyInputObjectSchema as RecipeCreateManyInputObjectSchema } from './objects/RecipeCreateManyInput.schema';

export const RecipeCreateManyAndReturnSchema: z.ZodType<Prisma.RecipeCreateManyAndReturnArgs> =
  z
    .object({
      select: RecipeSelectObjectSchema.optional(),
      data: z.union([
        RecipeCreateManyInputObjectSchema,
        z.array(RecipeCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCreateManyAndReturnArgs>;

export const RecipeCreateManyAndReturnZodSchema = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    data: z.union([
      RecipeCreateManyInputObjectSchema,
      z.array(RecipeCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
