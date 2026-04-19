import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilOrderByWithRelationInputObjectSchema as UserUtensilOrderByWithRelationInputObjectSchema } from './objects/UserUtensilOrderByWithRelationInput.schema';
import { UserUtensilWhereInputObjectSchema as UserUtensilWhereInputObjectSchema } from './objects/UserUtensilWhereInput.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './objects/UserUtensilWhereUniqueInput.schema';
import { UserUtensilCountAggregateInputObjectSchema as UserUtensilCountAggregateInputObjectSchema } from './objects/UserUtensilCountAggregateInput.schema';

export const UserUtensilCountSchema: z.ZodType<Prisma.UserUtensilCountArgs> = z
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
    select: z
      .union([z.literal(true), UserUtensilCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserUtensilCountArgs>;

export const UserUtensilCountZodSchema = z
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
    select: z
      .union([z.literal(true), UserUtensilCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
