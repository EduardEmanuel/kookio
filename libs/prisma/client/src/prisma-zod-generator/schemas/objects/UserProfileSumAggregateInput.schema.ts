import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      adultsCount: z.literal(true).optional(),
      childrenCount: z.literal(true).optional(),
    })
    .strict();
export const UserProfileSumAggregateInputObjectSchema: z.ZodType<Prisma.UserProfileSumAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileSumAggregateInputType>;
export const UserProfileSumAggregateInputObjectZodSchema = makeSchema();
