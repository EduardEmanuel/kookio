import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { WebAuthnCredentialCountOrderByAggregateInputObjectSchema as WebAuthnCredentialCountOrderByAggregateInputObjectSchema } from './WebAuthnCredentialCountOrderByAggregateInput.schema';
import { WebAuthnCredentialAvgOrderByAggregateInputObjectSchema as WebAuthnCredentialAvgOrderByAggregateInputObjectSchema } from './WebAuthnCredentialAvgOrderByAggregateInput.schema';
import { WebAuthnCredentialMaxOrderByAggregateInputObjectSchema as WebAuthnCredentialMaxOrderByAggregateInputObjectSchema } from './WebAuthnCredentialMaxOrderByAggregateInput.schema';
import { WebAuthnCredentialMinOrderByAggregateInputObjectSchema as WebAuthnCredentialMinOrderByAggregateInputObjectSchema } from './WebAuthnCredentialMinOrderByAggregateInput.schema';
import { WebAuthnCredentialSumOrderByAggregateInputObjectSchema as WebAuthnCredentialSumOrderByAggregateInputObjectSchema } from './WebAuthnCredentialSumOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      credentialId: SortOrderSchema.optional(),
      publicKey: SortOrderSchema.optional(),
      counter: SortOrderSchema.optional(),
      transports: SortOrderSchema.optional(),
      aaguid: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      attestationFmt: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      backupEligible: SortOrderSchema.optional(),
      backupState: SortOrderSchema.optional(),
      deviceType: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      lastUsedAt: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      meta: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => WebAuthnCredentialCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => WebAuthnCredentialAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => WebAuthnCredentialMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => WebAuthnCredentialMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => WebAuthnCredentialSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const WebAuthnCredentialOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialOrderByWithAggregationInput>;
export const WebAuthnCredentialOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
