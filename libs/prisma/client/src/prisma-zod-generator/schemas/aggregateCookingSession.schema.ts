import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionOrderByWithRelationInputObjectSchema as CookingSessionOrderByWithRelationInputObjectSchema } from './objects/CookingSessionOrderByWithRelationInput.schema';
import { CookingSessionWhereInputObjectSchema as CookingSessionWhereInputObjectSchema } from './objects/CookingSessionWhereInput.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './objects/CookingSessionWhereUniqueInput.schema';
import { CookingSessionCountAggregateInputObjectSchema as CookingSessionCountAggregateInputObjectSchema } from './objects/CookingSessionCountAggregateInput.schema';
import { CookingSessionMinAggregateInputObjectSchema as CookingSessionMinAggregateInputObjectSchema } from './objects/CookingSessionMinAggregateInput.schema';
import { CookingSessionMaxAggregateInputObjectSchema as CookingSessionMaxAggregateInputObjectSchema } from './objects/CookingSessionMaxAggregateInput.schema';
import { CookingSessionAvgAggregateInputObjectSchema as CookingSessionAvgAggregateInputObjectSchema } from './objects/CookingSessionAvgAggregateInput.schema';
import { CookingSessionSumAggregateInputObjectSchema as CookingSessionSumAggregateInputObjectSchema } from './objects/CookingSessionSumAggregateInput.schema';

export const CookingSessionAggregateSchema: z.ZodType<Prisma.CookingSessionAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          CookingSessionOrderByWithRelationInputObjectSchema,
          CookingSessionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: CookingSessionWhereInputObjectSchema.optional(),
      cursor: CookingSessionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), CookingSessionCountAggregateInputObjectSchema])
        .optional(),
      _min: CookingSessionMinAggregateInputObjectSchema.optional(),
      _max: CookingSessionMaxAggregateInputObjectSchema.optional(),
      _avg: CookingSessionAvgAggregateInputObjectSchema.optional(),
      _sum: CookingSessionSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionAggregateArgs>;

export const CookingSessionAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        CookingSessionOrderByWithRelationInputObjectSchema,
        CookingSessionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: CookingSessionWhereInputObjectSchema.optional(),
    cursor: CookingSessionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), CookingSessionCountAggregateInputObjectSchema])
      .optional(),
    _min: CookingSessionMinAggregateInputObjectSchema.optional(),
    _max: CookingSessionMaxAggregateInputObjectSchema.optional(),
    _avg: CookingSessionAvgAggregateInputObjectSchema.optional(),
    _sum: CookingSessionSumAggregateInputObjectSchema.optional(),
  })
  .strict();
