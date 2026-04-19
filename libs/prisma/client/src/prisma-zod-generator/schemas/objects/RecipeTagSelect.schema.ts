import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      tag: z.boolean().optional(),
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const RecipeTagSelectObjectSchema: z.ZodType<Prisma.RecipeTagSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagSelect>;
export const RecipeTagSelectObjectZodSchema = makeSchema();
