import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionWhereInputObjectSchema as UserDietaryRestrictionWhereInputObjectSchema } from './objects/UserDietaryRestrictionWhereInput.schema';
import { UserDietaryRestrictionOrderByWithAggregationInputObjectSchema as UserDietaryRestrictionOrderByWithAggregationInputObjectSchema } from './objects/UserDietaryRestrictionOrderByWithAggregationInput.schema';
import { UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema as UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema } from './objects/UserDietaryRestrictionScalarWhereWithAggregatesInput.schema';
import { UserDietaryRestrictionScalarFieldEnumSchema } from './enums/UserDietaryRestrictionScalarFieldEnum.schema';
import { UserDietaryRestrictionCountAggregateInputObjectSchema as UserDietaryRestrictionCountAggregateInputObjectSchema } from './objects/UserDietaryRestrictionCountAggregateInput.schema';
import { UserDietaryRestrictionMinAggregateInputObjectSchema as UserDietaryRestrictionMinAggregateInputObjectSchema } from './objects/UserDietaryRestrictionMinAggregateInput.schema';
import { UserDietaryRestrictionMaxAggregateInputObjectSchema as UserDietaryRestrictionMaxAggregateInputObjectSchema } from './objects/UserDietaryRestrictionMaxAggregateInput.schema';

export const UserDietaryRestrictionGroupBySchema: z.ZodType<Prisma.UserDietaryRestrictionGroupByArgs> =
  z
    .object({
      where: UserDietaryRestrictionWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          UserDietaryRestrictionOrderByWithAggregationInputObjectSchema,
          UserDietaryRestrictionOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having:
        UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(UserDietaryRestrictionScalarFieldEnumSchema),
      _count: z
        .union([
          z.literal(true),
          UserDietaryRestrictionCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: UserDietaryRestrictionMinAggregateInputObjectSchema.optional(),
      _max: UserDietaryRestrictionMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionGroupByArgs>;

export const UserDietaryRestrictionGroupByZodSchema = z
  .object({
    where: UserDietaryRestrictionWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UserDietaryRestrictionOrderByWithAggregationInputObjectSchema,
        UserDietaryRestrictionOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having:
      UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UserDietaryRestrictionScalarFieldEnumSchema),
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
