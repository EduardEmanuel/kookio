import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialSelectObjectSchema as WebAuthnCredentialSelectObjectSchema } from './objects/WebAuthnCredentialSelect.schema';
import { WebAuthnCredentialCreateManyInputObjectSchema as WebAuthnCredentialCreateManyInputObjectSchema } from './objects/WebAuthnCredentialCreateManyInput.schema';

export const WebAuthnCredentialCreateManyAndReturnSchema: z.ZodType<Prisma.WebAuthnCredentialCreateManyAndReturnArgs> =
  z
    .object({
      select: WebAuthnCredentialSelectObjectSchema.optional(),
      data: z.union([
        WebAuthnCredentialCreateManyInputObjectSchema,
        z.array(WebAuthnCredentialCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialCreateManyAndReturnArgs>;

export const WebAuthnCredentialCreateManyAndReturnZodSchema = z
  .object({
    select: WebAuthnCredentialSelectObjectSchema.optional(),
    data: z.union([
      WebAuthnCredentialCreateManyInputObjectSchema,
      z.array(WebAuthnCredentialCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
