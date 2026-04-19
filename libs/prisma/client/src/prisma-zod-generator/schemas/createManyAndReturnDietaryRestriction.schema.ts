import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionSelectObjectSchema as DietaryRestrictionSelectObjectSchema } from './objects/DietaryRestrictionSelect.schema';
import { DietaryRestrictionCreateManyInputObjectSchema as DietaryRestrictionCreateManyInputObjectSchema } from './objects/DietaryRestrictionCreateManyInput.schema';

export const DietaryRestrictionCreateManyAndReturnSchema: z.ZodType<Prisma.DietaryRestrictionCreateManyAndReturnArgs> =
  z
    .object({
      select: DietaryRestrictionSelectObjectSchema.optional(),
      data: z.union([
        DietaryRestrictionCreateManyInputObjectSchema,
        z.array(DietaryRestrictionCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionCreateManyAndReturnArgs>;

export const DietaryRestrictionCreateManyAndReturnZodSchema = z
  .object({
    select: DietaryRestrictionSelectObjectSchema.optional(),
    data: z.union([
      DietaryRestrictionCreateManyInputObjectSchema,
      z.array(DietaryRestrictionCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
