import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilSelectObjectSchema as UtensilSelectObjectSchema } from './objects/UtensilSelect.schema';
import { UtensilIncludeObjectSchema as UtensilIncludeObjectSchema } from './objects/UtensilInclude.schema';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './objects/UtensilWhereUniqueInput.schema';
import { UtensilCreateInputObjectSchema as UtensilCreateInputObjectSchema } from './objects/UtensilCreateInput.schema';
import { UtensilUncheckedCreateInputObjectSchema as UtensilUncheckedCreateInputObjectSchema } from './objects/UtensilUncheckedCreateInput.schema';
import { UtensilUpdateInputObjectSchema as UtensilUpdateInputObjectSchema } from './objects/UtensilUpdateInput.schema';
import { UtensilUncheckedUpdateInputObjectSchema as UtensilUncheckedUpdateInputObjectSchema } from './objects/UtensilUncheckedUpdateInput.schema';

export const UtensilUpsertOneSchema: z.ZodType<Prisma.UtensilUpsertArgs> = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    include: UtensilIncludeObjectSchema.optional(),
    where: UtensilWhereUniqueInputObjectSchema,
    create: z.union([
      UtensilCreateInputObjectSchema,
      UtensilUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      UtensilUpdateInputObjectSchema,
      UtensilUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.UtensilUpsertArgs>;

export const UtensilUpsertOneZodSchema = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    include: UtensilIncludeObjectSchema.optional(),
    where: UtensilWhereUniqueInputObjectSchema,
    create: z.union([
      UtensilCreateInputObjectSchema,
      UtensilUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      UtensilUpdateInputObjectSchema,
      UtensilUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
