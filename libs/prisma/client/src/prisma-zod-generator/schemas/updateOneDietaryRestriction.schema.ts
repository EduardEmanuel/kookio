import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionSelectObjectSchema as DietaryRestrictionSelectObjectSchema } from './objects/DietaryRestrictionSelect.schema';
import { DietaryRestrictionIncludeObjectSchema as DietaryRestrictionIncludeObjectSchema } from './objects/DietaryRestrictionInclude.schema';
import { DietaryRestrictionUpdateInputObjectSchema as DietaryRestrictionUpdateInputObjectSchema } from './objects/DietaryRestrictionUpdateInput.schema';
import { DietaryRestrictionUncheckedUpdateInputObjectSchema as DietaryRestrictionUncheckedUpdateInputObjectSchema } from './objects/DietaryRestrictionUncheckedUpdateInput.schema';
import { DietaryRestrictionWhereUniqueInputObjectSchema as DietaryRestrictionWhereUniqueInputObjectSchema } from './objects/DietaryRestrictionWhereUniqueInput.schema';

export const DietaryRestrictionUpdateOneSchema: z.ZodType<Prisma.DietaryRestrictionUpdateArgs> =
  z
    .object({
      select: DietaryRestrictionSelectObjectSchema.optional(),
      include: DietaryRestrictionIncludeObjectSchema.optional(),
      data: z.union([
        DietaryRestrictionUpdateInputObjectSchema,
        DietaryRestrictionUncheckedUpdateInputObjectSchema,
      ]),
      where: DietaryRestrictionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionUpdateArgs>;

export const DietaryRestrictionUpdateOneZodSchema = z
  .object({
    select: DietaryRestrictionSelectObjectSchema.optional(),
    include: DietaryRestrictionIncludeObjectSchema.optional(),
    data: z.union([
      DietaryRestrictionUpdateInputObjectSchema,
      DietaryRestrictionUncheckedUpdateInputObjectSchema,
    ]),
    where: DietaryRestrictionWhereUniqueInputObjectSchema,
  })
  .strict();
