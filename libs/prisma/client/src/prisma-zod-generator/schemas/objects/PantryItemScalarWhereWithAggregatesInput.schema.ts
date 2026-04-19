import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { FloatWithAggregatesFilterObjectSchema as FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema';
import { EnumMeasureUnitWithAggregatesFilterObjectSchema as EnumMeasureUnitWithAggregatesFilterObjectSchema } from './EnumMeasureUnitWithAggregatesFilter.schema';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';

const pantryitemscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => PantryItemScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => PantryItemScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PantryItemScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PantryItemScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => PantryItemScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    ingredientCatalogId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    quantity: z
      .union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    unit: z
      .union([
        z.lazy(() => EnumMeasureUnitWithAggregatesFilterObjectSchema),
        MeasureUnitSchema,
      ])
      .optional(),
    expiresAt: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    addedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
  })
  .strict();
export const PantryItemScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PantryItemScalarWhereWithAggregatesInput> =
  pantryitemscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PantryItemScalarWhereWithAggregatesInput>;
export const PantryItemScalarWhereWithAggregatesInputObjectZodSchema =
  pantryitemscalarwherewithaggregatesinputSchema;
