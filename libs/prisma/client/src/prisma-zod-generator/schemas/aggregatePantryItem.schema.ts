import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemOrderByWithRelationInputObjectSchema as PantryItemOrderByWithRelationInputObjectSchema } from './objects/PantryItemOrderByWithRelationInput.schema';
import { PantryItemWhereInputObjectSchema as PantryItemWhereInputObjectSchema } from './objects/PantryItemWhereInput.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './objects/PantryItemWhereUniqueInput.schema';
import { PantryItemCountAggregateInputObjectSchema as PantryItemCountAggregateInputObjectSchema } from './objects/PantryItemCountAggregateInput.schema';
import { PantryItemMinAggregateInputObjectSchema as PantryItemMinAggregateInputObjectSchema } from './objects/PantryItemMinAggregateInput.schema';
import { PantryItemMaxAggregateInputObjectSchema as PantryItemMaxAggregateInputObjectSchema } from './objects/PantryItemMaxAggregateInput.schema';
import { PantryItemAvgAggregateInputObjectSchema as PantryItemAvgAggregateInputObjectSchema } from './objects/PantryItemAvgAggregateInput.schema';
import { PantryItemSumAggregateInputObjectSchema as PantryItemSumAggregateInputObjectSchema } from './objects/PantryItemSumAggregateInput.schema';

export const PantryItemAggregateSchema: z.ZodType<Prisma.PantryItemAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          PantryItemOrderByWithRelationInputObjectSchema,
          PantryItemOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: PantryItemWhereInputObjectSchema.optional(),
      cursor: PantryItemWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), PantryItemCountAggregateInputObjectSchema])
        .optional(),
      _min: PantryItemMinAggregateInputObjectSchema.optional(),
      _max: PantryItemMaxAggregateInputObjectSchema.optional(),
      _avg: PantryItemAvgAggregateInputObjectSchema.optional(),
      _sum: PantryItemSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemAggregateArgs>;

export const PantryItemAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        PantryItemOrderByWithRelationInputObjectSchema,
        PantryItemOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: PantryItemWhereInputObjectSchema.optional(),
    cursor: PantryItemWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), PantryItemCountAggregateInputObjectSchema])
      .optional(),
    _min: PantryItemMinAggregateInputObjectSchema.optional(),
    _max: PantryItemMaxAggregateInputObjectSchema.optional(),
    _avg: PantryItemAvgAggregateInputObjectSchema.optional(),
    _sum: PantryItemSumAggregateInputObjectSchema.optional(),
  })
  .strict();
