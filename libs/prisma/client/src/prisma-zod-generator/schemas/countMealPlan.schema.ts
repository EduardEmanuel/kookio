import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanOrderByWithRelationInputObjectSchema as MealPlanOrderByWithRelationInputObjectSchema } from './objects/MealPlanOrderByWithRelationInput.schema';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './objects/MealPlanWhereInput.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './objects/MealPlanWhereUniqueInput.schema';
import { MealPlanCountAggregateInputObjectSchema as MealPlanCountAggregateInputObjectSchema } from './objects/MealPlanCountAggregateInput.schema';

export const MealPlanCountSchema: z.ZodType<Prisma.MealPlanCountArgs> = z
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
    select: z
      .union([z.literal(true), MealPlanCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.MealPlanCountArgs>;

export const MealPlanCountZodSchema = z
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
    select: z
      .union([z.literal(true), MealPlanCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
