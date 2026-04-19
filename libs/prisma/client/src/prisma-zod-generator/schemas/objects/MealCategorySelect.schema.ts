import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeFindManySchema as RecipeFindManySchema } from '../findManyRecipe.schema';
import { MealCategoryCountOutputTypeArgsObjectSchema as MealCategoryCountOutputTypeArgsObjectSchema } from './MealCategoryCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      externalId: z.boolean().optional(),
      name: z.boolean().optional(),
      imageUrl: z.boolean().optional(),
      description: z.boolean().optional(),
      createdAt: z.boolean().optional(),
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
export const MealCategorySelectObjectSchema: z.ZodType<Prisma.MealCategorySelect> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategorySelect>;
export const MealCategorySelectObjectZodSchema = makeSchema();
