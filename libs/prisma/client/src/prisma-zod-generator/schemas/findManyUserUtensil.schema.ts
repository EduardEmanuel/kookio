import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilIncludeObjectSchema as UserUtensilIncludeObjectSchema } from './objects/UserUtensilInclude.schema';
import { UserUtensilOrderByWithRelationInputObjectSchema as UserUtensilOrderByWithRelationInputObjectSchema } from './objects/UserUtensilOrderByWithRelationInput.schema';
import { UserUtensilWhereInputObjectSchema as UserUtensilWhereInputObjectSchema } from './objects/UserUtensilWhereInput.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './objects/UserUtensilWhereUniqueInput.schema';
import { UserUtensilScalarFieldEnumSchema } from './enums/UserUtensilScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserUtensilFindManySelectSchema: z.ZodType<Prisma.UserUtensilSelect> =
  z
    .object({
      userId: z.boolean().optional(),
      utensilId: z.boolean().optional(),
      user: z.boolean().optional(),
      utensil: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilSelect>;

export const UserUtensilFindManySelectZodSchema = z
  .object({
    userId: z.boolean().optional(),
    utensilId: z.boolean().optional(),
    user: z.boolean().optional(),
    utensil: z.boolean().optional(),
  })
  .strict();

export const UserUtensilFindManySchema: z.ZodType<Prisma.UserUtensilFindManyArgs> =
  z
    .object({
      select: UserUtensilFindManySelectSchema.optional(),
      include: UserUtensilIncludeObjectSchema.optional(),
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
      distinct: z
        .union([
          UserUtensilScalarFieldEnumSchema,
          UserUtensilScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilFindManyArgs>;

export const UserUtensilFindManyZodSchema = z
  .object({
    select: UserUtensilFindManySelectSchema.optional(),
    include: UserUtensilIncludeObjectSchema.optional(),
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
    distinct: z
      .union([
        UserUtensilScalarFieldEnumSchema,
        UserUtensilScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
