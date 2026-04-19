import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaOrderByWithRelationInputObjectSchema as MealAreaOrderByWithRelationInputObjectSchema } from './objects/MealAreaOrderByWithRelationInput.schema';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './objects/MealAreaWhereInput.schema';
import { MealAreaWhereUniqueInputObjectSchema as MealAreaWhereUniqueInputObjectSchema } from './objects/MealAreaWhereUniqueInput.schema';
import { MealAreaCountAggregateInputObjectSchema as MealAreaCountAggregateInputObjectSchema } from './objects/MealAreaCountAggregateInput.schema';
import { MealAreaMinAggregateInputObjectSchema as MealAreaMinAggregateInputObjectSchema } from './objects/MealAreaMinAggregateInput.schema';
import { MealAreaMaxAggregateInputObjectSchema as MealAreaMaxAggregateInputObjectSchema } from './objects/MealAreaMaxAggregateInput.schema';

export const MealAreaAggregateSchema: z.ZodType<Prisma.MealAreaAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          MealAreaOrderByWithRelationInputObjectSchema,
          MealAreaOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: MealAreaWhereInputObjectSchema.optional(),
      cursor: MealAreaWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), MealAreaCountAggregateInputObjectSchema])
        .optional(),
      _min: MealAreaMinAggregateInputObjectSchema.optional(),
      _max: MealAreaMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealAreaAggregateArgs>;

export const MealAreaAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        MealAreaOrderByWithRelationInputObjectSchema,
        MealAreaOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealAreaWhereInputObjectSchema.optional(),
    cursor: MealAreaWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), MealAreaCountAggregateInputObjectSchema])
      .optional(),
    _min: MealAreaMinAggregateInputObjectSchema.optional(),
    _max: MealAreaMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
