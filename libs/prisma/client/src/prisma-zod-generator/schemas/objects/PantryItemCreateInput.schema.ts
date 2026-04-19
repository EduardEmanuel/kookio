import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { UserCreateNestedOneWithoutPantryItemsInputObjectSchema as UserCreateNestedOneWithoutPantryItemsInputObjectSchema } from './UserCreateNestedOneWithoutPantryItemsInput.schema';
import { IngredientCatalogCreateNestedOneWithoutPantryItemsInputObjectSchema as IngredientCatalogCreateNestedOneWithoutPantryItemsInputObjectSchema } from './IngredientCatalogCreateNestedOneWithoutPantryItemsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      quantity: z.number(),
      unit: MeasureUnitSchema,
      expiresAt: z.coerce.date().optional().nullable(),
      addedAt: z.coerce.date().optional(),
      user: z.lazy(
        () => UserCreateNestedOneWithoutPantryItemsInputObjectSchema,
      ),
      ingredient: z.lazy(
        () =>
          IngredientCatalogCreateNestedOneWithoutPantryItemsInputObjectSchema,
      ),
    })
    .strict();
export const PantryItemCreateInputObjectSchema: z.ZodType<Prisma.PantryItemCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemCreateInput>;
export const PantryItemCreateInputObjectZodSchema = makeSchema();
