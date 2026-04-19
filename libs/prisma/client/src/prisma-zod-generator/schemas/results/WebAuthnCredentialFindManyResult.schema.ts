import * as z from 'zod';
export const WebAuthnCredentialFindManyResultSchema = z.object({
  data: z.array(
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
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});
