import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotUpdateWithoutRecipeInputObjectSchema as MealPlanSlotUpdateWithoutRecipeInputObjectSchema } from './MealPlanSlotUpdateWithoutRecipeInput.schema';
import { MealPlanSlotUncheckedUpdateWithoutRecipeInputObjectSchema as MealPlanSlotUncheckedUpdateWithoutRecipeInputObjectSchema } from './MealPlanSlotUncheckedUpdateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => MealPlanSlotUpdateWithoutRecipeInputObjectSchema),
        z.lazy(() => MealPlanSlotUncheckedUpdateWithoutRecipeInputObjectSchema),
      ]),
    })
    .strict();
export const MealPlanSlotUpdateWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUpdateWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUpdateWithWhereUniqueWithoutRecipeInput>;
export const MealPlanSlotUpdateWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
