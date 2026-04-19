import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealCategoryArgsObjectSchema as MealCategoryArgsObjectSchema } from './MealCategoryArgs.schema';
import { MealAreaArgsObjectSchema as MealAreaArgsObjectSchema } from './MealAreaArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RecipeIngredientFindManySchema as RecipeIngredientFindManySchema } from '../findManyRecipeIngredient.schema';
import { RecipeTagFindManySchema as RecipeTagFindManySchema } from '../findManyRecipeTag.schema';
import { RecipeCollectionEntryFindManySchema as RecipeCollectionEntryFindManySchema } from '../findManyRecipeCollectionEntry.schema';
import { MealPlanSlotFindManySchema as MealPlanSlotFindManySchema } from '../findManyMealPlanSlot.schema';
import { CookingSessionFindManySchema as CookingSessionFindManySchema } from '../findManyCookingSession.schema';
import { RecipeCountOutputTypeArgsObjectSchema as RecipeCountOutputTypeArgsObjectSchema } from './RecipeCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      category: z
        .union([z.boolean(), z.lazy(() => MealCategoryArgsObjectSchema)])
        .optional(),
      area: z
        .union([z.boolean(), z.lazy(() => MealAreaArgsObjectSchema)])
        .optional(),
      author: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      ingredients: z
        .union([z.boolean(), z.lazy(() => RecipeIngredientFindManySchema)])
        .optional(),
      tags: z
        .union([z.boolean(), z.lazy(() => RecipeTagFindManySchema)])
        .optional(),
      collectionEntries: z
        .union([z.boolean(), z.lazy(() => RecipeCollectionEntryFindManySchema)])
        .optional(),
      mealPlanSlots: z
        .union([z.boolean(), z.lazy(() => MealPlanSlotFindManySchema)])
        .optional(),
      cookingSessions: z
        .union([z.boolean(), z.lazy(() => CookingSessionFindManySchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => RecipeCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const RecipeIncludeObjectSchema: z.ZodType<Prisma.RecipeInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeInclude>;
export const RecipeIncludeObjectZodSchema = makeSchema();
