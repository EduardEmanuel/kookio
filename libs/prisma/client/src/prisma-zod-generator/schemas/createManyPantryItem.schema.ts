import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemCreateManyInputObjectSchema as PantryItemCreateManyInputObjectSchema } from './objects/PantryItemCreateManyInput.schema';

export const PantryItemCreateManySchema: z.ZodType<Prisma.PantryItemCreateManyArgs> =
  z
    .object({
      data: z.union([
        PantryItemCreateManyInputObjectSchema,
        z.array(PantryItemCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemCreateManyArgs>;

export const PantryItemCreateManyZodSchema = z
  .object({
    data: z.union([
      PantryItemCreateManyInputObjectSchema,
      z.array(PantryItemCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
