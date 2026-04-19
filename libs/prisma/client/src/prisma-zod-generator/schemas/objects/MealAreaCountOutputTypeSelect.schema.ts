import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      recipes: z.boolean().optional(),
    })
    .strict();
export const MealAreaCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.MealAreaCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaCountOutputTypeSelect>;
export const MealAreaCountOutputTypeSelectObjectZodSchema = makeSchema();
