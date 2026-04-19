import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MealPlanOrderByWithRelationInputObjectSchema as MealPlanOrderByWithRelationInputObjectSchema } from './MealPlanOrderByWithRelationInput.schema';
import { RecipeOrderByWithRelationInputObjectSchema as RecipeOrderByWithRelationInputObjectSchema } from './RecipeOrderByWithRelationInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      mealPlanId: SortOrderSchema.optional(),
      recipeId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      date: SortOrderSchema.optional(),
      slotType: SortOrderSchema.optional(),
      servings: SortOrderSchema.optional(),
      mealPlan: z
        .lazy(() => MealPlanOrderByWithRelationInputObjectSchema)
        .optional(),
      recipe: z
        .lazy(() => RecipeOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealPlanSlotOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MealPlanSlotOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotOrderByWithRelationInput>;
export const MealPlanSlotOrderByWithRelationInputObjectZodSchema = makeSchema();
