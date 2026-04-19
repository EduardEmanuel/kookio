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
export const RecipeCollectionCreateManyInputObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateManyInput>;
export const RecipeCollectionCreateManyInputObjectZodSchema = makeSchema();
