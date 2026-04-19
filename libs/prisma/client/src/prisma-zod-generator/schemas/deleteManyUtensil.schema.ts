import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './objects/UtensilWhereInput.schema';

export const UtensilDeleteManySchema: z.ZodType<Prisma.UtensilDeleteManyArgs> =
  z
    .object({ where: UtensilWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.UtensilDeleteManyArgs>;

export const UtensilDeleteManyZodSchema = z
  .object({ where: UtensilWhereInputObjectSchema.optional() })
  .strict();
