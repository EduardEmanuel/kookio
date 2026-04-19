import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeFindManySchema as RecipeFindManySchema } from '../findManyRecipe.schema';
import { MealCategoryCountOutputTypeArgsObjectSchema as MealCategoryCountOutputTypeArgsObjectSchema } from './MealCategoryCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      recipes: z
        .union([z.boolean(), z.lazy(() => RecipeFindManySchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => MealCategoryCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const MealCategoryIncludeObjectSchema: z.ZodType<Prisma.MealCategoryInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryInclude>;
export const MealCategoryIncludeObjectZodSchema = makeSchema();
