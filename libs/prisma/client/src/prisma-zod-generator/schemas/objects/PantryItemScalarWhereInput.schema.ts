import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { EnumMeasureUnitFilterObjectSchema as EnumMeasureUnitFilterObjectSchema } from './EnumMeasureUnitFilter.schema';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

const pantryitemscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => PantryItemScalarWhereInputObjectSchema),
        z.lazy(() => PantryItemScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PantryItemScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PantryItemScalarWhereInputObjectSchema),
        z.lazy(() => PantryItemScalarWhereInputObjectSchema).array(),
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
  })
  .strict();
export const PantryItemScalarWhereInputObjectSchema: z.ZodType<Prisma.PantryItemScalarWhereInput> =
  pantryitemscalarwhereinputSchema as unknown as z.ZodType<Prisma.PantryItemScalarWhereInput>;
export const PantryItemScalarWhereInputObjectZodSchema =
  pantryitemscalarwhereinputSchema;
