import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { RecipeOrderByWithRelationInputObjectSchema as RecipeOrderByWithRelationInputObjectSchema } from './RecipeOrderByWithRelationInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      servings: SortOrderSchema.optional(),
      completedAt: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
      recipe: z
        .lazy(() => RecipeOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();
export const CookingSessionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CookingSessionOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionOrderByWithRelationInput>;
export const CookingSessionOrderByWithRelationInputObjectZodSchema =
  makeSchema();
