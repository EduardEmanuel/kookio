import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      externalId: z.string(),
      name: z.string(),
      imageUrl: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();
export const MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealCategoryUncheckedCreateWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryUncheckedCreateWithoutRecipesInput>;
export const MealCategoryUncheckedCreateWithoutRecipesInputObjectZodSchema =
  makeSchema();
