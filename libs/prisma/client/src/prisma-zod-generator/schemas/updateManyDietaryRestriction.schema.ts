import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionUpdateManyMutationInputObjectSchema as DietaryRestrictionUpdateManyMutationInputObjectSchema } from './objects/DietaryRestrictionUpdateManyMutationInput.schema';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './objects/DietaryRestrictionWhereInput.schema';

export const DietaryRestrictionUpdateManySchema: z.ZodType<Prisma.DietaryRestrictionUpdateManyArgs> =
  z
    .object({
      data: DietaryRestrictionUpdateManyMutationInputObjectSchema,
      where: DietaryRestrictionWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionUpdateManyArgs>;

export const DietaryRestrictionUpdateManyZodSchema = z
  .object({
    data: DietaryRestrictionUpdateManyMutationInputObjectSchema,
    where: DietaryRestrictionWhereInputObjectSchema.optional(),
  })
  .strict();
