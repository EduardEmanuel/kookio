import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { IngredientCatalogCreateNestedOneWithoutPantryItemsInputObjectSchema as IngredientCatalogCreateNestedOneWithoutPantryItemsInputObjectSchema } from './IngredientCatalogCreateNestedOneWithoutPantryItemsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      quantity: z.number(),
      unit: MeasureUnitSchema,
      expiresAt: z.coerce.date().optional().nullable(),
      addedAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      ingredient: z.lazy(
        () =>
          IngredientCatalogCreateNestedOneWithoutPantryItemsInputObjectSchema,
      ),
    })
    .strict();
export const PantryItemCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PantryItemCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemCreateWithoutUserInput>;
export const PantryItemCreateWithoutUserInputObjectZodSchema = makeSchema();
