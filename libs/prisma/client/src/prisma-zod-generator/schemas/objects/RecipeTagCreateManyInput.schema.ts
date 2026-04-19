import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      recipeId: z.string(),
      tag: z.string(),
    })
    .strict();
export const RecipeTagCreateManyInputObjectSchema: z.ZodType<Prisma.RecipeTagCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagCreateManyInput>;
export const RecipeTagCreateManyInputObjectZodSchema = makeSchema();
