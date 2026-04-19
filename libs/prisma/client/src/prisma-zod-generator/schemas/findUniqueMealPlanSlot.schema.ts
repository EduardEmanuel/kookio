import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotSelectObjectSchema as MealPlanSlotSelectObjectSchema } from './objects/MealPlanSlotSelect.schema';
import { MealPlanSlotIncludeObjectSchema as MealPlanSlotIncludeObjectSchema } from './objects/MealPlanSlotInclude.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './objects/MealPlanSlotWhereUniqueInput.schema';

export const MealPlanSlotFindUniqueSchema: z.ZodType<Prisma.MealPlanSlotFindUniqueArgs> =
  z
    .object({
      select: MealPlanSlotSelectObjectSchema.optional(),
      include: MealPlanSlotIncludeObjectSchema.optional(),
      where: MealPlanSlotWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotFindUniqueArgs>;

export const MealPlanSlotFindUniqueZodSchema = z
  .object({
    select: MealPlanSlotSelectObjectSchema.optional(),
    include: MealPlanSlotIncludeObjectSchema.optional(),
    where: MealPlanSlotWhereUniqueInputObjectSchema,
  })
  .strict();
