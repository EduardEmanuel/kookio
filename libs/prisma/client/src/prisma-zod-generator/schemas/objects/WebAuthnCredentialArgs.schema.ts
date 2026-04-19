import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialSelectObjectSchema as WebAuthnCredentialSelectObjectSchema } from './WebAuthnCredentialSelect.schema';
import { WebAuthnCredentialIncludeObjectSchema as WebAuthnCredentialIncludeObjectSchema } from './WebAuthnCredentialInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => WebAuthnCredentialSelectObjectSchema).optional(),
      include: z.lazy(() => WebAuthnCredentialIncludeObjectSchema).optional(),
    })
    .strict();
export const WebAuthnCredentialArgsObjectSchema = makeSchema();
export const WebAuthnCredentialArgsObjectZodSchema = makeSchema();
