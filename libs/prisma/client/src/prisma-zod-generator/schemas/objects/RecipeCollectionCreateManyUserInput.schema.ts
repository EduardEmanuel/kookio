import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      emoji: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();
export const RecipeCollectionCreateManyUserInputObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateManyUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateManyUserInput>;
export const RecipeCollectionCreateManyUserInputObjectZodSchema = makeSchema();
