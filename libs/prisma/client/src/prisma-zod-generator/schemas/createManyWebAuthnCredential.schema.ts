import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialCreateManyInputObjectSchema as WebAuthnCredentialCreateManyInputObjectSchema } from './objects/WebAuthnCredentialCreateManyInput.schema';

export const WebAuthnCredentialCreateManySchema: z.ZodType<Prisma.WebAuthnCredentialCreateManyArgs> =
  z
    .object({
      data: z.union([
        WebAuthnCredentialCreateManyInputObjectSchema,
        z.array(WebAuthnCredentialCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialCreateManyArgs>;

export const WebAuthnCredentialCreateManyZodSchema = z
  .object({
    data: z.union([
      WebAuthnCredentialCreateManyInputObjectSchema,
      z.array(WebAuthnCredentialCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
