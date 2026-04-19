import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
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
          z.lazy(() => NestedEnumMeasureUnitNullableFilterObjectSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();
export const EnumMeasureUnitNullableFilterObjectSchema: z.ZodType<Prisma.EnumMeasureUnitNullableFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumMeasureUnitNullableFilter>;
export const EnumMeasureUnitNullableFilterObjectZodSchema = makeSchema();
