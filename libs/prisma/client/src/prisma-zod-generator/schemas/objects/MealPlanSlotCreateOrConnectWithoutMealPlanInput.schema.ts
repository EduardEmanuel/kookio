import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotCreateWithoutMealPlanInputObjectSchema as MealPlanSlotCreateWithoutMealPlanInputObjectSchema } from './MealPlanSlotCreateWithoutMealPlanInput.schema';
import { MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema as MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema } from './MealPlanSlotUncheckedCreateWithoutMealPlanInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MealPlanSlotCreateWithoutMealPlanInputObjectSchema),
        z.lazy(
          () => MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const MealPlanSlotCreateOrConnectWithoutMealPlanInputObjectSchema: z.ZodType<Prisma.MealPlanSlotCreateOrConnectWithoutMealPlanInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCreateOrConnectWithoutMealPlanInput>;
export const MealPlanSlotCreateOrConnectWithoutMealPlanInputObjectZodSchema =
  makeSchema();
