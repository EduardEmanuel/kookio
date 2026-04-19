import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './MealPlanWhereUniqueInput.schema';
import { MealPlanCreateWithoutSlotsInputObjectSchema as MealPlanCreateWithoutSlotsInputObjectSchema } from './MealPlanCreateWithoutSlotsInput.schema';
import { MealPlanUncheckedCreateWithoutSlotsInputObjectSchema as MealPlanUncheckedCreateWithoutSlotsInputObjectSchema } from './MealPlanUncheckedCreateWithoutSlotsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MealPlanCreateWithoutSlotsInputObjectSchema),
        z.lazy(() => MealPlanUncheckedCreateWithoutSlotsInputObjectSchema),
      ]),
    })
    .strict();
export const MealPlanCreateOrConnectWithoutSlotsInputObjectSchema: z.ZodType<Prisma.MealPlanCreateOrConnectWithoutSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCreateOrConnectWithoutSlotsInput>;
export const MealPlanCreateOrConnectWithoutSlotsInputObjectZodSchema =
  makeSchema();
