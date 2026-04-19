import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.literal(true).optional(),
      utensilId: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const UserUtensilCountAggregateInputObjectSchema: z.ZodType<Prisma.UserUtensilCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCountAggregateInputType>;
export const UserUtensilCountAggregateInputObjectZodSchema = makeSchema();
