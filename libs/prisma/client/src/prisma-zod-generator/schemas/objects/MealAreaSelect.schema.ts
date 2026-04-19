import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeFindManySchema as RecipeFindManySchema } from '../findManyRecipe.schema';
import { MealAreaCountOutputTypeArgsObjectSchema as MealAreaCountOutputTypeArgsObjectSchema } from './MealAreaCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      externalId: z.boolean().optional(),
      name: z.boolean().optional(),
      flag: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      recipes: z
        .union([z.boolean(), z.lazy(() => RecipeFindManySchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => MealAreaCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const MealAreaSelectObjectSchema: z.ZodType<Prisma.MealAreaSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaSelect>;
export const MealAreaSelectObjectZodSchema = makeSchema();
