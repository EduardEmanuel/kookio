import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionOrderByWithRelationInputObjectSchema as DietaryRestrictionOrderByWithRelationInputObjectSchema } from './objects/DietaryRestrictionOrderByWithRelationInput.schema';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './objects/DietaryRestrictionWhereInput.schema';
import { DietaryRestrictionWhereUniqueInputObjectSchema as DietaryRestrictionWhereUniqueInputObjectSchema } from './objects/DietaryRestrictionWhereUniqueInput.schema';
import { DietaryRestrictionCountAggregateInputObjectSchema as DietaryRestrictionCountAggregateInputObjectSchema } from './objects/DietaryRestrictionCountAggregateInput.schema';
import { DietaryRestrictionMinAggregateInputObjectSchema as DietaryRestrictionMinAggregateInputObjectSchema } from './objects/DietaryRestrictionMinAggregateInput.schema';
import { DietaryRestrictionMaxAggregateInputObjectSchema as DietaryRestrictionMaxAggregateInputObjectSchema } from './objects/DietaryRestrictionMaxAggregateInput.schema';

export const DietaryRestrictionAggregateSchema: z.ZodType<Prisma.DietaryRestrictionAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          DietaryRestrictionOrderByWithRelationInputObjectSchema,
          DietaryRestrictionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: DietaryRestrictionWhereInputObjectSchema.optional(),
      cursor: DietaryRestrictionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([
          z.literal(true),
          DietaryRestrictionCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: DietaryRestrictionMinAggregateInputObjectSchema.optional(),
      _max: DietaryRestrictionMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionAggregateArgs>;

export const DietaryRestrictionAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        DietaryRestrictionOrderByWithRelationInputObjectSchema,
        DietaryRestrictionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DietaryRestrictionWhereInputObjectSchema.optional(),
    cursor: DietaryRestrictionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([
        z.literal(true),
        DietaryRestrictionCountAggregateInputObjectSchema,
      ])
      .optional(),
    _min: DietaryRestrictionMinAggregateInputObjectSchema.optional(),
    _max: DietaryRestrictionMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
