import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanUpdateWithoutSlotsInputObjectSchema as MealPlanUpdateWithoutSlotsInputObjectSchema } from './MealPlanUpdateWithoutSlotsInput.schema';
import { MealPlanUncheckedUpdateWithoutSlotsInputObjectSchema as MealPlanUncheckedUpdateWithoutSlotsInputObjectSchema } from './MealPlanUncheckedUpdateWithoutSlotsInput.schema';
import { MealPlanCreateWithoutSlotsInputObjectSchema as MealPlanCreateWithoutSlotsInputObjectSchema } from './MealPlanCreateWithoutSlotsInput.schema';
import { MealPlanUncheckedCreateWithoutSlotsInputObjectSchema as MealPlanUncheckedCreateWithoutSlotsInputObjectSchema } from './MealPlanUncheckedCreateWithoutSlotsInput.schema';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './MealPlanWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => MealPlanUpdateWithoutSlotsInputObjectSchema),
        z.lazy(() => MealPlanUncheckedUpdateWithoutSlotsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => MealPlanCreateWithoutSlotsInputObjectSchema),
        z.lazy(() => MealPlanUncheckedCreateWithoutSlotsInputObjectSchema),
      ]),
      where: z.lazy(() => MealPlanWhereInputObjectSchema).optional(),
    })
    .strict();
export const MealPlanUpsertWithoutSlotsInputObjectSchema: z.ZodType<Prisma.MealPlanUpsertWithoutSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUpsertWithoutSlotsInput>;
export const MealPlanUpsertWithoutSlotsInputObjectZodSchema = makeSchema();
