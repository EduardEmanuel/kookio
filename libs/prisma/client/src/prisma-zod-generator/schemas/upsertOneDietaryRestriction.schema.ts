import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionSelectObjectSchema as DietaryRestrictionSelectObjectSchema } from './objects/DietaryRestrictionSelect.schema';
import { DietaryRestrictionIncludeObjectSchema as DietaryRestrictionIncludeObjectSchema } from './objects/DietaryRestrictionInclude.schema';
import { DietaryRestrictionWhereUniqueInputObjectSchema as DietaryRestrictionWhereUniqueInputObjectSchema } from './objects/DietaryRestrictionWhereUniqueInput.schema';
import { DietaryRestrictionCreateInputObjectSchema as DietaryRestrictionCreateInputObjectSchema } from './objects/DietaryRestrictionCreateInput.schema';
import { DietaryRestrictionUncheckedCreateInputObjectSchema as DietaryRestrictionUncheckedCreateInputObjectSchema } from './objects/DietaryRestrictionUncheckedCreateInput.schema';
import { DietaryRestrictionUpdateInputObjectSchema as DietaryRestrictionUpdateInputObjectSchema } from './objects/DietaryRestrictionUpdateInput.schema';
import { DietaryRestrictionUncheckedUpdateInputObjectSchema as DietaryRestrictionUncheckedUpdateInputObjectSchema } from './objects/DietaryRestrictionUncheckedUpdateInput.schema';

export const DietaryRestrictionUpsertOneSchema: z.ZodType<Prisma.DietaryRestrictionUpsertArgs> =
  z
    .object({
      select: DietaryRestrictionSelectObjectSchema.optional(),
      include: DietaryRestrictionIncludeObjectSchema.optional(),
      where: DietaryRestrictionWhereUniqueInputObjectSchema,
      create: z.union([
        DietaryRestrictionCreateInputObjectSchema,
        DietaryRestrictionUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        DietaryRestrictionUpdateInputObjectSchema,
        DietaryRestrictionUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionUpsertArgs>;

export const DietaryRestrictionUpsertOneZodSchema = z
  .object({
    select: DietaryRestrictionSelectObjectSchema.optional(),
    include: DietaryRestrictionIncludeObjectSchema.optional(),
    where: DietaryRestrictionWhereUniqueInputObjectSchema,
    create: z.union([
      DietaryRestrictionCreateInputObjectSchema,
      DietaryRestrictionUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      DietaryRestrictionUpdateInputObjectSchema,
      DietaryRestrictionUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
