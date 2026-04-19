import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionOrderByWithRelationInputObjectSchema as DietaryRestrictionOrderByWithRelationInputObjectSchema } from './objects/DietaryRestrictionOrderByWithRelationInput.schema';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './objects/DietaryRestrictionWhereInput.schema';
import { DietaryRestrictionWhereUniqueInputObjectSchema as DietaryRestrictionWhereUniqueInputObjectSchema } from './objects/DietaryRestrictionWhereUniqueInput.schema';
import { DietaryRestrictionCountAggregateInputObjectSchema as DietaryRestrictionCountAggregateInputObjectSchema } from './objects/DietaryRestrictionCountAggregateInput.schema';

export const DietaryRestrictionCountSchema: z.ZodType<Prisma.DietaryRestrictionCountArgs> =
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
      select: z
        .union([
          z.literal(true),
          DietaryRestrictionCountAggregateInputObjectSchema,
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionCountArgs>;

export const DietaryRestrictionCountZodSchema = z
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
    select: z
      .union([
        z.literal(true),
        DietaryRestrictionCountAggregateInputObjectSchema,
      ])
      .optional(),
  })
  .strict();
