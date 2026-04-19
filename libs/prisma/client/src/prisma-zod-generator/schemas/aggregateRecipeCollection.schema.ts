import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionOrderByWithRelationInputObjectSchema as RecipeCollectionOrderByWithRelationInputObjectSchema } from './objects/RecipeCollectionOrderByWithRelationInput.schema';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './objects/RecipeCollectionWhereInput.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './objects/RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionCountAggregateInputObjectSchema as RecipeCollectionCountAggregateInputObjectSchema } from './objects/RecipeCollectionCountAggregateInput.schema';
import { RecipeCollectionMinAggregateInputObjectSchema as RecipeCollectionMinAggregateInputObjectSchema } from './objects/RecipeCollectionMinAggregateInput.schema';
import { RecipeCollectionMaxAggregateInputObjectSchema as RecipeCollectionMaxAggregateInputObjectSchema } from './objects/RecipeCollectionMaxAggregateInput.schema';

export const RecipeCollectionAggregateSchema: z.ZodType<Prisma.RecipeCollectionAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          RecipeCollectionOrderByWithRelationInputObjectSchema,
          RecipeCollectionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeCollectionWhereInputObjectSchema.optional(),
      cursor: RecipeCollectionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([
          z.literal(true),
          RecipeCollectionCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: RecipeCollectionMinAggregateInputObjectSchema.optional(),
      _max: RecipeCollectionMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionAggregateArgs>;

export const RecipeCollectionAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        RecipeCollectionOrderByWithRelationInputObjectSchema,
        RecipeCollectionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeCollectionWhereInputObjectSchema.optional(),
    cursor: RecipeCollectionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), RecipeCollectionCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeCollectionMinAggregateInputObjectSchema.optional(),
    _max: RecipeCollectionMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
