import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionSelectObjectSchema as DietaryRestrictionSelectObjectSchema } from './objects/DietaryRestrictionSelect.schema';
import { DietaryRestrictionUpdateManyMutationInputObjectSchema as DietaryRestrictionUpdateManyMutationInputObjectSchema } from './objects/DietaryRestrictionUpdateManyMutationInput.schema';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './objects/DietaryRestrictionWhereInput.schema';

export const DietaryRestrictionUpdateManyAndReturnSchema: z.ZodType<Prisma.DietaryRestrictionUpdateManyAndReturnArgs> =
  z
    .object({
      select: DietaryRestrictionSelectObjectSchema.optional(),
      data: DietaryRestrictionUpdateManyMutationInputObjectSchema,
      where: DietaryRestrictionWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionUpdateManyAndReturnArgs>;

export const DietaryRestrictionUpdateManyAndReturnZodSchema = z
  .object({
    select: DietaryRestrictionSelectObjectSchema.optional(),
    data: DietaryRestrictionUpdateManyMutationInputObjectSchema,
    where: DietaryRestrictionWhereInputObjectSchema.optional(),
  })
  .strict();
