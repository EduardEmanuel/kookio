import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealCategorySelectObjectSchema as MealCategorySelectObjectSchema } from './MealCategorySelect.schema';
import { MealCategoryIncludeObjectSchema as MealCategoryIncludeObjectSchema } from './MealCategoryInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => MealCategorySelectObjectSchema).optional(),
      include: z.lazy(() => MealCategoryIncludeObjectSchema).optional(),
    })
    .strict();
export const MealCategoryArgsObjectSchema = makeSchema();
export const MealCategoryArgsObjectZodSchema = makeSchema();
