import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      recipeId: z.string(),
      servings: z.number().int(),
      completedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();
export const CookingSessionUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CookingSessionUncheckedCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUncheckedCreateWithoutUserInput>;
export const CookingSessionUncheckedCreateWithoutUserInputObjectZodSchema =
  makeSchema();
