import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { EnumMeasureUnitFilterObjectSchema as EnumMeasureUnitFilterObjectSchema } from './EnumMeasureUnitFilter.schema';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { IngredientCatalogScalarRelationFilterObjectSchema as IngredientCatalogScalarRelationFilterObjectSchema } from './IngredientCatalogScalarRelationFilter.schema';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './IngredientCatalogWhereInput.schema';

const pantryitemwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => PantryItemWhereInputObjectSchema),
        z.lazy(() => PantryItemWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PantryItemWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PantryItemWhereInputObjectSchema),
        z.lazy(() => PantryItemWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    ingredientCatalogId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    quantity: z
      .union([z.lazy(() => FloatFilterObjectSchema), z.number()])
      .optional(),
    unit: z
      .union([
        z.lazy(() => EnumMeasureUnitFilterObjectSchema),
        MeasureUnitSchema,
      ])
      .optional(),
    expiresAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    addedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    ingredient: z
      .union([
        z.lazy(() => IngredientCatalogScalarRelationFilterObjectSchema),
        z.lazy(() => IngredientCatalogWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const PantryItemWhereInputObjectSchema: z.ZodType<Prisma.PantryItemWhereInput> =
  pantryitemwhereinputSchema as unknown as z.ZodType<Prisma.PantryItemWhereInput>;
export const PantryItemWhereInputObjectZodSchema = pantryitemwhereinputSchema;
