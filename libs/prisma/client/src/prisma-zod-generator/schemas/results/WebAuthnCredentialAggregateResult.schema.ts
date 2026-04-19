import * as z from 'zod';
export const WebAuthnCredentialAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      userId: z.number(),
      credentialId: z.number(),
      publicKey: z.number(),
      counter: z.number(),
      transports: z.number(),
      aaguid: z.number(),
      attestationFmt: z.number(),
      backupEligible: z.number(),
      backupState: z.number(),
      deviceType: z.number(),
      lastUsedAt: z.number(),
      meta: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      user: z.number(),
    })
    .optional(),
  _sum: z
    .object({
      counter: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _avg: z
    .object({
      counter: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      counter: z.number().int().nullable(),
      transports: z.array(z.string()).nullable(),
      aaguid: z.string().nullable(),
      attestationFmt: z.string().nullable(),
      deviceType: z.string().nullable(),
      lastUsedAt: z.date().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      counter: z.number().int().nullable(),
      transports: z.array(z.string()).nullable(),
      aaguid: z.string().nullable(),
      attestationFmt: z.string().nullable(),
      deviceType: z.string().nullable(),
      lastUsedAt: z.date().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
