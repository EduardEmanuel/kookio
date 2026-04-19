import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemIncludeObjectSchema as PantryItemIncludeObjectSchema } from './objects/PantryItemInclude.schema';
import { PantryItemOrderByWithRelationInputObjectSchema as PantryItemOrderByWithRelationInputObjectSchema } from './objects/PantryItemOrderByWithRelationInput.schema';
import { PantryItemWhereInputObjectSchema as PantryItemWhereInputObjectSchema } from './objects/PantryItemWhereInput.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './objects/PantryItemWhereUniqueInput.schema';
import { PantryItemScalarFieldEnumSchema } from './enums/PantryItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PantryItemFindFirstOrThrowSelectSchema: z.ZodType<Prisma.PantryItemSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      ingredientCatalogId: z.boolean().optional(),
      quantity: z.boolean().optional(),
      unit: z.boolean().optional(),
      expiresAt: z.boolean().optional(),
      addedAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      user: z.boolean().optional(),
      ingredient: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemSelect>;

export const PantryItemFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    ingredientCatalogId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    unit: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    addedAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    ingredient: z.boolean().optional(),
  })
  .strict();

export const PantryItemFindFirstOrThrowSchema: z.ZodType<Prisma.PantryItemFindFirstOrThrowArgs> =
  z
    .object({
      select: PantryItemFindFirstOrThrowSelectSchema.optional(),
      include: PantryItemIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          PantryItemOrderByWithRelationInputObjectSchema,
          PantryItemOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: PantryItemWhereInputObjectSchema.optional(),
      cursor: PantryItemWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PantryItemScalarFieldEnumSchema,
          PantryItemScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemFindFirstOrThrowArgs>;

export const PantryItemFindFirstOrThrowZodSchema = z
  .object({
    select: PantryItemFindFirstOrThrowSelectSchema.optional(),
    include: PantryItemIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        PantryItemOrderByWithRelationInputObjectSchema,
        PantryItemOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: PantryItemWhereInputObjectSchema.optional(),
    cursor: PantryItemWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        PantryItemScalarFieldEnumSchema,
        PantryItemScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
