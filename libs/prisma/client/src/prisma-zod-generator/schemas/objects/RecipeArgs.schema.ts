import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeSelectObjectSchema as RecipeSelectObjectSchema } from './RecipeSelect.schema';
import { RecipeIncludeObjectSchema as RecipeIncludeObjectSchema } from './RecipeInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => RecipeSelectObjectSchema).optional(),
      include: z.lazy(() => RecipeIncludeObjectSchema).optional(),
    })
    .strict();
export const RecipeArgsObjectSchema = makeSchema();
export const RecipeArgsObjectZodSchema = makeSchema();
