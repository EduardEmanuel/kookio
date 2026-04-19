import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      tag: z.string(),
    })
    .strict();
export const RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeTagUncheckedCreateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUncheckedCreateWithoutRecipeInput>;
export const RecipeTagUncheckedCreateWithoutRecipeInputObjectZodSchema =
  makeSchema();
