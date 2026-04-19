import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionWhereInputObjectSchema as CookingSessionWhereInputObjectSchema } from './objects/CookingSessionWhereInput.schema';
import { CookingSessionOrderByWithAggregationInputObjectSchema as CookingSessionOrderByWithAggregationInputObjectSchema } from './objects/CookingSessionOrderByWithAggregationInput.schema';
import { CookingSessionScalarWhereWithAggregatesInputObjectSchema as CookingSessionScalarWhereWithAggregatesInputObjectSchema } from './objects/CookingSessionScalarWhereWithAggregatesInput.schema';
import { CookingSessionScalarFieldEnumSchema } from './enums/CookingSessionScalarFieldEnum.schema';
import { CookingSessionCountAggregateInputObjectSchema as CookingSessionCountAggregateInputObjectSchema } from './objects/CookingSessionCountAggregateInput.schema';
import { CookingSessionMinAggregateInputObjectSchema as CookingSessionMinAggregateInputObjectSchema } from './objects/CookingSessionMinAggregateInput.schema';
import { CookingSessionMaxAggregateInputObjectSchema as CookingSessionMaxAggregateInputObjectSchema } from './objects/CookingSessionMaxAggregateInput.schema';
import { CookingSessionAvgAggregateInputObjectSchema as CookingSessionAvgAggregateInputObjectSchema } from './objects/CookingSessionAvgAggregateInput.schema';
import { CookingSessionSumAggregateInputObjectSchema as CookingSessionSumAggregateInputObjectSchema } from './objects/CookingSessionSumAggregateInput.schema';

export const CookingSessionGroupBySchema: z.ZodType<Prisma.CookingSessionGroupByArgs> =
  z
    .object({
      where: CookingSessionWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          CookingSessionOrderByWithAggregationInputObjectSchema,
          CookingSessionOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having:
        CookingSessionScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(CookingSessionScalarFieldEnumSchema),
      _count: z
        .union([z.literal(true), CookingSessionCountAggregateInputObjectSchema])
        .optional(),
      _min: CookingSessionMinAggregateInputObjectSchema.optional(),
      _max: CookingSessionMaxAggregateInputObjectSchema.optional(),
      _avg: CookingSessionAvgAggregateInputObjectSchema.optional(),
      _sum: CookingSessionSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionGroupByArgs>;

export const CookingSessionGroupByZodSchema = z
  .object({
    where: CookingSessionWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        CookingSessionOrderByWithAggregationInputObjectSchema,
        CookingSessionOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: CookingSessionScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(CookingSessionScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), CookingSessionCountAggregateInputObjectSchema])
      .optional(),
    _min: CookingSessionMinAggregateInputObjectSchema.optional(),
    _max: CookingSessionMaxAggregateInputObjectSchema.optional(),
    _avg: CookingSessionAvgAggregateInputObjectSchema.optional(),
    _sum: CookingSessionSumAggregateInputObjectSchema.optional(),
  })
  .strict();
