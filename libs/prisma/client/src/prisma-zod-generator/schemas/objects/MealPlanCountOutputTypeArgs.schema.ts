import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanCountOutputTypeSelectObjectSchema as MealPlanCountOutputTypeSelectObjectSchema } from './MealPlanCountOutputTypeSelect.schema';

const makeSchema = () =>
  z
    .object({
      select: z
        .lazy(() => MealPlanCountOutputTypeSelectObjectSchema)
        .optional(),
    })
    .strict();
export const MealPlanCountOutputTypeArgsObjectSchema = makeSchema();
export const MealPlanCountOutputTypeArgsObjectZodSchema = makeSchema();
