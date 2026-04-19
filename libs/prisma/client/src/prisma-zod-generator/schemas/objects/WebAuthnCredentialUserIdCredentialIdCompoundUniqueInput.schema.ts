import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
      credentialId: z.instanceof(Uint8Array),
    })
    .strict();
export const WebAuthnCredentialUserIdCredentialIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialUserIdCredentialIdCompoundUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialUserIdCredentialIdCompoundUniqueInput>;
export const WebAuthnCredentialUserIdCredentialIdCompoundUniqueInputObjectZodSchema =
  makeSchema();
