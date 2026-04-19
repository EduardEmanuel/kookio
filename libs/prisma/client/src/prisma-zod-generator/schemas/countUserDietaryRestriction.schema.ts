import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionOrderByWithRelationInputObjectSchema as UserDietaryRestrictionOrderByWithRelationInputObjectSchema } from './objects/UserDietaryRestrictionOrderByWithRelationInput.schema';
import { UserDietaryRestrictionWhereInputObjectSchema as UserDietaryRestrictionWhereInputObjectSchema } from './objects/UserDietaryRestrictionWhereInput.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './objects/UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionCountAggregateInputObjectSchema as UserDietaryRestrictionCountAggregateInputObjectSchema } from './objects/UserDietaryRestrictionCountAggregateInput.schema';

export const UserDietaryRestrictionCountSchema: z.ZodType<Prisma.UserDietaryRestrictionCountArgs> =
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
      select: z
        .union([
          z.literal(true),
          UserDietaryRestrictionCountAggregateInputObjectSchema,
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCountArgs>;

export const UserDietaryRestrictionCountZodSchema = z
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
    select: z
      .union([
        z.literal(true),
        UserDietaryRestrictionCountAggregateInputObjectSchema,
      ])
      .optional(),
  })
  .strict();
