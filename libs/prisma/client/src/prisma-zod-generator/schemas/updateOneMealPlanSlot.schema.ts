import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotSelectObjectSchema as MealPlanSlotSelectObjectSchema } from './objects/MealPlanSlotSelect.schema';
import { MealPlanSlotIncludeObjectSchema as MealPlanSlotIncludeObjectSchema } from './objects/MealPlanSlotInclude.schema';
import { MealPlanSlotUpdateInputObjectSchema as MealPlanSlotUpdateInputObjectSchema } from './objects/MealPlanSlotUpdateInput.schema';
import { MealPlanSlotUncheckedUpdateInputObjectSchema as MealPlanSlotUncheckedUpdateInputObjectSchema } from './objects/MealPlanSlotUncheckedUpdateInput.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './objects/MealPlanSlotWhereUniqueInput.schema';

export const MealPlanSlotUpdateOneSchema: z.ZodType<Prisma.MealPlanSlotUpdateArgs> =
  z
    .object({
      select: MealPlanSlotSelectObjectSchema.optional(),
      include: MealPlanSlotIncludeObjectSchema.optional(),
      data: z.union([
        MealPlanSlotUpdateInputObjectSchema,
        MealPlanSlotUncheckedUpdateInputObjectSchema,
      ]),
      where: MealPlanSlotWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotUpdateArgs>;

export const MealPlanSlotUpdateOneZodSchema = z
  .object({
    select: MealPlanSlotSelectObjectSchema.optional(),
    include: MealPlanSlotIncludeObjectSchema.optional(),
    data: z.union([
      MealPlanSlotUpdateInputObjectSchema,
      MealPlanSlotUncheckedUpdateInputObjectSchema,
    ]),
    where: MealPlanSlotWhereUniqueInputObjectSchema,
  })
  .strict();
