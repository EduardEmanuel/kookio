import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
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
          z.lazy(() => NestedEnumMeasureUnitFilterObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const EnumMeasureUnitFilterObjectSchema: z.ZodType<Prisma.EnumMeasureUnitFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumMeasureUnitFilter>;
export const EnumMeasureUnitFilterObjectZodSchema = makeSchema();
