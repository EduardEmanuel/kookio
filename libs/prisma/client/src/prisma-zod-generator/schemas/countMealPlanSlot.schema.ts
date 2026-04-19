import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotOrderByWithRelationInputObjectSchema as MealPlanSlotOrderByWithRelationInputObjectSchema } from './objects/MealPlanSlotOrderByWithRelationInput.schema';
import { MealPlanSlotWhereInputObjectSchema as MealPlanSlotWhereInputObjectSchema } from './objects/MealPlanSlotWhereInput.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './objects/MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotCountAggregateInputObjectSchema as MealPlanSlotCountAggregateInputObjectSchema } from './objects/MealPlanSlotCountAggregateInput.schema';

export const MealPlanSlotCountSchema: z.ZodType<Prisma.MealPlanSlotCountArgs> =
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
      select: z
        .union([z.literal(true), MealPlanSlotCountAggregateInputObjectSchema])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotCountArgs>;

export const MealPlanSlotCountZodSchema = z
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
    select: z
      .union([z.literal(true), MealPlanSlotCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
