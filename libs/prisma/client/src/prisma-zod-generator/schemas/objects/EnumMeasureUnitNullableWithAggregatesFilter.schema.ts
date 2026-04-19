import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { NestedEnumMeasureUnitNullableWithAggregatesFilterObjectSchema as NestedEnumMeasureUnitNullableWithAggregatesFilterObjectSchema } from './NestedEnumMeasureUnitNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumMeasureUnitNullableFilterObjectSchema as NestedEnumMeasureUnitNullableFilterObjectSchema } from './NestedEnumMeasureUnitNullableFilter.schema';

const makeSchema = () =>
  z
    .object({
      equals: MeasureUnitSchema.optional().nullable(),
      in: MeasureUnitSchema.array().optional().nullable(),
      notIn: MeasureUnitSchema.array().optional().nullable(),
      not: z
        .union([
          MeasureUnitSchema,
          z.lazy(
            () => NestedEnumMeasureUnitNullableWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumMeasureUnitNullableFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumMeasureUnitNullableFilterObjectSchema)
        .optional(),
    })
    .strict();
export const EnumMeasureUnitNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumMeasureUnitNullableWithAggregatesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumMeasureUnitNullableWithAggregatesFilter>;
export const EnumMeasureUnitNullableWithAggregatesFilterObjectZodSchema =
  makeSchema();
