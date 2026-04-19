import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      ingredients: z.boolean().optional(),
      tags: z.boolean().optional(),
      collectionEntries: z.boolean().optional(),
      mealPlanSlots: z.boolean().optional(),
      cookingSessions: z.boolean().optional(),
    })
    .strict();
export const RecipeCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RecipeCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCountOutputTypeSelect>;
export const RecipeCountOutputTypeSelectObjectZodSchema = makeSchema();
