import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMeasureUnitFilterObjectSchema as NestedEnumMeasureUnitFilterObjectSchema } from './NestedEnumMeasureUnitFilter.schema';

const nestedenummeasureunitwithaggregatesfilterSchema = z
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
export const NestedEnumMeasureUnitWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumMeasureUnitWithAggregatesFilter> =
  nestedenummeasureunitwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumMeasureUnitWithAggregatesFilter>;
export const NestedEnumMeasureUnitWithAggregatesFilterObjectZodSchema =
  nestedenummeasureunitwithaggregatesfilterSchema;
