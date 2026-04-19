import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotUncheckedCreateNestedManyWithoutMealPlanInputObjectSchema as MealPlanSlotUncheckedCreateNestedManyWithoutMealPlanInputObjectSchema } from './MealPlanSlotUncheckedCreateNestedManyWithoutMealPlanInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      name: z.string().optional().nullable(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      slots: z.lazy(
        () =>
          MealPlanSlotUncheckedCreateNestedManyWithoutMealPlanInputObjectSchema,
      ),
    })
    .strict();
export const MealPlanUncheckedCreateInputObjectSchema: z.ZodType<Prisma.MealPlanUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUncheckedCreateInput>;
export const MealPlanUncheckedCreateInputObjectZodSchema = makeSchema();
