import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIncludeObjectSchema as RecipeIncludeObjectSchema } from './objects/RecipeInclude.schema';
import { RecipeOrderByWithRelationInputObjectSchema as RecipeOrderByWithRelationInputObjectSchema } from './objects/RecipeOrderByWithRelationInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './objects/RecipeWhereInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './objects/RecipeWhereUniqueInput.schema';
import { RecipeScalarFieldEnumSchema } from './enums/RecipeScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecipeFindFirstSelectSchema: z.ZodType<Prisma.RecipeSelect> = z
  .object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    slug: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    youtubeUrl: z.boolean().optional(),
    sourceUrl: z.boolean().optional(),
    instructions: z.boolean().optional(),
    status: z.boolean().optional(),
    servings: z.boolean().optional(),
    prepTimeMinutes: z.boolean().optional(),
    cookTimeMinutes: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    areaId: z.boolean().optional(),
    authorId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    category: z.boolean().optional(),
    area: z.boolean().optional(),
    author: z.boolean().optional(),
    ingredients: z.boolean().optional(),
    tags: z.boolean().optional(),
    collectionEntries: z.boolean().optional(),
    mealPlanSlots: z.boolean().optional(),
    cookingSessions: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeSelect>;

export const RecipeFindFirstSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    slug: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    youtubeUrl: z.boolean().optional(),
    sourceUrl: z.boolean().optional(),
    instructions: z.boolean().optional(),
    status: z.boolean().optional(),
    servings: z.boolean().optional(),
    prepTimeMinutes: z.boolean().optional(),
    cookTimeMinutes: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    areaId: z.boolean().optional(),
    authorId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    category: z.boolean().optional(),
    area: z.boolean().optional(),
    author: z.boolean().optional(),
    ingredients: z.boolean().optional(),
    tags: z.boolean().optional(),
    collectionEntries: z.boolean().optional(),
    mealPlanSlots: z.boolean().optional(),
    cookingSessions: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const RecipeFindFirstSchema: z.ZodType<Prisma.RecipeFindFirstArgs> = z
  .object({
    select: RecipeFindFirstSelectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeOrderByWithRelationInputObjectSchema,
        RecipeOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeWhereInputObjectSchema.optional(),
    cursor: RecipeWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([RecipeScalarFieldEnumSchema, RecipeScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeFindFirstArgs>;

export const RecipeFindFirstZodSchema = z
  .object({
    select: RecipeFindFirstSelectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeOrderByWithRelationInputObjectSchema,
        RecipeOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeWhereInputObjectSchema.optional(),
    cursor: RecipeWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([RecipeScalarFieldEnumSchema, RecipeScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();
