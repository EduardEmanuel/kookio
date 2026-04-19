import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      credentialId: SortOrderSchema.optional(),
      publicKey: SortOrderSchema.optional(),
      counter: SortOrderSchema.optional(),
      aaguid: SortOrderSchema.optional(),
      attestationFmt: SortOrderSchema.optional(),
      backupEligible: SortOrderSchema.optional(),
      backupState: SortOrderSchema.optional(),
      deviceType: SortOrderSchema.optional(),
      lastUsedAt: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const WebAuthnCredentialMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialMinOrderByAggregateInput>;
export const WebAuthnCredentialMinOrderByAggregateInputObjectZodSchema =
  makeSchema();
