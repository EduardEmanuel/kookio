import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientSelectObjectSchema as IngredientSelectObjectSchema } from './objects/IngredientSelect.schema';
import { IngredientCreateManyInputObjectSchema as IngredientCreateManyInputObjectSchema } from './objects/IngredientCreateManyInput.schema';

export const IngredientCreateManyAndReturnSchema: z.ZodType<Prisma.IngredientCreateManyAndReturnArgs> =
  z
    .object({
      select: IngredientSelectObjectSchema.optional(),
      data: z.union([
        IngredientCreateManyInputObjectSchema,
        z.array(IngredientCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCreateManyAndReturnArgs>;

export const IngredientCreateManyAndReturnZodSchema = z
  .object({
    select: IngredientSelectObjectSchema.optional(),
    data: z.union([
      IngredientCreateManyInputObjectSchema,
      z.array(IngredientCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
