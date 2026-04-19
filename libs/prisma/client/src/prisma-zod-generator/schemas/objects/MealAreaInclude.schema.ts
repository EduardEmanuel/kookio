import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeFindManySchema as RecipeFindManySchema } from '../findManyRecipe.schema';
import { MealAreaCountOutputTypeArgsObjectSchema as MealAreaCountOutputTypeArgsObjectSchema } from './MealAreaCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
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
export const MealAreaIncludeObjectSchema: z.ZodType<Prisma.MealAreaInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaInclude>;
export const MealAreaIncludeObjectZodSchema = makeSchema();
