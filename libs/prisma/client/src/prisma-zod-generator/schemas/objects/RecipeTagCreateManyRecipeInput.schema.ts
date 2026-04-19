import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      tag: z.string(),
    })
    .strict();
export const RecipeTagCreateManyRecipeInputObjectSchema: z.ZodType<Prisma.RecipeTagCreateManyRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagCreateManyRecipeInput>;
export const RecipeTagCreateManyRecipeInputObjectZodSchema = makeSchema();
