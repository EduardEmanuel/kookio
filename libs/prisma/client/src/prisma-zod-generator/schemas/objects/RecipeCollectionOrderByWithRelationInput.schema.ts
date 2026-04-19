import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { RecipeCollectionEntryOrderByRelationAggregateInputObjectSchema as RecipeCollectionEntryOrderByRelationAggregateInputObjectSchema } from './RecipeCollectionEntryOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      emoji: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
      recipes: z
        .lazy(
          () => RecipeCollectionEntryOrderByRelationAggregateInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCollectionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RecipeCollectionOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionOrderByWithRelationInput>;
export const RecipeCollectionOrderByWithRelationInputObjectZodSchema =
  makeSchema();
