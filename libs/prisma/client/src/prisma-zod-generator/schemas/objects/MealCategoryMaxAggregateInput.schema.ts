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
export const MealCategoryMaxAggregateInputObjectSchema: z.ZodType<Prisma.MealCategoryMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryMaxAggregateInputType>;
export const MealCategoryMaxAggregateInputObjectZodSchema = makeSchema();
