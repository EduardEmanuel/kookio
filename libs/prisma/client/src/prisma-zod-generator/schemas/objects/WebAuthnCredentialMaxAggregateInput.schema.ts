import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      credentialId: z.literal(true).optional(),
      publicKey: z.literal(true).optional(),
      counter: z.literal(true).optional(),
      aaguid: z.literal(true).optional(),
      attestationFmt: z.literal(true).optional(),
      backupEligible: z.literal(true).optional(),
      backupState: z.literal(true).optional(),
      deviceType: z.literal(true).optional(),
      lastUsedAt: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const WebAuthnCredentialMaxAggregateInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialMaxAggregateInputType>;
export const WebAuthnCredentialMaxAggregateInputObjectZodSchema = makeSchema();
