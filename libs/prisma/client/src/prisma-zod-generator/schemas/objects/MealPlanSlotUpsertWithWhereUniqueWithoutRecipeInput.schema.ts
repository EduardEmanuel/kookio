import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotUpdateWithoutRecipeInputObjectSchema as MealPlanSlotUpdateWithoutRecipeInputObjectSchema } from './MealPlanSlotUpdateWithoutRecipeInput.schema';
import { MealPlanSlotUncheckedUpdateWithoutRecipeInputObjectSchema as MealPlanSlotUncheckedUpdateWithoutRecipeInputObjectSchema } from './MealPlanSlotUncheckedUpdateWithoutRecipeInput.schema';
import { MealPlanSlotCreateWithoutRecipeInputObjectSchema as MealPlanSlotCreateWithoutRecipeInputObjectSchema } from './MealPlanSlotCreateWithoutRecipeInput.schema';
import { MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema as MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema } from './MealPlanSlotUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => MealPlanSlotUpdateWithoutRecipeInputObjectSchema),
        z.lazy(() => MealPlanSlotUncheckedUpdateWithoutRecipeInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => MealPlanSlotCreateWithoutRecipeInputObjectSchema),
        z.lazy(() => MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema),
      ]),
    })
    .strict();
export const MealPlanSlotUpsertWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUpsertWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUpsertWithWhereUniqueWithoutRecipeInput>;
export const MealPlanSlotUpsertWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
