import * as z from 'zod';

// prettier-ignore
export const WebAuthnCredentialModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    credentialId: z.instanceof(Uint8Array),
    publicKey: z.instanceof(Uint8Array),
    counter: z.number().int(),
    transports: z.array(z.string()),
    aaguid: z.string().nullable(),
    attestationFmt: z.string().nullable(),
    backupEligible: z.boolean(),
    backupState: z.boolean(),
    deviceType: z.string().nullable(),
    lastUsedAt: z.date().nullable(),
    meta: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown()
}).strict();

export type WebAuthnCredentialPureType = z.infer<
  typeof WebAuthnCredentialModelSchema
>;
