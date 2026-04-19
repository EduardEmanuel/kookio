import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      externalId: z.literal(true).optional(),
      name: z.literal(true).optional(),
      imageUrl: z.literal(true).optional(),
      description: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
    })
    .strict();
export const MealCategoryMinAggregateInputObjectSchema: z.ZodType<Prisma.MealCategoryMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryMinAggregateInputType>;
export const MealCategoryMinAggregateInputObjectZodSchema = makeSchema();
