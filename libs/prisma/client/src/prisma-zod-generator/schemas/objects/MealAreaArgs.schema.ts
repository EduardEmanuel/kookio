import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealAreaSelectObjectSchema as MealAreaSelectObjectSchema } from './MealAreaSelect.schema';
import { MealAreaIncludeObjectSchema as MealAreaIncludeObjectSchema } from './MealAreaInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => MealAreaSelectObjectSchema).optional(),
      include: z.lazy(() => MealAreaIncludeObjectSchema).optional(),
    })
    .strict();
export const MealAreaArgsObjectSchema = makeSchema();
export const MealAreaArgsObjectZodSchema = makeSchema();
