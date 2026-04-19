import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './MealPlanWhereInput.schema';
import { MealPlanUpdateWithoutSlotsInputObjectSchema as MealPlanUpdateWithoutSlotsInputObjectSchema } from './MealPlanUpdateWithoutSlotsInput.schema';
import { MealPlanUncheckedUpdateWithoutSlotsInputObjectSchema as MealPlanUncheckedUpdateWithoutSlotsInputObjectSchema } from './MealPlanUncheckedUpdateWithoutSlotsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => MealPlanUpdateWithoutSlotsInputObjectSchema),
        z.lazy(() => MealPlanUncheckedUpdateWithoutSlotsInputObjectSchema),
      ]),
    })
    .strict();
export const MealPlanUpdateToOneWithWhereWithoutSlotsInputObjectSchema: z.ZodType<Prisma.MealPlanUpdateToOneWithWhereWithoutSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUpdateToOneWithWhereWithoutSlotsInput>;
export const MealPlanUpdateToOneWithWhereWithoutSlotsInputObjectZodSchema =
  makeSchema();
