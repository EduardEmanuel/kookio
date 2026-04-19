import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanCreateWithoutSlotsInputObjectSchema as MealPlanCreateWithoutSlotsInputObjectSchema } from './MealPlanCreateWithoutSlotsInput.schema';
import { MealPlanUncheckedCreateWithoutSlotsInputObjectSchema as MealPlanUncheckedCreateWithoutSlotsInputObjectSchema } from './MealPlanUncheckedCreateWithoutSlotsInput.schema';
import { MealPlanCreateOrConnectWithoutSlotsInputObjectSchema as MealPlanCreateOrConnectWithoutSlotsInputObjectSchema } from './MealPlanCreateOrConnectWithoutSlotsInput.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './MealPlanWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => MealPlanCreateWithoutSlotsInputObjectSchema),
          z.lazy(() => MealPlanUncheckedCreateWithoutSlotsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MealPlanCreateOrConnectWithoutSlotsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => MealPlanWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const MealPlanCreateNestedOneWithoutSlotsInputObjectSchema: z.ZodType<Prisma.MealPlanCreateNestedOneWithoutSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCreateNestedOneWithoutSlotsInput>;
export const MealPlanCreateNestedOneWithoutSlotsInputObjectZodSchema =
  makeSchema();
