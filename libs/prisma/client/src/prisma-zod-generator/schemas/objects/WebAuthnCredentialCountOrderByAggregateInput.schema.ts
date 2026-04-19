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
      transports: SortOrderSchema.optional(),
      aaguid: SortOrderSchema.optional(),
      attestationFmt: SortOrderSchema.optional(),
      backupEligible: SortOrderSchema.optional(),
      backupState: SortOrderSchema.optional(),
      deviceType: SortOrderSchema.optional(),
      lastUsedAt: SortOrderSchema.optional(),
      meta: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const WebAuthnCredentialCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialCountOrderByAggregateInput>;
export const WebAuthnCredentialCountOrderByAggregateInputObjectZodSchema =
  makeSchema();
