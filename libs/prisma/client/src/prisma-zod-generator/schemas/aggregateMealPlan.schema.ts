import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanOrderByWithRelationInputObjectSchema as MealPlanOrderByWithRelationInputObjectSchema } from './objects/MealPlanOrderByWithRelationInput.schema';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './objects/MealPlanWhereInput.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './objects/MealPlanWhereUniqueInput.schema';
import { MealPlanCountAggregateInputObjectSchema as MealPlanCountAggregateInputObjectSchema } from './objects/MealPlanCountAggregateInput.schema';
import { MealPlanMinAggregateInputObjectSchema as MealPlanMinAggregateInputObjectSchema } from './objects/MealPlanMinAggregateInput.schema';
import { MealPlanMaxAggregateInputObjectSchema as MealPlanMaxAggregateInputObjectSchema } from './objects/MealPlanMaxAggregateInput.schema';

export const MealPlanAggregateSchema: z.ZodType<Prisma.MealPlanAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          MealPlanOrderByWithRelationInputObjectSchema,
          MealPlanOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: MealPlanWhereInputObjectSchema.optional(),
      cursor: MealPlanWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), MealPlanCountAggregateInputObjectSchema])
        .optional(),
      _min: MealPlanMinAggregateInputObjectSchema.optional(),
      _max: MealPlanMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanAggregateArgs>;

export const MealPlanAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        MealPlanOrderByWithRelationInputObjectSchema,
        MealPlanOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealPlanWhereInputObjectSchema.optional(),
    cursor: MealPlanWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), MealPlanCountAggregateInputObjectSchema])
      .optional(),
    _min: MealPlanMinAggregateInputObjectSchema.optional(),
    _max: MealPlanMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
