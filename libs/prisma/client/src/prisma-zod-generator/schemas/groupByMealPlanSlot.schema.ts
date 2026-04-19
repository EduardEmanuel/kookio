import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotWhereInputObjectSchema as MealPlanSlotWhereInputObjectSchema } from './objects/MealPlanSlotWhereInput.schema';
import { MealPlanSlotOrderByWithAggregationInputObjectSchema as MealPlanSlotOrderByWithAggregationInputObjectSchema } from './objects/MealPlanSlotOrderByWithAggregationInput.schema';
import { MealPlanSlotScalarWhereWithAggregatesInputObjectSchema as MealPlanSlotScalarWhereWithAggregatesInputObjectSchema } from './objects/MealPlanSlotScalarWhereWithAggregatesInput.schema';
import { MealPlanSlotScalarFieldEnumSchema } from './enums/MealPlanSlotScalarFieldEnum.schema';
import { MealPlanSlotCountAggregateInputObjectSchema as MealPlanSlotCountAggregateInputObjectSchema } from './objects/MealPlanSlotCountAggregateInput.schema';
import { MealPlanSlotMinAggregateInputObjectSchema as MealPlanSlotMinAggregateInputObjectSchema } from './objects/MealPlanSlotMinAggregateInput.schema';
import { MealPlanSlotMaxAggregateInputObjectSchema as MealPlanSlotMaxAggregateInputObjectSchema } from './objects/MealPlanSlotMaxAggregateInput.schema';
import { MealPlanSlotAvgAggregateInputObjectSchema as MealPlanSlotAvgAggregateInputObjectSchema } from './objects/MealPlanSlotAvgAggregateInput.schema';
import { MealPlanSlotSumAggregateInputObjectSchema as MealPlanSlotSumAggregateInputObjectSchema } from './objects/MealPlanSlotSumAggregateInput.schema';

export const MealPlanSlotGroupBySchema: z.ZodType<Prisma.MealPlanSlotGroupByArgs> =
  z
    .object({
      where: MealPlanSlotWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          MealPlanSlotOrderByWithAggregationInputObjectSchema,
          MealPlanSlotOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having: MealPlanSlotScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(MealPlanSlotScalarFieldEnumSchema),
      _count: z
        .union([z.literal(true), MealPlanSlotCountAggregateInputObjectSchema])
        .optional(),
      _min: MealPlanSlotMinAggregateInputObjectSchema.optional(),
      _max: MealPlanSlotMaxAggregateInputObjectSchema.optional(),
      _avg: MealPlanSlotAvgAggregateInputObjectSchema.optional(),
      _sum: MealPlanSlotSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotGroupByArgs>;

export const MealPlanSlotGroupByZodSchema = z
  .object({
    where: MealPlanSlotWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        MealPlanSlotOrderByWithAggregationInputObjectSchema,
        MealPlanSlotOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: MealPlanSlotScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(MealPlanSlotScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), MealPlanSlotCountAggregateInputObjectSchema])
      .optional(),
    _min: MealPlanSlotMinAggregateInputObjectSchema.optional(),
    _max: MealPlanSlotMaxAggregateInputObjectSchema.optional(),
    _avg: MealPlanSlotAvgAggregateInputObjectSchema.optional(),
    _sum: MealPlanSlotSumAggregateInputObjectSchema.optional(),
  })
  .strict();
