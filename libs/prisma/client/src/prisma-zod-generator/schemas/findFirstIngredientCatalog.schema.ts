import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogIncludeObjectSchema as IngredientCatalogIncludeObjectSchema } from './objects/IngredientCatalogInclude.schema';
import { IngredientCatalogOrderByWithRelationInputObjectSchema as IngredientCatalogOrderByWithRelationInputObjectSchema } from './objects/IngredientCatalogOrderByWithRelationInput.schema';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './objects/IngredientCatalogWhereInput.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './objects/IngredientCatalogWhereUniqueInput.schema';
import { IngredientCatalogScalarFieldEnumSchema } from './enums/IngredientCatalogScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const IngredientCatalogFindFirstSelectSchema: z.ZodType<Prisma.IngredientCatalogSelect> =
  z
    .object({
      id: z.boolean().optional(),
      externalId: z.boolean().optional(),
      name: z.boolean().optional(),
      normalizedName: z.boolean().optional(),
      description: z.boolean().optional(),
      imageUrl: z.boolean().optional(),
      category: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      recipeIngredients: z.boolean().optional(),
      pantryItems: z.boolean().optional(),
      _count: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogSelect>;

export const IngredientCatalogFindFirstSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    externalId: z.boolean().optional(),
    name: z.boolean().optional(),
    normalizedName: z.boolean().optional(),
    description: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    category: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    recipeIngredients: z.boolean().optional(),
    pantryItems: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const IngredientCatalogFindFirstSchema: z.ZodType<Prisma.IngredientCatalogFindFirstArgs> =
  z
    .object({
      select: IngredientCatalogFindFirstSelectSchema.optional(),
      include: IngredientCatalogIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          IngredientCatalogOrderByWithRelationInputObjectSchema,
          IngredientCatalogOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: IngredientCatalogWhereInputObjectSchema.optional(),
      cursor: IngredientCatalogWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          IngredientCatalogScalarFieldEnumSchema,
          IngredientCatalogScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogFindFirstArgs>;

export const IngredientCatalogFindFirstZodSchema = z
  .object({
    select: IngredientCatalogFindFirstSelectSchema.optional(),
    include: IngredientCatalogIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        IngredientCatalogOrderByWithRelationInputObjectSchema,
        IngredientCatalogOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: IngredientCatalogWhereInputObjectSchema.optional(),
    cursor: IngredientCatalogWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        IngredientCatalogScalarFieldEnumSchema,
        IngredientCatalogScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
