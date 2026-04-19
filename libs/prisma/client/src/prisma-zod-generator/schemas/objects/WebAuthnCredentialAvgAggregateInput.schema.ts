import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      counter: z.literal(true).optional(),
    })
    .strict();
export const WebAuthnCredentialAvgAggregateInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialAvgAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialAvgAggregateInputType>;
export const WebAuthnCredentialAvgAggregateInputObjectZodSchema = makeSchema();
