import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DietaryRestrictionIncludeObjectSchema as DietaryRestrictionIncludeObjectSchema } from './objects/DietaryRestrictionInclude.schema';
import { DietaryRestrictionOrderByWithRelationInputObjectSchema as DietaryRestrictionOrderByWithRelationInputObjectSchema } from './objects/DietaryRestrictionOrderByWithRelationInput.schema';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './objects/DietaryRestrictionWhereInput.schema';
import { DietaryRestrictionWhereUniqueInputObjectSchema as DietaryRestrictionWhereUniqueInputObjectSchema } from './objects/DietaryRestrictionWhereUniqueInput.schema';
import { DietaryRestrictionScalarFieldEnumSchema } from './enums/DietaryRestrictionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DietaryRestrictionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.DietaryRestrictionSelect> =
  z
    .object({
      id: z.boolean().optional(),
      slug: z.boolean().optional(),
      label: z.boolean().optional(),
      emoji: z.boolean().optional(),
      description: z.boolean().optional(),
      users: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionSelect>;

export const DietaryRestrictionFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    slug: z.boolean().optional(),
    label: z.boolean().optional(),
    emoji: z.boolean().optional(),
    description: z.boolean().optional(),
    users: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const DietaryRestrictionFindFirstOrThrowSchema: z.ZodType<Prisma.DietaryRestrictionFindFirstOrThrowArgs> =
  z
    .object({
      select: DietaryRestrictionFindFirstOrThrowSelectSchema.optional(),
      include: DietaryRestrictionIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          DietaryRestrictionOrderByWithRelationInputObjectSchema,
          DietaryRestrictionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: DietaryRestrictionWhereInputObjectSchema.optional(),
      cursor: DietaryRestrictionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DietaryRestrictionScalarFieldEnumSchema,
          DietaryRestrictionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.DietaryRestrictionFindFirstOrThrowArgs>;

export const DietaryRestrictionFindFirstOrThrowZodSchema = z
  .object({
    select: DietaryRestrictionFindFirstOrThrowSelectSchema.optional(),
    include: DietaryRestrictionIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        DietaryRestrictionOrderByWithRelationInputObjectSchema,
        DietaryRestrictionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: DietaryRestrictionWhereInputObjectSchema.optional(),
    cursor: DietaryRestrictionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        DietaryRestrictionScalarFieldEnumSchema,
        DietaryRestrictionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
