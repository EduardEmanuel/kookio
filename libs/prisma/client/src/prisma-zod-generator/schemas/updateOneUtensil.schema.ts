import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilSelectObjectSchema as UtensilSelectObjectSchema } from './objects/UtensilSelect.schema';
import { UtensilIncludeObjectSchema as UtensilIncludeObjectSchema } from './objects/UtensilInclude.schema';
import { UtensilUpdateInputObjectSchema as UtensilUpdateInputObjectSchema } from './objects/UtensilUpdateInput.schema';
import { UtensilUncheckedUpdateInputObjectSchema as UtensilUncheckedUpdateInputObjectSchema } from './objects/UtensilUncheckedUpdateInput.schema';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './objects/UtensilWhereUniqueInput.schema';

export const UtensilUpdateOneSchema: z.ZodType<Prisma.UtensilUpdateArgs> = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    include: UtensilIncludeObjectSchema.optional(),
    data: z.union([
      UtensilUpdateInputObjectSchema,
      UtensilUncheckedUpdateInputObjectSchema,
    ]),
    where: UtensilWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.UtensilUpdateArgs>;

export const UtensilUpdateOneZodSchema = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    include: UtensilIncludeObjectSchema.optional(),
    data: z.union([
      UtensilUpdateInputObjectSchema,
      UtensilUncheckedUpdateInputObjectSchema,
    ]),
    where: UtensilWhereUniqueInputObjectSchema,
  })
  .strict();
