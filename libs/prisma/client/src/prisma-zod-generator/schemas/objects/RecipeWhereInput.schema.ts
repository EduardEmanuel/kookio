import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumRecipeStatusFilterObjectSchema as EnumRecipeStatusFilterObjectSchema } from './EnumRecipeStatusFilter.schema';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { MealCategoryNullableScalarRelationFilterObjectSchema as MealCategoryNullableScalarRelationFilterObjectSchema } from './MealCategoryNullableScalarRelationFilter.schema';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './MealCategoryWhereInput.schema';
import { MealAreaNullableScalarRelationFilterObjectSchema as MealAreaNullableScalarRelationFilterObjectSchema } from './MealAreaNullableScalarRelationFilter.schema';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './MealAreaWhereInput.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { RecipeIngredientListRelationFilterObjectSchema as RecipeIngredientListRelationFilterObjectSchema } from './RecipeIngredientListRelationFilter.schema';
import { RecipeTagListRelationFilterObjectSchema as RecipeTagListRelationFilterObjectSchema } from './RecipeTagListRelationFilter.schema';
import { RecipeCollectionEntryListRelationFilterObjectSchema as RecipeCollectionEntryListRelationFilterObjectSchema } from './RecipeCollectionEntryListRelationFilter.schema';
import { MealPlanSlotListRelationFilterObjectSchema as MealPlanSlotListRelationFilterObjectSchema } from './MealPlanSlotListRelationFilter.schema';
import { CookingSessionListRelationFilterObjectSchema as CookingSessionListRelationFilterObjectSchema } from './CookingSessionListRelationFilter.schema';

const recipewhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => RecipeWhereInputObjectSchema),
        z.lazy(() => RecipeWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RecipeWhereInputObjectSchema),
        z.lazy(() => RecipeWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    externalId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    slug: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    title: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    youtubeUrl: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    sourceUrl: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    instructions: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    status: z
      .union([
        z.lazy(() => EnumRecipeStatusFilterObjectSchema),
        RecipeStatusSchema,
      ])
      .optional(),
    servings: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    prepTimeMinutes: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
      .optional()
      .nullable(),
    cookTimeMinutes: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
      .optional()
      .nullable(),
    categoryId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    areaId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    authorId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    category: z
      .union([
        z.lazy(() => MealCategoryNullableScalarRelationFilterObjectSchema),
        z.lazy(() => MealCategoryWhereInputObjectSchema),
      ])
      .optional(),
    area: z
      .union([
        z.lazy(() => MealAreaNullableScalarRelationFilterObjectSchema),
        z.lazy(() => MealAreaWhereInputObjectSchema),
      ])
      .optional(),
    author: z
      .union([
        z.lazy(() => UserNullableScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    ingredients: z
      .lazy(() => RecipeIngredientListRelationFilterObjectSchema)
      .optional(),
    tags: z.lazy(() => RecipeTagListRelationFilterObjectSchema).optional(),
    collectionEntries: z
      .lazy(() => RecipeCollectionEntryListRelationFilterObjectSchema)
      .optional(),
    mealPlanSlots: z
      .lazy(() => MealPlanSlotListRelationFilterObjectSchema)
      .optional(),
    cookingSessions: z
      .lazy(() => CookingSessionListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();
export const RecipeWhereInputObjectSchema: z.ZodType<Prisma.RecipeWhereInput> =
  recipewhereinputSchema as unknown as z.ZodType<Prisma.RecipeWhereInput>;
export const RecipeWhereInputObjectZodSchema = recipewhereinputSchema;
