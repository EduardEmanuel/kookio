import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedBytesFilterObjectSchema as NestedBytesFilterObjectSchema } from './NestedBytesFilter.schema';

const makeSchema = () =>
  z
    .object({
      equals: z.instanceof(Uint8Array).optional(),
      in: z.instanceof(Uint8Array).array().optional(),
      notIn: z.instanceof(Uint8Array).array().optional(),
      not: z
        .union([
          z.instanceof(Uint8Array),
          z.lazy(() => NestedBytesFilterObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const BytesFilterObjectSchema: z.ZodType<Prisma.BytesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.BytesFilter>;
export const BytesFilterObjectZodSchema = makeSchema();
