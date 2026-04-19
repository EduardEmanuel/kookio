import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserIncludeObjectSchema as UserIncludeObjectSchema } from './objects/UserInclude.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './objects/UserOrderByWithRelationInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';
import { UserScalarFieldEnumSchema } from './enums/UserScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindFirstSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    firebaseUid: z.boolean().optional(),
    name: z.boolean().optional(),
    roles: z.boolean().optional(),
    amr: z.boolean().optional(),
    isDisabled: z.boolean().optional(),
    deletedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    credentials: z.boolean().optional(),
    profile: z.boolean().optional(),
    pantryItems: z.boolean().optional(),
    recipes: z.boolean().optional(),
    collections: z.boolean().optional(),
    mealPlans: z.boolean().optional(),
    cookingSessions: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindFirstSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    firebaseUid: z.boolean().optional(),
    name: z.boolean().optional(),
    roles: z.boolean().optional(),
    amr: z.boolean().optional(),
    isDisabled: z.boolean().optional(),
    deletedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    credentials: z.boolean().optional(),
    profile: z.boolean().optional(),
    pantryItems: z.boolean().optional(),
    recipes: z.boolean().optional(),
    collections: z.boolean().optional(),
    mealPlans: z.boolean().optional(),
    cookingSessions: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const UserFindFirstSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserFindFirstSelectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstZodSchema = z
  .object({
    select: UserFindFirstSelectSchema.optional(),
    include: UserIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();
