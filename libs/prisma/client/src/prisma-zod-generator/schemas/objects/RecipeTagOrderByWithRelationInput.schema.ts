import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecipeOrderByWithRelationInputObjectSchema as RecipeOrderByWithRelationInputObjectSchema } from './RecipeOrderByWithRelationInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      tag: SortOrderSchema.optional(),
      recipe: z
        .lazy(() => RecipeOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeTagOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RecipeTagOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagOrderByWithRelationInput>;
export const RecipeTagOrderByWithRelationInputObjectZodSchema = makeSchema();
