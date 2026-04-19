import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemSelectObjectSchema as PantryItemSelectObjectSchema } from './objects/PantryItemSelect.schema';
import { PantryItemCreateManyInputObjectSchema as PantryItemCreateManyInputObjectSchema } from './objects/PantryItemCreateManyInput.schema';

export const PantryItemCreateManyAndReturnSchema: z.ZodType<Prisma.PantryItemCreateManyAndReturnArgs> =
  z
    .object({
      select: PantryItemSelectObjectSchema.optional(),
      data: z.union([
        PantryItemCreateManyInputObjectSchema,
        z.array(PantryItemCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemCreateManyAndReturnArgs>;

export const PantryItemCreateManyAndReturnZodSchema = z
  .object({
    select: PantryItemSelectObjectSchema.optional(),
    data: z.union([
      PantryItemCreateManyInputObjectSchema,
      z.array(PantryItemCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
