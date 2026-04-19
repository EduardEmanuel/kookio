import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { IngredientCatalogArgsObjectSchema as IngredientCatalogArgsObjectSchema } from './IngredientCatalogArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      ingredientCatalogId: z.boolean().optional(),
      quantity: z.boolean().optional(),
      unit: z.boolean().optional(),
      expiresAt: z.boolean().optional(),
      addedAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      ingredient: z
        .union([z.boolean(), z.lazy(() => IngredientCatalogArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const PantryItemSelectObjectSchema: z.ZodType<Prisma.PantryItemSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemSelect>;
export const PantryItemSelectObjectZodSchema = makeSchema();
