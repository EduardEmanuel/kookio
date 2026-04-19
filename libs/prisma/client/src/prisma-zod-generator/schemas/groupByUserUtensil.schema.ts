import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilWhereInputObjectSchema as UserUtensilWhereInputObjectSchema } from './objects/UserUtensilWhereInput.schema';
import { UserUtensilOrderByWithAggregationInputObjectSchema as UserUtensilOrderByWithAggregationInputObjectSchema } from './objects/UserUtensilOrderByWithAggregationInput.schema';
import { UserUtensilScalarWhereWithAggregatesInputObjectSchema as UserUtensilScalarWhereWithAggregatesInputObjectSchema } from './objects/UserUtensilScalarWhereWithAggregatesInput.schema';
import { UserUtensilScalarFieldEnumSchema } from './enums/UserUtensilScalarFieldEnum.schema';
import { UserUtensilCountAggregateInputObjectSchema as UserUtensilCountAggregateInputObjectSchema } from './objects/UserUtensilCountAggregateInput.schema';
import { UserUtensilMinAggregateInputObjectSchema as UserUtensilMinAggregateInputObjectSchema } from './objects/UserUtensilMinAggregateInput.schema';
import { UserUtensilMaxAggregateInputObjectSchema as UserUtensilMaxAggregateInputObjectSchema } from './objects/UserUtensilMaxAggregateInput.schema';

export const UserUtensilGroupBySchema: z.ZodType<Prisma.UserUtensilGroupByArgs> =
  z
    .object({
      where: UserUtensilWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          UserUtensilOrderByWithAggregationInputObjectSchema,
          UserUtensilOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having: UserUtensilScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(UserUtensilScalarFieldEnumSchema),
      _count: z
        .union([z.literal(true), UserUtensilCountAggregateInputObjectSchema])
        .optional(),
      _min: UserUtensilMinAggregateInputObjectSchema.optional(),
      _max: UserUtensilMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilGroupByArgs>;

export const UserUtensilGroupByZodSchema = z
  .object({
    where: UserUtensilWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UserUtensilOrderByWithAggregationInputObjectSchema,
        UserUtensilOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: UserUtensilScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UserUtensilScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), UserUtensilCountAggregateInputObjectSchema])
      .optional(),
    _min: UserUtensilMinAggregateInputObjectSchema.optional(),
    _max: UserUtensilMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
