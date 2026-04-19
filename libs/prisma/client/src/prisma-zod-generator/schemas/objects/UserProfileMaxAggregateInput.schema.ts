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
    })
    .strict();
export const UserProfileMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserProfileMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileMaxAggregateInputType>;
export const UserProfileMaxAggregateInputObjectZodSchema = makeSchema();
