import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaIncludeObjectSchema as MealAreaIncludeObjectSchema } from './objects/MealAreaInclude.schema';
import { MealAreaOrderByWithRelationInputObjectSchema as MealAreaOrderByWithRelationInputObjectSchema } from './objects/MealAreaOrderByWithRelationInput.schema';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './objects/MealAreaWhereInput.schema';
import { MealAreaWhereUniqueInputObjectSchema as MealAreaWhereUniqueInputObjectSchema } from './objects/MealAreaWhereUniqueInput.schema';
import { MealAreaScalarFieldEnumSchema } from './enums/MealAreaScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MealAreaFindFirstSelectSchema: z.ZodType<Prisma.MealAreaSelect> = z
  .object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    name: z.boolean().optional(),
    flag: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    recipes: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.MealAreaSelect>;

export const MealAreaFindFirstSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    name: z.boolean().optional(),
    flag: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    recipes: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const MealAreaFindFirstSchema: z.ZodType<Prisma.MealAreaFindFirstArgs> =
  z
    .object({
      select: MealAreaFindFirstSelectSchema.optional(),
      include: MealAreaIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          MealAreaOrderByWithRelationInputObjectSchema,
          MealAreaOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: MealAreaWhereInputObjectSchema.optional(),
      cursor: MealAreaWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MealAreaScalarFieldEnumSchema,
          MealAreaScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealAreaFindFirstArgs>;

export const MealAreaFindFirstZodSchema = z
  .object({
    select: MealAreaFindFirstSelectSchema.optional(),
    include: MealAreaIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        MealAreaOrderByWithRelationInputObjectSchema,
        MealAreaOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealAreaWhereInputObjectSchema.optional(),
    cursor: MealAreaWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MealAreaScalarFieldEnumSchema,
        MealAreaScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
