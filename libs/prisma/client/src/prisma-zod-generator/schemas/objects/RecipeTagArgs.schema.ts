import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeTagSelectObjectSchema as RecipeTagSelectObjectSchema } from './RecipeTagSelect.schema';
import { RecipeTagIncludeObjectSchema as RecipeTagIncludeObjectSchema } from './RecipeTagInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => RecipeTagSelectObjectSchema).optional(),
      include: z.lazy(() => RecipeTagIncludeObjectSchema).optional(),
    })
    .strict();
export const RecipeTagArgsObjectSchema = makeSchema();
export const RecipeTagArgsObjectZodSchema = makeSchema();
