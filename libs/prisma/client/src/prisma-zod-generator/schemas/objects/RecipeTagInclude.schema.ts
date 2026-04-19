import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';

const makeSchema = () =>
  z
    .object({
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const RecipeTagIncludeObjectSchema: z.ZodType<Prisma.RecipeTagInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagInclude>;
export const RecipeTagIncludeObjectZodSchema = makeSchema();
