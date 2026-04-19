import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategoryIncludeObjectSchema as MealCategoryIncludeObjectSchema } from './objects/MealCategoryInclude.schema';
import { MealCategoryOrderByWithRelationInputObjectSchema as MealCategoryOrderByWithRelationInputObjectSchema } from './objects/MealCategoryOrderByWithRelationInput.schema';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './objects/MealCategoryWhereInput.schema';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './objects/MealCategoryWhereUniqueInput.schema';
import { MealCategoryScalarFieldEnumSchema } from './enums/MealCategoryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MealCategoryFindFirstSelectSchema: z.ZodType<Prisma.MealCategorySelect> =
  z
    .object({
      id: z.boolean().optional(),
      externalId: z.boolean().optional(),
      name: z.boolean().optional(),
      imageUrl: z.boolean().optional(),
      description: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      recipes: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategorySelect>;

export const MealCategoryFindFirstSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    name: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    description: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    recipes: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const MealCategoryFindFirstSchema: z.ZodType<Prisma.MealCategoryFindFirstArgs> =
  z
    .object({
      select: MealCategoryFindFirstSelectSchema.optional(),
      include: MealCategoryIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          MealCategoryOrderByWithRelationInputObjectSchema,
          MealCategoryOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: MealCategoryWhereInputObjectSchema.optional(),
      cursor: MealCategoryWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MealCategoryScalarFieldEnumSchema,
          MealCategoryScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryFindFirstArgs>;

export const MealCategoryFindFirstZodSchema = z
  .object({
    select: MealCategoryFindFirstSelectSchema.optional(),
    include: MealCategoryIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        MealCategoryOrderByWithRelationInputObjectSchema,
        MealCategoryOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealCategoryWhereInputObjectSchema.optional(),
    cursor: MealCategoryWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MealCategoryScalarFieldEnumSchema,
        MealCategoryScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
