import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      counter: SortOrderSchema.optional(),
    })
    .strict();
export const WebAuthnCredentialAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialAvgOrderByAggregateInput>;
export const WebAuthnCredentialAvgOrderByAggregateInputObjectZodSchema =
  makeSchema();
