import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotScalarWhereInputObjectSchema as MealPlanSlotScalarWhereInputObjectSchema } from './MealPlanSlotScalarWhereInput.schema';
import { MealPlanSlotUpdateManyMutationInputObjectSchema as MealPlanSlotUpdateManyMutationInputObjectSchema } from './MealPlanSlotUpdateManyMutationInput.schema';
import { MealPlanSlotUncheckedUpdateManyWithoutMealPlanInputObjectSchema as MealPlanSlotUncheckedUpdateManyWithoutMealPlanInputObjectSchema } from './MealPlanSlotUncheckedUpdateManyWithoutMealPlanInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanSlotScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => MealPlanSlotUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => MealPlanSlotUncheckedUpdateManyWithoutMealPlanInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const MealPlanSlotUpdateManyWithWhereWithoutMealPlanInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUpdateManyWithWhereWithoutMealPlanInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUpdateManyWithWhereWithoutMealPlanInput>;
export const MealPlanSlotUpdateManyWithWhereWithoutMealPlanInputObjectZodSchema =
  makeSchema();
