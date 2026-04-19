import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialCreatetransportsInputObjectSchema as WebAuthnCredentialCreatetransportsInputObjectSchema } from './WebAuthnCredentialCreatetransportsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutCredentialsInputObjectSchema as UserCreateNestedOneWithoutCredentialsInputObjectSchema } from './UserCreateNestedOneWithoutCredentialsInput.schema';

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      credentialId: z.instanceof(Uint8Array),
      publicKey: z.instanceof(Uint8Array),
      counter: z.number().int().optional(),
      transports: z
        .union([
          z.lazy(() => WebAuthnCredentialCreatetransportsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      aaguid: z.string().optional().nullable(),
      attestationFmt: z.string().optional().nullable(),
      backupEligible: z.boolean().optional(),
      backupState: z.boolean().optional(),
      deviceType: z.string().optional().nullable(),
      lastUsedAt: z.coerce.date().optional().nullable(),
      meta: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
      createdAt: z.coerce.date().optional(),
      user: z.lazy(
        () => UserCreateNestedOneWithoutCredentialsInputObjectSchema,
      ),
    })
    .strict();
export const WebAuthnCredentialCreateInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialCreateInput>;
export const WebAuthnCredentialCreateInputObjectZodSchema = makeSchema();
