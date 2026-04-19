import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotIncludeObjectSchema as MealPlanSlotIncludeObjectSchema } from './objects/MealPlanSlotInclude.schema';
import { MealPlanSlotOrderByWithRelationInputObjectSchema as MealPlanSlotOrderByWithRelationInputObjectSchema } from './objects/MealPlanSlotOrderByWithRelationInput.schema';
import { MealPlanSlotWhereInputObjectSchema as MealPlanSlotWhereInputObjectSchema } from './objects/MealPlanSlotWhereInput.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './objects/MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotScalarFieldEnumSchema } from './enums/MealPlanSlotScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MealPlanSlotFindFirstOrThrowSelectSchema: z.ZodType<Prisma.MealPlanSlotSelect> =
  z
    .object({
      id: z.boolean().optional(),
      mealPlanId: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      date: z.boolean().optional(),
      slotType: z.boolean().optional(),
      servings: z.boolean().optional(),
      mealPlan: z.boolean().optional(),
      recipe: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotSelect>;

export const MealPlanSlotFindFirstOrThrowSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    mealPlanId: z.boolean().optional(),
    recipeId: z.boolean().optional(),
    date: z.boolean().optional(),
    slotType: z.boolean().optional(),
    servings: z.boolean().optional(),
    mealPlan: z.boolean().optional(),
    recipe: z.boolean().optional(),
  })
  .strict();

export const MealPlanSlotFindFirstOrThrowSchema: z.ZodType<Prisma.MealPlanSlotFindFirstOrThrowArgs> =
  z
    .object({
      select: MealPlanSlotFindFirstOrThrowSelectSchema.optional(),
      include: MealPlanSlotIncludeObjectSchema.optional(),
      orderBy: z
        .union([
          MealPlanSlotOrderByWithRelationInputObjectSchema,
          MealPlanSlotOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: MealPlanSlotWhereInputObjectSchema.optional(),
      cursor: MealPlanSlotWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          MealPlanSlotScalarFieldEnumSchema,
          MealPlanSlotScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotFindFirstOrThrowArgs>;

export const MealPlanSlotFindFirstOrThrowZodSchema = z
  .object({
    select: MealPlanSlotFindFirstOrThrowSelectSchema.optional(),
    include: MealPlanSlotIncludeObjectSchema.optional(),
    orderBy: z
      .union([
        MealPlanSlotOrderByWithRelationInputObjectSchema,
        MealPlanSlotOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealPlanSlotWhereInputObjectSchema.optional(),
    cursor: MealPlanSlotWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        MealPlanSlotScalarFieldEnumSchema,
        MealPlanSlotScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
