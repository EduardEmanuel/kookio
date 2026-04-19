import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilSelectObjectSchema as UtensilSelectObjectSchema } from './objects/UtensilSelect.schema';
import { UtensilIncludeObjectSchema as UtensilIncludeObjectSchema } from './objects/UtensilInclude.schema';
import { UtensilCreateInputObjectSchema as UtensilCreateInputObjectSchema } from './objects/UtensilCreateInput.schema';
import { UtensilUncheckedCreateInputObjectSchema as UtensilUncheckedCreateInputObjectSchema } from './objects/UtensilUncheckedCreateInput.schema';

export const UtensilCreateOneSchema: z.ZodType<Prisma.UtensilCreateArgs> = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    include: UtensilIncludeObjectSchema.optional(),
    data: z.union([
      UtensilCreateInputObjectSchema,
      UtensilUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.UtensilCreateArgs>;

export const UtensilCreateOneZodSchema = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    include: UtensilIncludeObjectSchema.optional(),
    data: z.union([
      UtensilCreateInputObjectSchema,
      UtensilUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
