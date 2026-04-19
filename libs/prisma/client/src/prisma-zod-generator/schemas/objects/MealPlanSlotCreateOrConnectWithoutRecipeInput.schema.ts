import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotCreateWithoutRecipeInputObjectSchema as MealPlanSlotCreateWithoutRecipeInputObjectSchema } from './MealPlanSlotCreateWithoutRecipeInput.schema';
import { MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema as MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema } from './MealPlanSlotUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MealPlanSlotCreateWithoutRecipeInputObjectSchema),
        z.lazy(() => MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema),
      ]),
    })
    .strict();
export const MealPlanSlotCreateOrConnectWithoutRecipeInputObjectSchema: z.ZodType<Prisma.MealPlanSlotCreateOrConnectWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCreateOrConnectWithoutRecipeInput>;
export const MealPlanSlotCreateOrConnectWithoutRecipeInputObjectZodSchema =
  makeSchema();
