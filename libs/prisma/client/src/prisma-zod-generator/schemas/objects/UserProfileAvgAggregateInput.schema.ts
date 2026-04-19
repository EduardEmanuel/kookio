import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      adultsCount: z.literal(true).optional(),
      childrenCount: z.literal(true).optional(),
    })
    .strict();
export const UserProfileAvgAggregateInputObjectSchema: z.ZodType<Prisma.UserProfileAvgAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileAvgAggregateInputType>;
export const UserProfileAvgAggregateInputObjectZodSchema = makeSchema();
