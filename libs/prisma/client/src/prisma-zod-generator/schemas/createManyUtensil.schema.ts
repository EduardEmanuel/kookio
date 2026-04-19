import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilCreateManyInputObjectSchema as UtensilCreateManyInputObjectSchema } from './objects/UtensilCreateManyInput.schema';

export const UtensilCreateManySchema: z.ZodType<Prisma.UtensilCreateManyArgs> =
  z
    .object({
      data: z.union([
        UtensilCreateManyInputObjectSchema,
        z.array(UtensilCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UtensilCreateManyArgs>;

export const UtensilCreateManyZodSchema = z
  .object({
    data: z.union([
      UtensilCreateManyInputObjectSchema,
      z.array(UtensilCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
