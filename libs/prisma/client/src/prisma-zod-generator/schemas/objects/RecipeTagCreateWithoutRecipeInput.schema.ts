import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      tag: z.string(),
    })
    .strict();
export const RecipeTagCreateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeTagCreateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagCreateWithoutRecipeInput>;
export const RecipeTagCreateWithoutRecipeInputObjectZodSchema = makeSchema();
