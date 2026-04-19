import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagSelectObjectSchema as RecipeTagSelectObjectSchema } from './objects/RecipeTagSelect.schema';
import { RecipeTagCreateManyInputObjectSchema as RecipeTagCreateManyInputObjectSchema } from './objects/RecipeTagCreateManyInput.schema';

export const RecipeTagCreateManyAndReturnSchema: z.ZodType<Prisma.RecipeTagCreateManyAndReturnArgs> =
  z
    .object({
      select: RecipeTagSelectObjectSchema.optional(),
      data: z.union([
        RecipeTagCreateManyInputObjectSchema,
        z.array(RecipeTagCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeTagCreateManyAndReturnArgs>;

export const RecipeTagCreateManyAndReturnZodSchema = z
  .object({
    select: RecipeTagSelectObjectSchema.optional(),
    data: z.union([
      RecipeTagCreateManyInputObjectSchema,
      z.array(RecipeTagCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
