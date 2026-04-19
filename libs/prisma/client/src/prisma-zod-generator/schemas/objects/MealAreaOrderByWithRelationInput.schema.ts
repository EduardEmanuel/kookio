import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RecipeOrderByRelationAggregateInputObjectSchema as RecipeOrderByRelationAggregateInputObjectSchema } from './RecipeOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      flag: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      recipes: z
        .lazy(() => RecipeOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealAreaOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MealAreaOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaOrderByWithRelationInput>;
export const MealAreaOrderByWithRelationInputObjectZodSchema = makeSchema();
