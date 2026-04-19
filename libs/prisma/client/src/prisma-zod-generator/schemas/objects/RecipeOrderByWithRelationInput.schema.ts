import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MealCategoryOrderByWithRelationInputObjectSchema as MealCategoryOrderByWithRelationInputObjectSchema } from './MealCategoryOrderByWithRelationInput.schema';
import { MealAreaOrderByWithRelationInputObjectSchema as MealAreaOrderByWithRelationInputObjectSchema } from './MealAreaOrderByWithRelationInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { RecipeIngredientOrderByRelationAggregateInputObjectSchema as RecipeIngredientOrderByRelationAggregateInputObjectSchema } from './RecipeIngredientOrderByRelationAggregateInput.schema';
import { RecipeTagOrderByRelationAggregateInputObjectSchema as RecipeTagOrderByRelationAggregateInputObjectSchema } from './RecipeTagOrderByRelationAggregateInput.schema';
import { RecipeCollectionEntryOrderByRelationAggregateInputObjectSchema as RecipeCollectionEntryOrderByRelationAggregateInputObjectSchema } from './RecipeCollectionEntryOrderByRelationAggregateInput.schema';
import { MealPlanSlotOrderByRelationAggregateInputObjectSchema as MealPlanSlotOrderByRelationAggregateInputObjectSchema } from './MealPlanSlotOrderByRelationAggregateInput.schema';
import { CookingSessionOrderByRelationAggregateInputObjectSchema as CookingSessionOrderByRelationAggregateInputObjectSchema } from './CookingSessionOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      slug: SortOrderSchema.optional(),
      title: SortOrderSchema.optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      imageUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      youtubeUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      sourceUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      instructions: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      servings: SortOrderSchema.optional(),
      prepTimeMinutes: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      cookTimeMinutes: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      categoryId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      areaId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      authorId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      category: z
        .lazy(() => MealCategoryOrderByWithRelationInputObjectSchema)
        .optional(),
      area: z
        .lazy(() => MealAreaOrderByWithRelationInputObjectSchema)
        .optional(),
      author: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
      ingredients: z
        .lazy(() => RecipeIngredientOrderByRelationAggregateInputObjectSchema)
        .optional(),
      tags: z
        .lazy(() => RecipeTagOrderByRelationAggregateInputObjectSchema)
        .optional(),
      collectionEntries: z
        .lazy(
          () => RecipeCollectionEntryOrderByRelationAggregateInputObjectSchema,
        )
        .optional(),
      mealPlanSlots: z
        .lazy(() => MealPlanSlotOrderByRelationAggregateInputObjectSchema)
        .optional(),
      cookingSessions: z
        .lazy(() => CookingSessionOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RecipeOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeOrderByWithRelationInput>;
export const RecipeOrderByWithRelationInputObjectZodSchema = makeSchema();
