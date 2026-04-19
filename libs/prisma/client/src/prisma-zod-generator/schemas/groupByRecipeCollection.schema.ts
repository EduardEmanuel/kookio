import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './objects/RecipeCollectionWhereInput.schema';
import { RecipeCollectionOrderByWithAggregationInputObjectSchema as RecipeCollectionOrderByWithAggregationInputObjectSchema } from './objects/RecipeCollectionOrderByWithAggregationInput.schema';
import { RecipeCollectionScalarWhereWithAggregatesInputObjectSchema as RecipeCollectionScalarWhereWithAggregatesInputObjectSchema } from './objects/RecipeCollectionScalarWhereWithAggregatesInput.schema';
import { RecipeCollectionScalarFieldEnumSchema } from './enums/RecipeCollectionScalarFieldEnum.schema';
import { RecipeCollectionCountAggregateInputObjectSchema as RecipeCollectionCountAggregateInputObjectSchema } from './objects/RecipeCollectionCountAggregateInput.schema';
import { RecipeCollectionMinAggregateInputObjectSchema as RecipeCollectionMinAggregateInputObjectSchema } from './objects/RecipeCollectionMinAggregateInput.schema';
import { RecipeCollectionMaxAggregateInputObjectSchema as RecipeCollectionMaxAggregateInputObjectSchema } from './objects/RecipeCollectionMaxAggregateInput.schema';

export const RecipeCollectionGroupBySchema: z.ZodType<Prisma.RecipeCollectionGroupByArgs> =
  z
    .object({
      where: RecipeCollectionWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          RecipeCollectionOrderByWithAggregationInputObjectSchema,
          RecipeCollectionOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having:
        RecipeCollectionScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(RecipeCollectionScalarFieldEnumSchema),
      _count: z
        .union([
          z.literal(true),
          RecipeCollectionCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: RecipeCollectionMinAggregateInputObjectSchema.optional(),
      _max: RecipeCollectionMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionGroupByArgs>;

export const RecipeCollectionGroupByZodSchema = z
  .object({
    where: RecipeCollectionWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeCollectionOrderByWithAggregationInputObjectSchema,
        RecipeCollectionOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having:
      RecipeCollectionScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RecipeCollectionScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), RecipeCollectionCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeCollectionMinAggregateInputObjectSchema.optional(),
    _max: RecipeCollectionMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
