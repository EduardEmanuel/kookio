import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotCreateManyMealPlanInputObjectSchema as MealPlanSlotCreateManyMealPlanInputObjectSchema } from './MealPlanSlotCreateManyMealPlanInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => MealPlanSlotCreateManyMealPlanInputObjectSchema),
        z.lazy(() => MealPlanSlotCreateManyMealPlanInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const MealPlanSlotCreateManyMealPlanInputEnvelopeObjectSchema: z.ZodType<Prisma.MealPlanSlotCreateManyMealPlanInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCreateManyMealPlanInputEnvelope>;
export const MealPlanSlotCreateManyMealPlanInputEnvelopeObjectZodSchema =
  makeSchema();
