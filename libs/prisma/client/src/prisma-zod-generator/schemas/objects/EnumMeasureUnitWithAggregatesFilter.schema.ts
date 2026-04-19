import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { NestedEnumMeasureUnitWithAggregatesFilterObjectSchema as NestedEnumMeasureUnitWithAggregatesFilterObjectSchema } from './NestedEnumMeasureUnitWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMeasureUnitFilterObjectSchema as NestedEnumMeasureUnitFilterObjectSchema } from './NestedEnumMeasureUnitFilter.schema';

const makeSchema = () =>
  z
    .object({
      equals: MeasureUnitSchema.optional(),
      in: MeasureUnitSchema.array().optional(),
      notIn: MeasureUnitSchema.array().optional(),
      not: z
        .union([
          MeasureUnitSchema,
          z.lazy(() => NestedEnumMeasureUnitWithAggregatesFilterObjectSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumMeasureUnitFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumMeasureUnitFilterObjectSchema).optional(),
    })
    .strict();
export const EnumMeasureUnitWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumMeasureUnitWithAggregatesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumMeasureUnitWithAggregatesFilter>;
export const EnumMeasureUnitWithAggregatesFilterObjectZodSchema = makeSchema();
