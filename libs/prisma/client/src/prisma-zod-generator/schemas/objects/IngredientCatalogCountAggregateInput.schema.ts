import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      externalId: z.literal(true).optional(),
      name: z.literal(true).optional(),
      normalizedName: z.literal(true).optional(),
      description: z.literal(true).optional(),
      imageUrl: z.literal(true).optional(),
      category: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const IngredientCatalogCountAggregateInputObjectSchema: z.ZodType<Prisma.IngredientCatalogCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogCountAggregateInputType>;
export const IngredientCatalogCountAggregateInputObjectZodSchema = makeSchema();
