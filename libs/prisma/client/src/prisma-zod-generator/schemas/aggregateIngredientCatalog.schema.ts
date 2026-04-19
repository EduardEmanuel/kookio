import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogOrderByWithRelationInputObjectSchema as IngredientCatalogOrderByWithRelationInputObjectSchema } from './objects/IngredientCatalogOrderByWithRelationInput.schema';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './objects/IngredientCatalogWhereInput.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './objects/IngredientCatalogWhereUniqueInput.schema';
import { IngredientCatalogCountAggregateInputObjectSchema as IngredientCatalogCountAggregateInputObjectSchema } from './objects/IngredientCatalogCountAggregateInput.schema';
import { IngredientCatalogMinAggregateInputObjectSchema as IngredientCatalogMinAggregateInputObjectSchema } from './objects/IngredientCatalogMinAggregateInput.schema';
import { IngredientCatalogMaxAggregateInputObjectSchema as IngredientCatalogMaxAggregateInputObjectSchema } from './objects/IngredientCatalogMaxAggregateInput.schema';

export const IngredientCatalogAggregateSchema: z.ZodType<Prisma.IngredientCatalogAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          IngredientCatalogOrderByWithRelationInputObjectSchema,
          IngredientCatalogOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: IngredientCatalogWhereInputObjectSchema.optional(),
      cursor: IngredientCatalogWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([
          z.literal(true),
          IngredientCatalogCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: IngredientCatalogMinAggregateInputObjectSchema.optional(),
      _max: IngredientCatalogMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogAggregateArgs>;

export const IngredientCatalogAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        IngredientCatalogOrderByWithRelationInputObjectSchema,
        IngredientCatalogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: IngredientCatalogWhereInputObjectSchema.optional(),
    cursor: IngredientCatalogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
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
