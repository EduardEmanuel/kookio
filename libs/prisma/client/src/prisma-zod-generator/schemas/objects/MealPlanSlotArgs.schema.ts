import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotSelectObjectSchema as MealPlanSlotSelectObjectSchema } from './MealPlanSlotSelect.schema';
import { MealPlanSlotIncludeObjectSchema as MealPlanSlotIncludeObjectSchema } from './MealPlanSlotInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => MealPlanSlotSelectObjectSchema).optional(),
      include: z.lazy(() => MealPlanSlotIncludeObjectSchema).optional(),
    })
    .strict();
export const MealPlanSlotArgsObjectSchema = makeSchema();
export const MealPlanSlotArgsObjectZodSchema = makeSchema();
