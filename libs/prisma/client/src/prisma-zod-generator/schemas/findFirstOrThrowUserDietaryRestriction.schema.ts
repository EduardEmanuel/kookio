import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionIncludeObjectSchema as UserDietaryRestrictionIncludeObjectSchema } from './objects/UserDietaryRestrictionInclude.schema';
import { UserDietaryRestrictionOrderByWithRelationInputObjectSchema as UserDietaryRestrictionOrderByWithRelationInputObjectSchema } from './objects/UserDietaryRestrictionOrderByWithRelationInput.schema';
import { UserDietaryRestrictionWhereInputObjectSchema as UserDietaryRestrictionWhereInputObjectSchema } from './objects/UserDietaryRestrictionWhereInput.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './objects/UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionScalarFieldEnumSchema } from './enums/UserDietaryRestrictionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserDietaryRestrictionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.UserDietaryRestrictionSelect> =
  z
    .object({
      userId: z.boolean().optional(),
      dietaryRestrictionId: z.boolean().optional(),
      user: z.boolean().optional(),
      restriction: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionSelect>;

export const UserDietaryRestrictionFindFirstOrThrowSelectZodSchema = z
  .object({
    userId: z.boolean().optional(),
    dietaryRestrictionId: z.boolean().optional(),
    user: z.boolean().optional(),
    restriction: z.boolean().optional(),
  })
  .strict();

export const UserDietaryRestrictionFindFirstOrThrowSchema: z.ZodType<Prisma.UserDietaryRestrictionFindFirstOrThrowArgs> =
  z
    .object({
      select: UserDietaryRestrictionFindFirstOrThrowSelectSchema.optional(),
      include: UserDietaryRestrictionIncludeObjectSchema.optional(),
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
      distinct: z
        .union([
          UserDietaryRestrictionScalarFieldEnumSchema,
          UserDietaryRestrictionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionFindFirstOrThrowArgs>;

export const UserDietaryRestrictionFindFirstOrThrowZodSchema = z
  .object({
    select: UserDietaryRestrictionFindFirstOrThrowSelectSchema.optional(),
    include: UserDietaryRestrictionIncludeObjectSchema.optional(),
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
    distinct: z
      .union([
        UserDietaryRestrictionScalarFieldEnumSchema,
        UserDietaryRestrictionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
