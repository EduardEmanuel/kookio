import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotUpdateManyMutationInputObjectSchema as MealPlanSlotUpdateManyMutationInputObjectSchema } from './objects/MealPlanSlotUpdateManyMutationInput.schema';
import { MealPlanSlotWhereInputObjectSchema as MealPlanSlotWhereInputObjectSchema } from './objects/MealPlanSlotWhereInput.schema';

export const MealPlanSlotUpdateManySchema: z.ZodType<Prisma.MealPlanSlotUpdateManyArgs> =
  z
    .object({
      data: MealPlanSlotUpdateManyMutationInputObjectSchema,
      where: MealPlanSlotWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotUpdateManyArgs>;

export const MealPlanSlotUpdateManyZodSchema = z
  .object({
    data: MealPlanSlotUpdateManyMutationInputObjectSchema,
    where: MealPlanSlotWhereInputObjectSchema.optional(),
  })
  .strict();
