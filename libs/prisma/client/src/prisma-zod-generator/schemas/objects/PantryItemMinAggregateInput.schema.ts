import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      ingredientCatalogId: z.literal(true).optional(),
      quantity: z.literal(true).optional(),
      unit: z.literal(true).optional(),
      expiresAt: z.literal(true).optional(),
      addedAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const PantryItemMinAggregateInputObjectSchema: z.ZodType<Prisma.PantryItemMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemMinAggregateInputType>;
export const PantryItemMinAggregateInputObjectZodSchema = makeSchema();
