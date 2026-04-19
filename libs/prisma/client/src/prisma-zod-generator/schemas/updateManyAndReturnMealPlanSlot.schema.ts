import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotSelectObjectSchema as MealPlanSlotSelectObjectSchema } from './objects/MealPlanSlotSelect.schema';
import { MealPlanSlotUpdateManyMutationInputObjectSchema as MealPlanSlotUpdateManyMutationInputObjectSchema } from './objects/MealPlanSlotUpdateManyMutationInput.schema';
import { MealPlanSlotWhereInputObjectSchema as MealPlanSlotWhereInputObjectSchema } from './objects/MealPlanSlotWhereInput.schema';

export const MealPlanSlotUpdateManyAndReturnSchema: z.ZodType<Prisma.MealPlanSlotUpdateManyAndReturnArgs> =
  z
    .object({
      select: MealPlanSlotSelectObjectSchema.optional(),
      data: MealPlanSlotUpdateManyMutationInputObjectSchema,
      where: MealPlanSlotWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotUpdateManyAndReturnArgs>;

export const MealPlanSlotUpdateManyAndReturnZodSchema = z
  .object({
    select: MealPlanSlotSelectObjectSchema.optional(),
    data: MealPlanSlotUpdateManyMutationInputObjectSchema,
    where: MealPlanSlotWhereInputObjectSchema.optional(),
  })
  .strict();
