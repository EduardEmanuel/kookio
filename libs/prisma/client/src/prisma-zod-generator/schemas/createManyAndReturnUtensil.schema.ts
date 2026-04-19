import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilSelectObjectSchema as UtensilSelectObjectSchema } from './objects/UtensilSelect.schema';
import { UtensilCreateManyInputObjectSchema as UtensilCreateManyInputObjectSchema } from './objects/UtensilCreateManyInput.schema';

export const UtensilCreateManyAndReturnSchema: z.ZodType<Prisma.UtensilCreateManyAndReturnArgs> =
  z
    .object({
      select: UtensilSelectObjectSchema.optional(),
      data: z.union([
        UtensilCreateManyInputObjectSchema,
        z.array(UtensilCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UtensilCreateManyAndReturnArgs>;

export const UtensilCreateManyAndReturnZodSchema = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    data: z.union([
      UtensilCreateManyInputObjectSchema,
      z.array(UtensilCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
