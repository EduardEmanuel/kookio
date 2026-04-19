import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      name: z.string(),
      emoji: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();
export const RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUncheckedCreateWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUncheckedCreateWithoutRecipesInput>;
export const RecipeCollectionUncheckedCreateWithoutRecipesInputObjectZodSchema =
  makeSchema();
