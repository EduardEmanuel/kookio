import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      adultsCount: z.literal(true).optional(),
      childrenCount: z.literal(true).optional(),
      onboardingDone: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const UserProfileCountAggregateInputObjectSchema: z.ZodType<Prisma.UserProfileCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCountAggregateInputType>;
export const UserProfileCountAggregateInputObjectZodSchema = makeSchema();
