import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilSelectObjectSchema as UtensilSelectObjectSchema } from './objects/UtensilSelect.schema';
import { UtensilUpdateManyMutationInputObjectSchema as UtensilUpdateManyMutationInputObjectSchema } from './objects/UtensilUpdateManyMutationInput.schema';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './objects/UtensilWhereInput.schema';

export const UtensilUpdateManyAndReturnSchema: z.ZodType<Prisma.UtensilUpdateManyAndReturnArgs> =
  z
    .object({
      select: UtensilSelectObjectSchema.optional(),
      data: UtensilUpdateManyMutationInputObjectSchema,
      where: UtensilWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UtensilUpdateManyAndReturnArgs>;

export const UtensilUpdateManyAndReturnZodSchema = z
  .object({
    select: UtensilSelectObjectSchema.optional(),
    data: UtensilUpdateManyMutationInputObjectSchema,
    where: UtensilWhereInputObjectSchema.optional(),
  })
  .strict();
