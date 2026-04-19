import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { IngredientCatalogOrderByWithRelationInputObjectSchema as IngredientCatalogOrderByWithRelationInputObjectSchema } from './IngredientCatalogOrderByWithRelationInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      ingredientCatalogId: SortOrderSchema.optional(),
      quantity: SortOrderSchema.optional(),
      unit: SortOrderSchema.optional(),
      expiresAt: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      addedAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
      ingredient: z
        .lazy(() => IngredientCatalogOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();
export const PantryItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PantryItemOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemOrderByWithRelationInput>;
export const PantryItemOrderByWithRelationInputObjectZodSchema = makeSchema();
