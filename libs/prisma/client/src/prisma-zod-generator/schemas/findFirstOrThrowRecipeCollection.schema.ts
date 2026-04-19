import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionIncludeObjectSchema as RecipeCollectionIncludeObjectSchema } from './objects/RecipeCollectionInclude.schema';
import { RecipeCollectionOrderByWithRelationInputObjectSchema as RecipeCollectionOrderByWithRelationInputObjectSchema } from './objects/RecipeCollectionOrderByWithRelationInput.schema';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './objects/RecipeCollectionWhereInput.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './objects/RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionScalarFieldEnumSchema } from './enums/RecipeCollectionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecipeCollectionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RecipeCollectionSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      name: z.boolean().optional(),
      emoji: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      user: z.boolean().optional(),
      recipes: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionSelect>;

export const RecipeCollectionFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    name: z.boolean().optional(),
    emoji: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    recipes: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const RecipeCollectionFindFirstOrThrowSchema: z.ZodType<Prisma.RecipeCollectionFindFirstOrThrowArgs> =
  z
    .object({
      select: RecipeCollectionFindFirstOrThrowSelectSchema.optional(),
      include: RecipeCollectionIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          RecipeCollectionOrderByWithRelationInputObjectSchema,
          RecipeCollectionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeCollectionWhereInputObjectSchema.optional(),
      cursor: RecipeCollectionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          RecipeCollectionScalarFieldEnumSchema,
          RecipeCollectionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionFindFirstOrThrowArgs>;

export const RecipeCollectionFindFirstOrThrowZodSchema = z
  .object({
    select: RecipeCollectionFindFirstOrThrowSelectSchema.optional(),
    include: RecipeCollectionIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeCollectionOrderByWithRelationInputObjectSchema,
        RecipeCollectionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeCollectionWhereInputObjectSchema.optional(),
    cursor: RecipeCollectionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RecipeCollectionScalarFieldEnumSchema,
        RecipeCollectionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
