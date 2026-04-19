import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanIncludeObjectSchema as MealPlanIncludeObjectSchema } from './objects/MealPlanInclude.schema';
import { MealPlanOrderByWithRelationInputObjectSchema as MealPlanOrderByWithRelationInputObjectSchema } from './objects/MealPlanOrderByWithRelationInput.schema';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './objects/MealPlanWhereInput.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './objects/MealPlanWhereUniqueInput.schema';
import { MealPlanScalarFieldEnumSchema } from './enums/MealPlanScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MealPlanFindManySelectSchema: z.ZodType<Prisma.MealPlanSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    name: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    slots: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.MealPlanSelect>;

export const MealPlanFindManySelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    name: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    slots: z.boolean().optional(),
    _count: z.boolean().optional(),
  })
  .strict();

export const MealPlanFindManySchema: z.ZodType<Prisma.MealPlanFindManyArgs> = z
  .object({
    select: MealPlanFindManySelectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        MealPlanOrderByWithRelationInputObjectSchema,
        MealPlanOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealPlanWhereInputObjectSchema.optional(),
    cursor: MealPlanWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MealPlanScalarFieldEnumSchema,
        MealPlanScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.MealPlanFindManyArgs>;

export const MealPlanFindManyZodSchema = z
  .object({
    select: MealPlanFindManySelectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        MealPlanOrderByWithRelationInputObjectSchema,
        MealPlanOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealPlanWhereInputObjectSchema.optional(),
    cursor: MealPlanWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MealPlanScalarFieldEnumSchema,
        MealPlanScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
