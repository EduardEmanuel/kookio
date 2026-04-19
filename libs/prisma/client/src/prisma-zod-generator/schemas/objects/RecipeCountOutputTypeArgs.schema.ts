import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCountOutputTypeSelectObjectSchema as RecipeCountOutputTypeSelectObjectSchema } from './RecipeCountOutputTypeSelect.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => RecipeCountOutputTypeSelectObjectSchema).optional(),
    })
    .strict();
export const RecipeCountOutputTypeArgsObjectSchema = makeSchema();
export const RecipeCountOutputTypeArgsObjectZodSchema = makeSchema();
