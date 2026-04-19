import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealCategoryCountOutputTypeSelectObjectSchema as MealCategoryCountOutputTypeSelectObjectSchema } from './MealCategoryCountOutputTypeSelect.schema';

const makeSchema = () =>
  z
    .object({
      select: z
        .lazy(() => MealCategoryCountOutputTypeSelectObjectSchema)
        .optional(),
    })
    .strict();
export const MealCategoryCountOutputTypeArgsObjectSchema = makeSchema();
export const MealCategoryCountOutputTypeArgsObjectZodSchema = makeSchema();
