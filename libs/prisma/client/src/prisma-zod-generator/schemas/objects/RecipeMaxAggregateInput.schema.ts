import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      externalId: z.literal(true).optional(),
      slug: z.literal(true).optional(),
      title: z.literal(true).optional(),
      description: z.literal(true).optional(),
      imageUrl: z.literal(true).optional(),
      youtubeUrl: z.literal(true).optional(),
      sourceUrl: z.literal(true).optional(),
      instructions: z.literal(true).optional(),
      status: z.literal(true).optional(),
      servings: z.literal(true).optional(),
      prepTimeMinutes: z.literal(true).optional(),
      cookTimeMinutes: z.literal(true).optional(),
      categoryId: z.literal(true).optional(),
      areaId: z.literal(true).optional(),
      authorId: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const RecipeMaxAggregateInputObjectSchema: z.ZodType<Prisma.RecipeMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeMaxAggregateInputType>;
export const RecipeMaxAggregateInputObjectZodSchema = makeSchema();
