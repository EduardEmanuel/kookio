import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedBytesFilterObjectSchema as NestedBytesFilterObjectSchema } from './NestedBytesFilter.schema';

const nestedbyteswithaggregatesfilterSchema = z
  .object({
    equals: z.instanceof(Uint8Array).optional(),
    in: z.instanceof(Uint8Array).array().optional(),
    notIn: z.instanceof(Uint8Array).array().optional(),
    not: z
      .union([
        z.instanceof(Uint8Array),
        z.lazy(() => NestedBytesWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedBytesFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedBytesFilterObjectSchema).optional(),
  })
  .strict();
export const NestedBytesWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedBytesWithAggregatesFilter> =
  nestedbyteswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedBytesWithAggregatesFilter>;
export const NestedBytesWithAggregatesFilterObjectZodSchema =
  nestedbyteswithaggregatesfilterSchema;
