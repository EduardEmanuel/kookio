import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilSelectObjectSchema as UtensilSelectObjectSchema } from './objects/UtensilSelect.schema';
import { UtensilIncludeObjectSchema as UtensilIncludeObjectSchema } from './objects/UtensilInclude.schema';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './objects/UtensilWhereUniqueInput.schema';

export const UtensilFindUniqueSchema: z.ZodType<Prisma.UtensilFindUniqueArgs> =
  z
    .object({
      select: UtensilSelectObjectSchema.optional(),
      include: UtensilIncludeObjectSchema.optional(),
      where: UtensilWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.UtensilFindUniqueArgs>;

export const UtensilFindUniqueZodSchema = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    include: UtensilIncludeObjectSchema.optional(),
    where: UtensilWhereUniqueInputObjectSchema,
  })
  .strict();
