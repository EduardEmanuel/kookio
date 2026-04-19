import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './objects/IngredientCatalogWhereInput.schema';
import { IngredientCatalogOrderByWithAggregationInputObjectSchema as IngredientCatalogOrderByWithAggregationInputObjectSchema } from './objects/IngredientCatalogOrderByWithAggregationInput.schema';
import { IngredientCatalogScalarWhereWithAggregatesInputObjectSchema as IngredientCatalogScalarWhereWithAggregatesInputObjectSchema } from './objects/IngredientCatalogScalarWhereWithAggregatesInput.schema';
import { IngredientCatalogScalarFieldEnumSchema } from './enums/IngredientCatalogScalarFieldEnum.schema';
import { IngredientCatalogCountAggregateInputObjectSchema as IngredientCatalogCountAggregateInputObjectSchema } from './objects/IngredientCatalogCountAggregateInput.schema';
import { IngredientCatalogMinAggregateInputObjectSchema as IngredientCatalogMinAggregateInputObjectSchema } from './objects/IngredientCatalogMinAggregateInput.schema';
import { IngredientCatalogMaxAggregateInputObjectSchema as IngredientCatalogMaxAggregateInputObjectSchema } from './objects/IngredientCatalogMaxAggregateInput.schema';

export const IngredientCatalogGroupBySchema: z.ZodType<Prisma.IngredientCatalogGroupByArgs> =
  z
    .object({
      where: IngredientCatalogWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          IngredientCatalogOrderByWithAggregationInputObjectSchema,
          IngredientCatalogOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having:
        IngredientCatalogScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(IngredientCatalogScalarFieldEnumSchema),
      _count: z
        .union([
          z.literal(true),
          IngredientCatalogCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: IngredientCatalogMinAggregateInputObjectSchema.optional(),
      _max: IngredientCatalogMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogGroupByArgs>;

export const IngredientCatalogGroupByZodSchema = z
  .object({
    where: IngredientCatalogWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        IngredientCatalogOrderByWithAggregationInputObjectSchema,
        IngredientCatalogOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having:
      IngredientCatalogScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(IngredientCatalogScalarFieldEnumSchema),
    _count: z
      .union([
        z.literal(true),
        IngredientCatalogCountAggregateInputObjectSchema,
      ])
      .optional(),
    _min: IngredientCatalogMinAggregateInputObjectSchema.optional(),
    _max: IngredientCatalogMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
