import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotUpdateWithoutMealPlanInputObjectSchema as MealPlanSlotUpdateWithoutMealPlanInputObjectSchema } from './MealPlanSlotUpdateWithoutMealPlanInput.schema';
import { MealPlanSlotUncheckedUpdateWithoutMealPlanInputObjectSchema as MealPlanSlotUncheckedUpdateWithoutMealPlanInputObjectSchema } from './MealPlanSlotUncheckedUpdateWithoutMealPlanInput.schema';
import { MealPlanSlotCreateWithoutMealPlanInputObjectSchema as MealPlanSlotCreateWithoutMealPlanInputObjectSchema } from './MealPlanSlotCreateWithoutMealPlanInput.schema';
import { MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema as MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema } from './MealPlanSlotUncheckedCreateWithoutMealPlanInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => MealPlanSlotUpdateWithoutMealPlanInputObjectSchema),
        z.lazy(
          () => MealPlanSlotUncheckedUpdateWithoutMealPlanInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => MealPlanSlotCreateWithoutMealPlanInputObjectSchema),
        z.lazy(
          () => MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const MealPlanSlotUpsertWithWhereUniqueWithoutMealPlanInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUpsertWithWhereUniqueWithoutMealPlanInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUpsertWithWhereUniqueWithoutMealPlanInput>;
export const MealPlanSlotUpsertWithWhereUniqueWithoutMealPlanInputObjectZodSchema =
  makeSchema();
