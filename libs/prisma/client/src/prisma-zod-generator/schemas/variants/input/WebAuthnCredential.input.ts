import * as z from 'zod';

// prettier-ignore
export const WebAuthnCredentialInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    credentialId: z.instanceof(Uint8Array),
    publicKey: z.instanceof(Uint8Array),
    counter: z.number().int(),
    transports: z.array(z.string()),
    aaguid: z.string().optional().nullable(),
    attestationFmt: z.string().optional().nullable(),
    backupEligible: z.boolean(),
    backupState: z.boolean(),
    deviceType: z.string().optional().nullable(),
    lastUsedAt: z.date().optional().nullable(),
    meta: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown()
}).strict();

export type WebAuthnCredentialInputType = z.infer<
  typeof WebAuthnCredentialInputSchema
>;
