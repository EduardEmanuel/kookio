import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionSelectObjectSchema as DietaryRestrictionSelectObjectSchema } from './objects/DietaryRestrictionSelect.schema';
import { DietaryRestrictionIncludeObjectSchema as DietaryRestrictionIncludeObjectSchema } from './objects/DietaryRestrictionInclude.schema';
import { DietaryRestrictionWhereUniqueInputObjectSchema as DietaryRestrictionWhereUniqueInputObjectSchema } from './objects/DietaryRestrictionWhereUniqueInput.schema';

export const DietaryRestrictionDeleteOneSchema: z.ZodType<Prisma.DietaryRestrictionDeleteArgs> =
  z
    .object({
      select: DietaryRestrictionSelectObjectSchema.optional(),
      include: DietaryRestrictionIncludeObjectSchema.optional(),
      where: DietaryRestrictionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionDeleteArgs>;

export const DietaryRestrictionDeleteOneZodSchema = z
  .object({
    select: DietaryRestrictionSelectObjectSchema.optional(),
    include: DietaryRestrictionIncludeObjectSchema.optional(),
    where: DietaryRestrictionWhereUniqueInputObjectSchema,
  })
  .strict();
