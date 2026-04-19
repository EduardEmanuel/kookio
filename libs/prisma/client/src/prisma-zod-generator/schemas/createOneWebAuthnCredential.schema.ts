import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialSelectObjectSchema as WebAuthnCredentialSelectObjectSchema } from './objects/WebAuthnCredentialSelect.schema';
import { WebAuthnCredentialIncludeObjectSchema as WebAuthnCredentialIncludeObjectSchema } from './objects/WebAuthnCredentialInclude.schema';
import { WebAuthnCredentialCreateInputObjectSchema as WebAuthnCredentialCreateInputObjectSchema } from './objects/WebAuthnCredentialCreateInput.schema';
import { WebAuthnCredentialUncheckedCreateInputObjectSchema as WebAuthnCredentialUncheckedCreateInputObjectSchema } from './objects/WebAuthnCredentialUncheckedCreateInput.schema';

export const WebAuthnCredentialCreateOneSchema: z.ZodType<Prisma.WebAuthnCredentialCreateArgs> =
  z
    .object({
      select: WebAuthnCredentialSelectObjectSchema.optional(),
      include: WebAuthnCredentialIncludeObjectSchema.optional(),
      data: z.union([
        WebAuthnCredentialCreateInputObjectSchema,
        WebAuthnCredentialUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialCreateArgs>;

export const WebAuthnCredentialCreateOneZodSchema = z
  .object({
    select: WebAuthnCredentialSelectObjectSchema.optional(),
    include: WebAuthnCredentialIncludeObjectSchema.optional(),
    data: z.union([
      WebAuthnCredentialCreateInputObjectSchema,
      WebAuthnCredentialUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
