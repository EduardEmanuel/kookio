import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const nestedbytesfilterSchema = z
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
export const NestedBytesFilterObjectSchema: z.ZodType<Prisma.NestedBytesFilter> =
  nestedbytesfilterSchema as unknown as z.ZodType<Prisma.NestedBytesFilter>;
export const NestedBytesFilterObjectZodSchema = nestedbytesfilterSchema;
