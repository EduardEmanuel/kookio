import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      externalId: z.string(),
      name: z.string(),
      flag: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();
export const MealAreaCreateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealAreaCreateWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaCreateWithoutRecipesInput>;
export const MealAreaCreateWithoutRecipesInputObjectZodSchema = makeSchema();
