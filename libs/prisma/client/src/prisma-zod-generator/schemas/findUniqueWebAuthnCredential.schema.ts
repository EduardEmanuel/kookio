import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialSelectObjectSchema as WebAuthnCredentialSelectObjectSchema } from './objects/WebAuthnCredentialSelect.schema';
import { WebAuthnCredentialIncludeObjectSchema as WebAuthnCredentialIncludeObjectSchema } from './objects/WebAuthnCredentialInclude.schema';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './objects/WebAuthnCredentialWhereUniqueInput.schema';

export const WebAuthnCredentialFindUniqueSchema: z.ZodType<Prisma.WebAuthnCredentialFindUniqueArgs> =
  z
    .object({
      select: WebAuthnCredentialSelectObjectSchema.optional(),
      include: WebAuthnCredentialIncludeObjectSchema.optional(),
      where: WebAuthnCredentialWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialFindUniqueArgs>;

export const WebAuthnCredentialFindUniqueZodSchema = z
  .object({
    select: WebAuthnCredentialSelectObjectSchema.optional(),
    include: WebAuthnCredentialIncludeObjectSchema.optional(),
    where: WebAuthnCredentialWhereUniqueInputObjectSchema,
  })
  .strict();
