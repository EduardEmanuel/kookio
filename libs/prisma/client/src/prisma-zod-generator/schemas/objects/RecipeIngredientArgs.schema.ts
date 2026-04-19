import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientSelectObjectSchema as RecipeIngredientSelectObjectSchema } from './RecipeIngredientSelect.schema';
import { RecipeIngredientIncludeObjectSchema as RecipeIngredientIncludeObjectSchema } from './RecipeIngredientInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => RecipeIngredientSelectObjectSchema).optional(),
      include: z.lazy(() => RecipeIngredientIncludeObjectSchema).optional(),
    })
    .strict();
export const RecipeIngredientArgsObjectSchema = makeSchema();
export const RecipeIngredientArgsObjectZodSchema = makeSchema();
