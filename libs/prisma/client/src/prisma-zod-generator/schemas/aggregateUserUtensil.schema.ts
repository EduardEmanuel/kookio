import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilOrderByWithRelationInputObjectSchema as UserUtensilOrderByWithRelationInputObjectSchema } from './objects/UserUtensilOrderByWithRelationInput.schema';
import { UserUtensilWhereInputObjectSchema as UserUtensilWhereInputObjectSchema } from './objects/UserUtensilWhereInput.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './objects/UserUtensilWhereUniqueInput.schema';
import { UserUtensilCountAggregateInputObjectSchema as UserUtensilCountAggregateInputObjectSchema } from './objects/UserUtensilCountAggregateInput.schema';
import { UserUtensilMinAggregateInputObjectSchema as UserUtensilMinAggregateInputObjectSchema } from './objects/UserUtensilMinAggregateInput.schema';
import { UserUtensilMaxAggregateInputObjectSchema as UserUtensilMaxAggregateInputObjectSchema } from './objects/UserUtensilMaxAggregateInput.schema';

export const UserUtensilAggregateSchema: z.ZodType<Prisma.UserUtensilAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          UserUtensilOrderByWithRelationInputObjectSchema,
          UserUtensilOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: UserUtensilWhereInputObjectSchema.optional(),
      cursor: UserUtensilWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), UserUtensilCountAggregateInputObjectSchema])
        .optional(),
      _min: UserUtensilMinAggregateInputObjectSchema.optional(),
      _max: UserUtensilMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilAggregateArgs>;

export const UserUtensilAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        UserUtensilOrderByWithRelationInputObjectSchema,
        UserUtensilOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserUtensilWhereInputObjectSchema.optional(),
    cursor: UserUtensilWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), UserUtensilCountAggregateInputObjectSchema])
      .optional(),
    _min: UserUtensilMinAggregateInputObjectSchema.optional(),
    _max: UserUtensilMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
