import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogOrderByWithRelationInputObjectSchema as IngredientCatalogOrderByWithRelationInputObjectSchema } from './objects/IngredientCatalogOrderByWithRelationInput.schema';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './objects/IngredientCatalogWhereInput.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './objects/IngredientCatalogWhereUniqueInput.schema';
import { IngredientCatalogCountAggregateInputObjectSchema as IngredientCatalogCountAggregateInputObjectSchema } from './objects/IngredientCatalogCountAggregateInput.schema';

export const IngredientCatalogCountSchema: z.ZodType<Prisma.IngredientCatalogCountArgs> =
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
      select: z
        .union([
          z.literal(true),
          IngredientCatalogCountAggregateInputObjectSchema,
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogCountArgs>;

export const IngredientCatalogCountZodSchema = z
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
    select: z
      .union([
        z.literal(true),
        IngredientCatalogCountAggregateInputObjectSchema,
      ])
      .optional(),
  })
  .strict();
