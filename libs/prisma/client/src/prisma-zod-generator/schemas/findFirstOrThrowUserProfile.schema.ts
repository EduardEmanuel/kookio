import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserProfileIncludeObjectSchema as UserProfileIncludeObjectSchema } from './objects/UserProfileInclude.schema';
import { UserProfileOrderByWithRelationInputObjectSchema as UserProfileOrderByWithRelationInputObjectSchema } from './objects/UserProfileOrderByWithRelationInput.schema';
import { UserProfileWhereInputObjectSchema as UserProfileWhereInputObjectSchema } from './objects/UserProfileWhereInput.schema';
import { UserProfileWhereUniqueInputObjectSchema as UserProfileWhereUniqueInputObjectSchema } from './objects/UserProfileWhereUniqueInput.schema';
import { UserProfileScalarFieldEnumSchema } from './enums/UserProfileScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserProfileFindFirstOrThrowSelectSchema: z.ZodType<Prisma.UserProfileSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      adultsCount: z.boolean().optional(),
      childrenCount: z.boolean().optional(),
      onboardingDone: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      user: z.boolean().optional(),
      dietaryRestrictions: z.boolean().optional(),
      utensils: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserProfileSelect>;

export const UserProfileFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    adultsCount: z.boolean().optional(),
    childrenCount: z.boolean().optional(),
    onboardingDone: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    dietaryRestrictions: z.boolean().optional(),
    utensils: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const UserProfileFindFirstOrThrowSchema: z.ZodType<Prisma.UserProfileFindFirstOrThrowArgs> =
  z
    .object({
      select: UserProfileFindFirstOrThrowSelectSchema.optional(),
      include: UserProfileIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          UserProfileOrderByWithRelationInputObjectSchema,
          UserProfileOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: UserProfileWhereInputObjectSchema.optional(),
      cursor: UserProfileWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserProfileScalarFieldEnumSchema,
          UserProfileScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserProfileFindFirstOrThrowArgs>;

export const UserProfileFindFirstOrThrowZodSchema = z
  .object({
    select: UserProfileFindFirstOrThrowSelectSchema.optional(),
    include: UserProfileIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        UserProfileOrderByWithRelationInputObjectSchema,
        UserProfileOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserProfileWhereInputObjectSchema.optional(),
    cursor: UserProfileWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        UserProfileScalarFieldEnumSchema,
        UserProfileScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
