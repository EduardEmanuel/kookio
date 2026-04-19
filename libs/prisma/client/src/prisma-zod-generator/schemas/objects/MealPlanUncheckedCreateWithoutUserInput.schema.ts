import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotUncheckedCreateNestedManyWithoutMealPlanInputObjectSchema as MealPlanSlotUncheckedCreateNestedManyWithoutMealPlanInputObjectSchema } from './MealPlanSlotUncheckedCreateNestedManyWithoutMealPlanInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string().optional().nullable(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      slots: z
        .lazy(
          () =>
            MealPlanSlotUncheckedCreateNestedManyWithoutMealPlanInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const MealPlanUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.MealPlanUncheckedCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUncheckedCreateWithoutUserInput>;
export const MealPlanUncheckedCreateWithoutUserInputObjectZodSchema =
  makeSchema();
