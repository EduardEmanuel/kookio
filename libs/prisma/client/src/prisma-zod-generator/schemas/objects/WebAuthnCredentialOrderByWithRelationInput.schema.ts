import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';

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
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict();
export const WebAuthnCredentialOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialOrderByWithRelationInput>;
export const WebAuthnCredentialOrderByWithRelationInputObjectZodSchema =
  makeSchema();
