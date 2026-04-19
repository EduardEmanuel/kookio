import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilUpdateManyMutationInputObjectSchema as UtensilUpdateManyMutationInputObjectSchema } from './objects/UtensilUpdateManyMutationInput.schema';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './objects/UtensilWhereInput.schema';

export const UtensilUpdateManySchema: z.ZodType<Prisma.UtensilUpdateManyArgs> =
  z
    .object({
      data: UtensilUpdateManyMutationInputObjectSchema,
      where: UtensilWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UtensilUpdateManyArgs>;

export const UtensilUpdateManyZodSchema = z
  .object({
    data: UtensilUpdateManyMutationInputObjectSchema,
    where: UtensilWhereInputObjectSchema.optional(),
  })
  .strict();
