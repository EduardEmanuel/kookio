import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './objects/MealPlanWhereInput.schema';
import { MealPlanOrderByWithAggregationInputObjectSchema as MealPlanOrderByWithAggregationInputObjectSchema } from './objects/MealPlanOrderByWithAggregationInput.schema';
import { MealPlanScalarWhereWithAggregatesInputObjectSchema as MealPlanScalarWhereWithAggregatesInputObjectSchema } from './objects/MealPlanScalarWhereWithAggregatesInput.schema';
import { MealPlanScalarFieldEnumSchema } from './enums/MealPlanScalarFieldEnum.schema';
import { MealPlanCountAggregateInputObjectSchema as MealPlanCountAggregateInputObjectSchema } from './objects/MealPlanCountAggregateInput.schema';
import { MealPlanMinAggregateInputObjectSchema as MealPlanMinAggregateInputObjectSchema } from './objects/MealPlanMinAggregateInput.schema';
import { MealPlanMaxAggregateInputObjectSchema as MealPlanMaxAggregateInputObjectSchema } from './objects/MealPlanMaxAggregateInput.schema';

export const MealPlanGroupBySchema: z.ZodType<Prisma.MealPlanGroupByArgs> = z
  .object({
    where: MealPlanWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        MealPlanOrderByWithAggregationInputObjectSchema,
        MealPlanOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: MealPlanScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(MealPlanScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), MealPlanCountAggregateInputObjectSchema])
      .optional(),
    _min: MealPlanMinAggregateInputObjectSchema.optional(),
    _max: MealPlanMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.MealPlanGroupByArgs>;

export const MealPlanGroupByZodSchema = z
  .object({
    where: MealPlanWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        MealPlanOrderByWithAggregationInputObjectSchema,
        MealPlanOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: MealPlanScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(MealPlanScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), MealPlanCountAggregateInputObjectSchema])
      .optional(),
    _min: MealPlanMinAggregateInputObjectSchema.optional(),
    _max: MealPlanMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
