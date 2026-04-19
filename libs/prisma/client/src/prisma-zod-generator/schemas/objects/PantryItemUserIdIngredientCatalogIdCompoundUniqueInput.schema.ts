import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
      ingredientCatalogId: z.string(),
    })
    .strict();
export const PantryItemUserIdIngredientCatalogIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.PantryItemUserIdIngredientCatalogIdCompoundUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUserIdIngredientCatalogIdCompoundUniqueInput>;
export const PantryItemUserIdIngredientCatalogIdCompoundUniqueInputObjectZodSchema =
  makeSchema();
