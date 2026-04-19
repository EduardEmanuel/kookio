import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialWhereInputObjectSchema as WebAuthnCredentialWhereInputObjectSchema } from './WebAuthnCredentialWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => WebAuthnCredentialWhereInputObjectSchema).optional(),
      some: z.lazy(() => WebAuthnCredentialWhereInputObjectSchema).optional(),
      none: z.lazy(() => WebAuthnCredentialWhereInputObjectSchema).optional(),
    })
    .strict();
export const WebAuthnCredentialListRelationFilterObjectSchema: z.ZodType<Prisma.WebAuthnCredentialListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialListRelationFilter>;
export const WebAuthnCredentialListRelationFilterObjectZodSchema = makeSchema();
