import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialCreateManyUserInputObjectSchema as WebAuthnCredentialCreateManyUserInputObjectSchema } from './WebAuthnCredentialCreateManyUserInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => WebAuthnCredentialCreateManyUserInputObjectSchema),
        z.lazy(() => WebAuthnCredentialCreateManyUserInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const WebAuthnCredentialCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.WebAuthnCredentialCreateManyUserInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialCreateManyUserInputEnvelope>;
export const WebAuthnCredentialCreateManyUserInputEnvelopeObjectZodSchema =
  makeSchema();
