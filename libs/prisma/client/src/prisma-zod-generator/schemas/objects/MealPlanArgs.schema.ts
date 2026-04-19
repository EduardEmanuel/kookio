import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSelectObjectSchema as MealPlanSelectObjectSchema } from './MealPlanSelect.schema';
import { MealPlanIncludeObjectSchema as MealPlanIncludeObjectSchema } from './MealPlanInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => MealPlanSelectObjectSchema).optional(),
      include: z.lazy(() => MealPlanIncludeObjectSchema).optional(),
    })
    .strict();
export const MealPlanArgsObjectSchema = makeSchema();
export const MealPlanArgsObjectZodSchema = makeSchema();
