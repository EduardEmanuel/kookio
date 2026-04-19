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
export const RecipeTagUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RecipeTagUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUncheckedCreateInput>;
export const RecipeTagUncheckedCreateInputObjectZodSchema = makeSchema();
