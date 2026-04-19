import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotUpdateWithoutMealPlanInputObjectSchema as MealPlanSlotUpdateWithoutMealPlanInputObjectSchema } from './MealPlanSlotUpdateWithoutMealPlanInput.schema';
import { MealPlanSlotUncheckedUpdateWithoutMealPlanInputObjectSchema as MealPlanSlotUncheckedUpdateWithoutMealPlanInputObjectSchema } from './MealPlanSlotUncheckedUpdateWithoutMealPlanInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => MealPlanSlotUpdateWithoutMealPlanInputObjectSchema),
        z.lazy(
          () => MealPlanSlotUncheckedUpdateWithoutMealPlanInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const MealPlanSlotUpdateWithWhereUniqueWithoutMealPlanInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUpdateWithWhereUniqueWithoutMealPlanInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUpdateWithWhereUniqueWithoutMealPlanInput>;
export const MealPlanSlotUpdateWithWhereUniqueWithoutMealPlanInputObjectZodSchema =
  makeSchema();
