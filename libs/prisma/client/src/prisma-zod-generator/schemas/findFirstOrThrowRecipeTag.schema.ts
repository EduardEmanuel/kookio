import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagIncludeObjectSchema as RecipeTagIncludeObjectSchema } from './objects/RecipeTagInclude.schema';
import { RecipeTagOrderByWithRelationInputObjectSchema as RecipeTagOrderByWithRelationInputObjectSchema } from './objects/RecipeTagOrderByWithRelationInput.schema';
import { RecipeTagWhereInputObjectSchema as RecipeTagWhereInputObjectSchema } from './objects/RecipeTagWhereInput.schema';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './objects/RecipeTagWhereUniqueInput.schema';
import { RecipeTagScalarFieldEnumSchema } from './enums/RecipeTagScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecipeTagFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RecipeTagSelect> =
  z
    .object({
      id: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      tag: z.boolean().optional(),
      recipe: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeTagSelect>;

export const RecipeTagFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    recipeId: z.boolean().optional(),
    tag: z.boolean().optional(),
    recipe: z.boolean().optional(),
  })
  .strict();

export const RecipeTagFindFirstOrThrowSchema: z.ZodType<Prisma.RecipeTagFindFirstOrThrowArgs> =
  z
    .object({
      select: RecipeTagFindFirstOrThrowSelectSchema.optional(),
      include: RecipeTagIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          RecipeTagOrderByWithRelationInputObjectSchema,
          RecipeTagOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeTagWhereInputObjectSchema.optional(),
      cursor: RecipeTagWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          RecipeTagScalarFieldEnumSchema,
          RecipeTagScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeTagFindFirstOrThrowArgs>;

export const RecipeTagFindFirstOrThrowZodSchema = z
  .object({
    select: RecipeTagFindFirstOrThrowSelectSchema.optional(),
    include: RecipeTagIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeTagOrderByWithRelationInputObjectSchema,
        RecipeTagOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeTagWhereInputObjectSchema.optional(),
    cursor: RecipeTagWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        RecipeTagScalarFieldEnumSchema,
        RecipeTagScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
