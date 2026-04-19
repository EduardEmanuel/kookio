import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntryWhereInputObjectSchema as RecipeCollectionEntryWhereInputObjectSchema } from './objects/RecipeCollectionEntryWhereInput.schema';
import { RecipeCollectionEntryOrderByWithAggregationInputObjectSchema as RecipeCollectionEntryOrderByWithAggregationInputObjectSchema } from './objects/RecipeCollectionEntryOrderByWithAggregationInput.schema';
import { RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema as RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema } from './objects/RecipeCollectionEntryScalarWhereWithAggregatesInput.schema';
import { RecipeCollectionEntryScalarFieldEnumSchema } from './enums/RecipeCollectionEntryScalarFieldEnum.schema';
import { RecipeCollectionEntryCountAggregateInputObjectSchema as RecipeCollectionEntryCountAggregateInputObjectSchema } from './objects/RecipeCollectionEntryCountAggregateInput.schema';
import { RecipeCollectionEntryMinAggregateInputObjectSchema as RecipeCollectionEntryMinAggregateInputObjectSchema } from './objects/RecipeCollectionEntryMinAggregateInput.schema';
import { RecipeCollectionEntryMaxAggregateInputObjectSchema as RecipeCollectionEntryMaxAggregateInputObjectSchema } from './objects/RecipeCollectionEntryMaxAggregateInput.schema';

export const RecipeCollectionEntryGroupBySchema: z.ZodType<Prisma.RecipeCollectionEntryGroupByArgs> =
  z
    .object({
      where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          RecipeCollectionEntryOrderByWithAggregationInputObjectSchema,
          RecipeCollectionEntryOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having:
        RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(RecipeCollectionEntryScalarFieldEnumSchema),
      _count: z
        .union([
          z.literal(true),
          RecipeCollectionEntryCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: RecipeCollectionEntryMinAggregateInputObjectSchema.optional(),
      _max: RecipeCollectionEntryMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryGroupByArgs>;

export const RecipeCollectionEntryGroupByZodSchema = z
  .object({
    where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeCollectionEntryOrderByWithAggregationInputObjectSchema,
        RecipeCollectionEntryOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having:
      RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RecipeCollectionEntryScalarFieldEnumSchema),
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
