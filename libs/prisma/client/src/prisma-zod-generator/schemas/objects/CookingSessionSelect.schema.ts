import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      servings: z.boolean().optional(),
      completedAt: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const CookingSessionSelectObjectSchema: z.ZodType<Prisma.CookingSessionSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionSelect>;
export const CookingSessionSelectObjectZodSchema = makeSchema();
