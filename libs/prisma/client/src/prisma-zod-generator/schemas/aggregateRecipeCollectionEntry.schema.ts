import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntryOrderByWithRelationInputObjectSchema as RecipeCollectionEntryOrderByWithRelationInputObjectSchema } from './objects/RecipeCollectionEntryOrderByWithRelationInput.schema';
import { RecipeCollectionEntryWhereInputObjectSchema as RecipeCollectionEntryWhereInputObjectSchema } from './objects/RecipeCollectionEntryWhereInput.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './objects/RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryCountAggregateInputObjectSchema as RecipeCollectionEntryCountAggregateInputObjectSchema } from './objects/RecipeCollectionEntryCountAggregateInput.schema';
import { RecipeCollectionEntryMinAggregateInputObjectSchema as RecipeCollectionEntryMinAggregateInputObjectSchema } from './objects/RecipeCollectionEntryMinAggregateInput.schema';
import { RecipeCollectionEntryMaxAggregateInputObjectSchema as RecipeCollectionEntryMaxAggregateInputObjectSchema } from './objects/RecipeCollectionEntryMaxAggregateInput.schema';

export const RecipeCollectionEntryAggregateSchema: z.ZodType<Prisma.RecipeCollectionEntryAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          RecipeCollectionEntryOrderByWithRelationInputObjectSchema,
          RecipeCollectionEntryOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
      cursor: RecipeCollectionEntryWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([
          z.literal(true),
          RecipeCollectionEntryCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: RecipeCollectionEntryMinAggregateInputObjectSchema.optional(),
      _max: RecipeCollectionEntryMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryAggregateArgs>;

export const RecipeCollectionEntryAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        RecipeCollectionEntryOrderByWithRelationInputObjectSchema,
        RecipeCollectionEntryOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
    cursor: RecipeCollectionEntryWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([
        z.literal(true),
        RecipeCollectionEntryCountAggregateInputObjectSchema,
      ])
      .optional(),
    _min: RecipeCollectionEntryMinAggregateInputObjectSchema.optional(),
    _max: RecipeCollectionEntryMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
