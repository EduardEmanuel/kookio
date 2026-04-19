import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemWhereInputObjectSchema as PantryItemWhereInputObjectSchema } from './objects/PantryItemWhereInput.schema';
import { PantryItemOrderByWithAggregationInputObjectSchema as PantryItemOrderByWithAggregationInputObjectSchema } from './objects/PantryItemOrderByWithAggregationInput.schema';
import { PantryItemScalarWhereWithAggregatesInputObjectSchema as PantryItemScalarWhereWithAggregatesInputObjectSchema } from './objects/PantryItemScalarWhereWithAggregatesInput.schema';
import { PantryItemScalarFieldEnumSchema } from './enums/PantryItemScalarFieldEnum.schema';
import { PantryItemCountAggregateInputObjectSchema as PantryItemCountAggregateInputObjectSchema } from './objects/PantryItemCountAggregateInput.schema';
import { PantryItemMinAggregateInputObjectSchema as PantryItemMinAggregateInputObjectSchema } from './objects/PantryItemMinAggregateInput.schema';
import { PantryItemMaxAggregateInputObjectSchema as PantryItemMaxAggregateInputObjectSchema } from './objects/PantryItemMaxAggregateInput.schema';
import { PantryItemAvgAggregateInputObjectSchema as PantryItemAvgAggregateInputObjectSchema } from './objects/PantryItemAvgAggregateInput.schema';
import { PantryItemSumAggregateInputObjectSchema as PantryItemSumAggregateInputObjectSchema } from './objects/PantryItemSumAggregateInput.schema';

export const PantryItemGroupBySchema: z.ZodType<Prisma.PantryItemGroupByArgs> =
  z
    .object({
      where: PantryItemWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          PantryItemOrderByWithAggregationInputObjectSchema,
          PantryItemOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having: PantryItemScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(PantryItemScalarFieldEnumSchema),
      _count: z
        .union([z.literal(true), PantryItemCountAggregateInputObjectSchema])
        .optional(),
      _min: PantryItemMinAggregateInputObjectSchema.optional(),
      _max: PantryItemMaxAggregateInputObjectSchema.optional(),
      _avg: PantryItemAvgAggregateInputObjectSchema.optional(),
      _sum: PantryItemSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemGroupByArgs>;

export const PantryItemGroupByZodSchema = z
  .object({
    where: PantryItemWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        PantryItemOrderByWithAggregationInputObjectSchema,
        PantryItemOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: PantryItemScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(PantryItemScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), PantryItemCountAggregateInputObjectSchema])
      .optional(),
    _min: PantryItemMinAggregateInputObjectSchema.optional(),
    _max: PantryItemMaxAggregateInputObjectSchema.optional(),
    _avg: PantryItemAvgAggregateInputObjectSchema.optional(),
    _sum: PantryItemSumAggregateInputObjectSchema.optional(),
  })
  .strict();
