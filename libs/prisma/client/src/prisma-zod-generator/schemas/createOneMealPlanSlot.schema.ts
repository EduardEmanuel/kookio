import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotSelectObjectSchema as MealPlanSlotSelectObjectSchema } from './objects/MealPlanSlotSelect.schema';
import { MealPlanSlotIncludeObjectSchema as MealPlanSlotIncludeObjectSchema } from './objects/MealPlanSlotInclude.schema';
import { MealPlanSlotCreateInputObjectSchema as MealPlanSlotCreateInputObjectSchema } from './objects/MealPlanSlotCreateInput.schema';
import { MealPlanSlotUncheckedCreateInputObjectSchema as MealPlanSlotUncheckedCreateInputObjectSchema } from './objects/MealPlanSlotUncheckedCreateInput.schema';

export const MealPlanSlotCreateOneSchema: z.ZodType<Prisma.MealPlanSlotCreateArgs> =
  z
    .object({
      select: MealPlanSlotSelectObjectSchema.optional(),
      include: MealPlanSlotIncludeObjectSchema.optional(),
      data: z.union([
        MealPlanSlotCreateInputObjectSchema,
        MealPlanSlotUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotCreateArgs>;

export const MealPlanSlotCreateOneZodSchema = z
  .object({
    select: MealPlanSlotSelectObjectSchema.optional(),
    include: MealPlanSlotIncludeObjectSchema.optional(),
    data: z.union([
      MealPlanSlotCreateInputObjectSchema,
      MealPlanSlotUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
