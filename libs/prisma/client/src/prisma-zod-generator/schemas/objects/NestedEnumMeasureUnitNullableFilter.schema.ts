import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';

const nestedenummeasureunitnullablefilterSchema = z
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
export const NestedEnumMeasureUnitNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumMeasureUnitNullableFilter> =
  nestedenummeasureunitnullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumMeasureUnitNullableFilter>;
export const NestedEnumMeasureUnitNullableFilterObjectZodSchema =
  nestedenummeasureunitnullablefilterSchema;
