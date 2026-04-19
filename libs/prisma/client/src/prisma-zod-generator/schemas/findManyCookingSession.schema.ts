import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionIncludeObjectSchema as CookingSessionIncludeObjectSchema } from './objects/CookingSessionInclude.schema';
import { CookingSessionOrderByWithRelationInputObjectSchema as CookingSessionOrderByWithRelationInputObjectSchema } from './objects/CookingSessionOrderByWithRelationInput.schema';
import { CookingSessionWhereInputObjectSchema as CookingSessionWhereInputObjectSchema } from './objects/CookingSessionWhereInput.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './objects/CookingSessionWhereUniqueInput.schema';
import { CookingSessionScalarFieldEnumSchema } from './enums/CookingSessionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CookingSessionFindManySelectSchema: z.ZodType<Prisma.CookingSessionSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      servings: z.boolean().optional(),
      completedAt: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      user: z.boolean().optional(),
      recipe: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionSelect>;

export const CookingSessionFindManySelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    recipeId: z.boolean().optional(),
    servings: z.boolean().optional(),
    completedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.boolean().optional(),
    recipe: z.boolean().optional(),
  })
  .strict();

export const CookingSessionFindManySchema: z.ZodType<Prisma.CookingSessionFindManyArgs> =
  z
    .object({
      select: CookingSessionFindManySelectSchema.optional(),
      include: CookingSessionIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          CookingSessionOrderByWithRelationInputObjectSchema,
          CookingSessionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: CookingSessionWhereInputObjectSchema.optional(),
      cursor: CookingSessionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CookingSessionScalarFieldEnumSchema,
          CookingSessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionFindManyArgs>;

export const CookingSessionFindManyZodSchema = z
  .object({
    select: CookingSessionFindManySelectSchema.optional(),
    include: CookingSessionIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        CookingSessionOrderByWithRelationInputObjectSchema,
        CookingSessionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: CookingSessionWhereInputObjectSchema.optional(),
    cursor: CookingSessionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        CookingSessionScalarFieldEnumSchema,
        CookingSessionScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
