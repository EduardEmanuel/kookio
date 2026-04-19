import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './objects/DietaryRestrictionWhereInput.schema';
import { DietaryRestrictionOrderByWithAggregationInputObjectSchema as DietaryRestrictionOrderByWithAggregationInputObjectSchema } from './objects/DietaryRestrictionOrderByWithAggregationInput.schema';
import { DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema as DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema } from './objects/DietaryRestrictionScalarWhereWithAggregatesInput.schema';
import { DietaryRestrictionScalarFieldEnumSchema } from './enums/DietaryRestrictionScalarFieldEnum.schema';
import { DietaryRestrictionCountAggregateInputObjectSchema as DietaryRestrictionCountAggregateInputObjectSchema } from './objects/DietaryRestrictionCountAggregateInput.schema';
import { DietaryRestrictionMinAggregateInputObjectSchema as DietaryRestrictionMinAggregateInputObjectSchema } from './objects/DietaryRestrictionMinAggregateInput.schema';
import { DietaryRestrictionMaxAggregateInputObjectSchema as DietaryRestrictionMaxAggregateInputObjectSchema } from './objects/DietaryRestrictionMaxAggregateInput.schema';

export const DietaryRestrictionGroupBySchema: z.ZodType<Prisma.DietaryRestrictionGroupByArgs> =
  z
    .object({
      where: DietaryRestrictionWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          DietaryRestrictionOrderByWithAggregationInputObjectSchema,
          DietaryRestrictionOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having:
        DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(DietaryRestrictionScalarFieldEnumSchema),
      _count: z
        .union([
          z.literal(true),
          DietaryRestrictionCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: DietaryRestrictionMinAggregateInputObjectSchema.optional(),
      _max: DietaryRestrictionMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionGroupByArgs>;

export const DietaryRestrictionGroupByZodSchema = z
  .object({
    where: DietaryRestrictionWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        DietaryRestrictionOrderByWithAggregationInputObjectSchema,
        DietaryRestrictionOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having:
      DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(DietaryRestrictionScalarFieldEnumSchema),
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
