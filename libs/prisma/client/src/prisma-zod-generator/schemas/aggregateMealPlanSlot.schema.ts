import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotOrderByWithRelationInputObjectSchema as MealPlanSlotOrderByWithRelationInputObjectSchema } from './objects/MealPlanSlotOrderByWithRelationInput.schema';
import { MealPlanSlotWhereInputObjectSchema as MealPlanSlotWhereInputObjectSchema } from './objects/MealPlanSlotWhereInput.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './objects/MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotCountAggregateInputObjectSchema as MealPlanSlotCountAggregateInputObjectSchema } from './objects/MealPlanSlotCountAggregateInput.schema';
import { MealPlanSlotMinAggregateInputObjectSchema as MealPlanSlotMinAggregateInputObjectSchema } from './objects/MealPlanSlotMinAggregateInput.schema';
import { MealPlanSlotMaxAggregateInputObjectSchema as MealPlanSlotMaxAggregateInputObjectSchema } from './objects/MealPlanSlotMaxAggregateInput.schema';
import { MealPlanSlotAvgAggregateInputObjectSchema as MealPlanSlotAvgAggregateInputObjectSchema } from './objects/MealPlanSlotAvgAggregateInput.schema';
import { MealPlanSlotSumAggregateInputObjectSchema as MealPlanSlotSumAggregateInputObjectSchema } from './objects/MealPlanSlotSumAggregateInput.schema';

export const MealPlanSlotAggregateSchema: z.ZodType<Prisma.MealPlanSlotAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          MealPlanSlotOrderByWithRelationInputObjectSchema,
          MealPlanSlotOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: MealPlanSlotWhereInputObjectSchema.optional(),
      cursor: MealPlanSlotWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), MealPlanSlotCountAggregateInputObjectSchema])
        .optional(),
      _min: MealPlanSlotMinAggregateInputObjectSchema.optional(),
      _max: MealPlanSlotMaxAggregateInputObjectSchema.optional(),
      _avg: MealPlanSlotAvgAggregateInputObjectSchema.optional(),
      _sum: MealPlanSlotSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotAggregateArgs>;

export const MealPlanSlotAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        MealPlanSlotOrderByWithRelationInputObjectSchema,
        MealPlanSlotOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealPlanSlotWhereInputObjectSchema.optional(),
    cursor: MealPlanSlotWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), MealPlanSlotCountAggregateInputObjectSchema])
      .optional(),
    _min: MealPlanSlotMinAggregateInputObjectSchema.optional(),
    _max: MealPlanSlotMaxAggregateInputObjectSchema.optional(),
    _avg: MealPlanSlotAvgAggregateInputObjectSchema.optional(),
    _sum: MealPlanSlotSumAggregateInputObjectSchema.optional(),
  })
  .strict();
