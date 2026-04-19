import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      set: z.string().array(),
    })
    .strict();
export const WebAuthnCredentialCreatetransportsInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialCreatetransportsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialCreatetransportsInput>;
export const WebAuthnCredentialCreatetransportsInputObjectZodSchema =
  makeSchema();
