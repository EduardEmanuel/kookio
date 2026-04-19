import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionOrderByWithRelationInputObjectSchema as UserDietaryRestrictionOrderByWithRelationInputObjectSchema } from './objects/UserDietaryRestrictionOrderByWithRelationInput.schema';
import { UserDietaryRestrictionWhereInputObjectSchema as UserDietaryRestrictionWhereInputObjectSchema } from './objects/UserDietaryRestrictionWhereInput.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './objects/UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionCountAggregateInputObjectSchema as UserDietaryRestrictionCountAggregateInputObjectSchema } from './objects/UserDietaryRestrictionCountAggregateInput.schema';
import { UserDietaryRestrictionMinAggregateInputObjectSchema as UserDietaryRestrictionMinAggregateInputObjectSchema } from './objects/UserDietaryRestrictionMinAggregateInput.schema';
import { UserDietaryRestrictionMaxAggregateInputObjectSchema as UserDietaryRestrictionMaxAggregateInputObjectSchema } from './objects/UserDietaryRestrictionMaxAggregateInput.schema';

export const UserDietaryRestrictionAggregateSchema: z.ZodType<Prisma.UserDietaryRestrictionAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          UserDietaryRestrictionOrderByWithRelationInputObjectSchema,
          UserDietaryRestrictionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: UserDietaryRestrictionWhereInputObjectSchema.optional(),
      cursor: UserDietaryRestrictionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([
          z.literal(true),
          UserDietaryRestrictionCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: UserDietaryRestrictionMinAggregateInputObjectSchema.optional(),
      _max: UserDietaryRestrictionMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionAggregateArgs>;

export const UserDietaryRestrictionAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        UserDietaryRestrictionOrderByWithRelationInputObjectSchema,
        UserDietaryRestrictionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserDietaryRestrictionWhereInputObjectSchema.optional(),
    cursor: UserDietaryRestrictionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([
        z.literal(true),
        UserDietaryRestrictionCountAggregateInputObjectSchema,
      ])
      .optional(),
    _min: UserDietaryRestrictionMinAggregateInputObjectSchema.optional(),
    _max: UserDietaryRestrictionMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
