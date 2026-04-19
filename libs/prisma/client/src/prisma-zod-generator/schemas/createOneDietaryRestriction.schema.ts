import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionSelectObjectSchema as DietaryRestrictionSelectObjectSchema } from './objects/DietaryRestrictionSelect.schema';
import { DietaryRestrictionIncludeObjectSchema as DietaryRestrictionIncludeObjectSchema } from './objects/DietaryRestrictionInclude.schema';
import { DietaryRestrictionCreateInputObjectSchema as DietaryRestrictionCreateInputObjectSchema } from './objects/DietaryRestrictionCreateInput.schema';
import { DietaryRestrictionUncheckedCreateInputObjectSchema as DietaryRestrictionUncheckedCreateInputObjectSchema } from './objects/DietaryRestrictionUncheckedCreateInput.schema';

export const DietaryRestrictionCreateOneSchema: z.ZodType<Prisma.DietaryRestrictionCreateArgs> =
  z
    .object({
      select: DietaryRestrictionSelectObjectSchema.optional(),
      include: DietaryRestrictionIncludeObjectSchema.optional(),
      data: z.union([
        DietaryRestrictionCreateInputObjectSchema,
        DietaryRestrictionUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionCreateArgs>;

export const DietaryRestrictionCreateOneZodSchema = z
  .object({
    select: DietaryRestrictionSelectObjectSchema.optional(),
    include: DietaryRestrictionIncludeObjectSchema.optional(),
    data: z.union([
      DietaryRestrictionCreateInputObjectSchema,
      DietaryRestrictionUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
