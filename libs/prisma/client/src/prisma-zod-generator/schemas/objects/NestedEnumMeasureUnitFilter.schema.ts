import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';

const nestedenummeasureunitfilterSchema = z
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
export const NestedEnumMeasureUnitFilterObjectSchema: z.ZodType<Prisma.NestedEnumMeasureUnitFilter> =
  nestedenummeasureunitfilterSchema as unknown as z.ZodType<Prisma.NestedEnumMeasureUnitFilter>;
export const NestedEnumMeasureUnitFilterObjectZodSchema =
  nestedenummeasureunitfilterSchema;
