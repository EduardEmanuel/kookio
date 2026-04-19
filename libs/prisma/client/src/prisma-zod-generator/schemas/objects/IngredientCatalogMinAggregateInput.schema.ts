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
    })
    .strict();
export const IngredientCatalogMinAggregateInputObjectSchema: z.ZodType<Prisma.IngredientCatalogMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogMinAggregateInputType>;
export const IngredientCatalogMinAggregateInputObjectZodSchema = makeSchema();
