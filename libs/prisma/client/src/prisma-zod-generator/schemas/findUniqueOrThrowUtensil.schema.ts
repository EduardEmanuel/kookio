import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilSelectObjectSchema as UtensilSelectObjectSchema } from './objects/UtensilSelect.schema';
import { UtensilIncludeObjectSchema as UtensilIncludeObjectSchema } from './objects/UtensilInclude.schema';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './objects/UtensilWhereUniqueInput.schema';

export const UtensilFindUniqueOrThrowSchema: z.ZodType<Prisma.UtensilFindUniqueOrThrowArgs> =
  z
    .object({
      select: UtensilSelectObjectSchema.optional(),
      include: UtensilIncludeObjectSchema.optional(),
      where: UtensilWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.UtensilFindUniqueOrThrowArgs>;

export const UtensilFindUniqueOrThrowZodSchema = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    include: UtensilIncludeObjectSchema.optional(),
    where: UtensilWhereUniqueInputObjectSchema,
  })
  .strict();
