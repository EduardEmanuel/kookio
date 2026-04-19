import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      slots: z.boolean().optional(),
    })
    .strict();
export const MealPlanCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.MealPlanCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCountOutputTypeSelect>;
export const MealPlanCountOutputTypeSelectObjectZodSchema = makeSchema();
