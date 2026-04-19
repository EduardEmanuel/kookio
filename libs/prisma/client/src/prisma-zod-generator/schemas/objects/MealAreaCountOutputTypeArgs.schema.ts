import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealAreaCountOutputTypeSelectObjectSchema as MealAreaCountOutputTypeSelectObjectSchema } from './MealAreaCountOutputTypeSelect.schema';

const makeSchema = () =>
  z
    .object({
      select: z
        .lazy(() => MealAreaCountOutputTypeSelectObjectSchema)
        .optional(),
    })
    .strict();
export const MealAreaCountOutputTypeArgsObjectSchema = makeSchema();
export const MealAreaCountOutputTypeArgsObjectZodSchema = makeSchema();
