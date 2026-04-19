import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      recipes: z.boolean().optional(),
    })
    .strict();
export const MealCategoryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.MealCategoryCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryCountOutputTypeSelect>;
export const MealCategoryCountOutputTypeSelectObjectZodSchema = makeSchema();
