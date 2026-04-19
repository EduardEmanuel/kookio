import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { UserCreateNestedOneWithoutPantryItemsInputObjectSchema as UserCreateNestedOneWithoutPantryItemsInputObjectSchema } from './UserCreateNestedOneWithoutPantryItemsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      quantity: z.number(),
      unit: MeasureUnitSchema,
      expiresAt: z.coerce.date().optional().nullable(),
      addedAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user: z.lazy(
        () => UserCreateNestedOneWithoutPantryItemsInputObjectSchema,
      ),
    })
    .strict();
export const PantryItemCreateWithoutIngredientInputObjectSchema: z.ZodType<Prisma.PantryItemCreateWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemCreateWithoutIngredientInput>;
export const PantryItemCreateWithoutIngredientInputObjectZodSchema =
  makeSchema();
