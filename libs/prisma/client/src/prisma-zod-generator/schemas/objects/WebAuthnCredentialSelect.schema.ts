import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      credentialId: z.boolean().optional(),
      publicKey: z.boolean().optional(),
      counter: z.boolean().optional(),
      transports: z.boolean().optional(),
      aaguid: z.boolean().optional(),
      attestationFmt: z.boolean().optional(),
      backupEligible: z.boolean().optional(),
      backupState: z.boolean().optional(),
      deviceType: z.boolean().optional(),
      lastUsedAt: z.boolean().optional(),
      meta: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const WebAuthnCredentialSelectObjectSchema: z.ZodType<Prisma.WebAuthnCredentialSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialSelect>;
export const WebAuthnCredentialSelectObjectZodSchema = makeSchema();
