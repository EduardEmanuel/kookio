import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialSelectObjectSchema as WebAuthnCredentialSelectObjectSchema } from './objects/WebAuthnCredentialSelect.schema';
import { WebAuthnCredentialIncludeObjectSchema as WebAuthnCredentialIncludeObjectSchema } from './objects/WebAuthnCredentialInclude.schema';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './objects/WebAuthnCredentialWhereUniqueInput.schema';

export const WebAuthnCredentialFindUniqueOrThrowSchema: z.ZodType<Prisma.WebAuthnCredentialFindUniqueOrThrowArgs> =
  z
    .object({
      select: WebAuthnCredentialSelectObjectSchema.optional(),
      include: WebAuthnCredentialIncludeObjectSchema.optional(),
      where: WebAuthnCredentialWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialFindUniqueOrThrowArgs>;

export const WebAuthnCredentialFindUniqueOrThrowZodSchema = z
  .object({
    select: WebAuthnCredentialSelectObjectSchema.optional(),
    include: WebAuthnCredentialIncludeObjectSchema.optional(),
    where: WebAuthnCredentialWhereUniqueInputObjectSchema,
  })
  .strict();
