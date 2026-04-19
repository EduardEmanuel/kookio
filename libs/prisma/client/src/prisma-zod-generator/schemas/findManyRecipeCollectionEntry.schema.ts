import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntryIncludeObjectSchema as RecipeCollectionEntryIncludeObjectSchema } from './objects/RecipeCollectionEntryInclude.schema';
import { RecipeCollectionEntryOrderByWithRelationInputObjectSchema as RecipeCollectionEntryOrderByWithRelationInputObjectSchema } from './objects/RecipeCollectionEntryOrderByWithRelationInput.schema';
import { RecipeCollectionEntryWhereInputObjectSchema as RecipeCollectionEntryWhereInputObjectSchema } from './objects/RecipeCollectionEntryWhereInput.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './objects/RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryScalarFieldEnumSchema } from './enums/RecipeCollectionEntryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecipeCollectionEntryFindManySelectSchema: z.ZodType<Prisma.RecipeCollectionEntrySelect> =
  z
    .object({
      collectionId: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      addedAt: z.boolean().optional(),
      collection: z.boolean().optional(),
      recipe: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntrySelect>;

export const RecipeCollectionEntryFindManySelectZodSchema = z
  .object({
    collectionId: z.boolean().optional(),
    recipeId: z.boolean().optional(),
    addedAt: z.boolean().optional(),
    collection: z.boolean().optional(),
    recipe: z.boolean().optional(),
  })
  .strict();

export const RecipeCollectionEntryFindManySchema: z.ZodType<Prisma.RecipeCollectionEntryFindManyArgs> =
  z
    .object({
      select: RecipeCollectionEntryFindManySelectSchema.optional(),
      include: RecipeCollectionEntryIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          RecipeCollectionEntryOrderByWithRelationInputObjectSchema,
          RecipeCollectionEntryOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
      cursor: RecipeCollectionEntryWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          RecipeCollectionEntryScalarFieldEnumSchema,
          RecipeCollectionEntryScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryFindManyArgs>;

export const RecipeCollectionEntryFindManyZodSchema = z
  .object({
    select: RecipeCollectionEntryFindManySelectSchema.optional(),
    include: RecipeCollectionEntryIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeCollectionEntryOrderByWithRelationInputObjectSchema,
        RecipeCollectionEntryOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
    cursor: RecipeCollectionEntryWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RecipeCollectionEntryScalarFieldEnumSchema,
        RecipeCollectionEntryScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
