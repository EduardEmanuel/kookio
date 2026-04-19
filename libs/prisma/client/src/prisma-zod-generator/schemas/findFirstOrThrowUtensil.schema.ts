import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilIncludeObjectSchema as UtensilIncludeObjectSchema } from './objects/UtensilInclude.schema';
import { UtensilOrderByWithRelationInputObjectSchema as UtensilOrderByWithRelationInputObjectSchema } from './objects/UtensilOrderByWithRelationInput.schema';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './objects/UtensilWhereInput.schema';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './objects/UtensilWhereUniqueInput.schema';
import { UtensilScalarFieldEnumSchema } from './enums/UtensilScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UtensilFindFirstOrThrowSelectSchema: z.ZodType<Prisma.UtensilSelect> =
  z
    .object({
      id: z.boolean().optional(),
      slug: z.boolean().optional(),
      name: z.boolean().optional(),
      emoji: z.boolean().optional(),
      category: z.boolean().optional(),
      users: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UtensilSelect>;

export const UtensilFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    slug: z.boolean().optional(),
    name: z.boolean().optional(),
    emoji: z.boolean().optional(),
    category: z.boolean().optional(),
    users: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const UtensilFindFirstOrThrowSchema: z.ZodType<Prisma.UtensilFindFirstOrThrowArgs> =
  z
    .object({
      select: UtensilFindFirstOrThrowSelectSchema.optional(),
      include: UtensilIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          UtensilOrderByWithRelationInputObjectSchema,
          UtensilOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: UtensilWhereInputObjectSchema.optional(),
      cursor: UtensilWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UtensilScalarFieldEnumSchema,
          UtensilScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UtensilFindFirstOrThrowArgs>;

export const UtensilFindFirstOrThrowZodSchema = z
  .object({
    select: UtensilFindFirstOrThrowSelectSchema.optional(),
    include: UtensilIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        UtensilOrderByWithRelationInputObjectSchema,
        UtensilOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UtensilWhereInputObjectSchema.optional(),
    cursor: UtensilWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        UtensilScalarFieldEnumSchema,
        UtensilScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
