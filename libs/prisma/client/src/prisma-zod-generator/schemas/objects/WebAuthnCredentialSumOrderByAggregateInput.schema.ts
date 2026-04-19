import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      counter: SortOrderSchema.optional(),
    })
    .strict();
export const WebAuthnCredentialSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialSumOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialSumOrderByAggregateInput>;
export const WebAuthnCredentialSumOrderByAggregateInputObjectZodSchema =
  makeSchema();
