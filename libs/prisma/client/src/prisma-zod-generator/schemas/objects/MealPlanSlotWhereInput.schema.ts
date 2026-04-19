import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumMealSlotTypeFilterObjectSchema as EnumMealSlotTypeFilterObjectSchema } from './EnumMealSlotTypeFilter.schema';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { MealPlanScalarRelationFilterObjectSchema as MealPlanScalarRelationFilterObjectSchema } from './MealPlanScalarRelationFilter.schema';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './MealPlanWhereInput.schema';
import { RecipeNullableScalarRelationFilterObjectSchema as RecipeNullableScalarRelationFilterObjectSchema } from './RecipeNullableScalarRelationFilter.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const mealplanslotwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => MealPlanSlotWhereInputObjectSchema),
        z.lazy(() => MealPlanSlotWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MealPlanSlotWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MealPlanSlotWhereInputObjectSchema),
        z.lazy(() => MealPlanSlotWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    mealPlanId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    date: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    slotType: z
      .union([
        z.lazy(() => EnumMealSlotTypeFilterObjectSchema),
        MealSlotTypeSchema,
      ])
      .optional(),
    servings: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    mealPlan: z
      .union([
        z.lazy(() => MealPlanScalarRelationFilterObjectSchema),
        z.lazy(() => MealPlanWhereInputObjectSchema),
      ])
      .optional(),
    recipe: z
      .union([
        z.lazy(() => RecipeNullableScalarRelationFilterObjectSchema),
        z.lazy(() => RecipeWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const MealPlanSlotWhereInputObjectSchema: z.ZodType<Prisma.MealPlanSlotWhereInput> =
  mealplanslotwhereinputSchema as unknown as z.ZodType<Prisma.MealPlanSlotWhereInput>;
export const MealPlanSlotWhereInputObjectZodSchema =
  mealplanslotwhereinputSchema;
