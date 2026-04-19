import * as z from 'zod';
export const WebAuthnCredentialFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    credentialId: z.instanceof(Uint8Array),
    publicKey: z.instanceof(Uint8Array),
    counter: z.number().int(),
    transports: z.array(z.string()),
    aaguid: z.string().optional(),
    attestationFmt: z.string().optional(),
    backupEligible: z.boolean(),
    backupState: z.boolean(),
    deviceType: z.string().optional(),
    lastUsedAt: z.date().optional(),
    meta: z.unknown().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
  }),
);
