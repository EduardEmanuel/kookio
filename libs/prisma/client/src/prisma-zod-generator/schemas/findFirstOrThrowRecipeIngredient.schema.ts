import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientIncludeObjectSchema as RecipeIngredientIncludeObjectSchema } from './objects/RecipeIngredientInclude.schema';
import { RecipeIngredientOrderByWithRelationInputObjectSchema as RecipeIngredientOrderByWithRelationInputObjectSchema } from './objects/RecipeIngredientOrderByWithRelationInput.schema';
import { RecipeIngredientWhereInputObjectSchema as RecipeIngredientWhereInputObjectSchema } from './objects/RecipeIngredientWhereInput.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './objects/RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientScalarFieldEnumSchema } from './enums/RecipeIngredientScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecipeIngredientFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RecipeIngredientSelect> =
  z
    .object({
      id: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      ingredientCatalogId: z.boolean().optional(),
      quantity: z.boolean().optional(),
      unit: z.boolean().optional(),
      notes: z.boolean().optional(),
      recipe: z.boolean().optional(),
      ingredient: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientSelect>;

export const RecipeIngredientFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    recipeId: z.boolean().optional(),
    ingredientCatalogId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    unit: z.boolean().optional(),
    notes: z.boolean().optional(),
    recipe: z.boolean().optional(),
    ingredient: z.boolean().optional(),
  })
  .strict();

export const RecipeIngredientFindFirstOrThrowSchema: z.ZodType<Prisma.RecipeIngredientFindFirstOrThrowArgs> =
  z
    .object({
      select: RecipeIngredientFindFirstOrThrowSelectSchema.optional(),
      include: RecipeIngredientIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          RecipeIngredientOrderByWithRelationInputObjectSchema,
          RecipeIngredientOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeIngredientWhereInputObjectSchema.optional(),
      cursor: RecipeIngredientWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          RecipeIngredientScalarFieldEnumSchema,
          RecipeIngredientScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientFindFirstOrThrowArgs>;

export const RecipeIngredientFindFirstOrThrowZodSchema = z
  .object({
    select: RecipeIngredientFindFirstOrThrowSelectSchema.optional(),
    include: RecipeIngredientIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeIngredientOrderByWithRelationInputObjectSchema,
        RecipeIngredientOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeIngredientWhereInputObjectSchema.optional(),
    cursor: RecipeIngredientWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RecipeIngredientScalarFieldEnumSchema,
        RecipeIngredientScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
