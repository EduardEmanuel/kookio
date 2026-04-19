import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './objects/DietaryRestrictionWhereInput.schema';

export const DietaryRestrictionDeleteManySchema: z.ZodType<Prisma.DietaryRestrictionDeleteManyArgs> =
  z
    .object({ where: DietaryRestrictionWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionDeleteManyArgs>;

export const DietaryRestrictionDeleteManyZodSchema = z
  .object({ where: DietaryRestrictionWhereInputObjectSchema.optional() })
  .strict();
