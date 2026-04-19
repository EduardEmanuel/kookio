import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumMeasureUnitNullableFilterObjectSchema as NestedEnumMeasureUnitNullableFilterObjectSchema } from './NestedEnumMeasureUnitNullableFilter.schema';

const nestedenummeasureunitnullablewithaggregatesfilterSchema = z
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
export const NestedEnumMeasureUnitNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumMeasureUnitNullableWithAggregatesFilter> =
  nestedenummeasureunitnullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumMeasureUnitNullableWithAggregatesFilter>;
export const NestedEnumMeasureUnitNullableWithAggregatesFilterObjectZodSchema =
  nestedenummeasureunitnullablewithaggregatesfilterSchema;
