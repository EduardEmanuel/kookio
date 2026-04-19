import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      recipeId: z.string(),
      servings: z.number().int(),
      completedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();
export const CookingSessionCreateManyInputObjectSchema: z.ZodType<Prisma.CookingSessionCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateManyInput>;
export const CookingSessionCreateManyInputObjectZodSchema = makeSchema();
