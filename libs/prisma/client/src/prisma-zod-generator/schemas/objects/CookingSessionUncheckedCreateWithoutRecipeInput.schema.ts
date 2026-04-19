import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      servings: z.number().int(),
      completedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();
export const CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.CookingSessionUncheckedCreateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUncheckedCreateWithoutRecipeInput>;
export const CookingSessionUncheckedCreateWithoutRecipeInputObjectZodSchema =
  makeSchema();
