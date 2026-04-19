import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialSelectObjectSchema as WebAuthnCredentialSelectObjectSchema } from './objects/WebAuthnCredentialSelect.schema';
import { WebAuthnCredentialIncludeObjectSchema as WebAuthnCredentialIncludeObjectSchema } from './objects/WebAuthnCredentialInclude.schema';
import { WebAuthnCredentialUpdateInputObjectSchema as WebAuthnCredentialUpdateInputObjectSchema } from './objects/WebAuthnCredentialUpdateInput.schema';
import { WebAuthnCredentialUncheckedUpdateInputObjectSchema as WebAuthnCredentialUncheckedUpdateInputObjectSchema } from './objects/WebAuthnCredentialUncheckedUpdateInput.schema';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './objects/WebAuthnCredentialWhereUniqueInput.schema';

export const WebAuthnCredentialUpdateOneSchema: z.ZodType<Prisma.WebAuthnCredentialUpdateArgs> =
  z
    .object({
      select: WebAuthnCredentialSelectObjectSchema.optional(),
      include: WebAuthnCredentialIncludeObjectSchema.optional(),
      data: z.union([
        WebAuthnCredentialUpdateInputObjectSchema,
        WebAuthnCredentialUncheckedUpdateInputObjectSchema,
      ]),
      where: WebAuthnCredentialWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialUpdateArgs>;

export const WebAuthnCredentialUpdateOneZodSchema = z
  .object({
    select: WebAuthnCredentialSelectObjectSchema.optional(),
    include: WebAuthnCredentialIncludeObjectSchema.optional(),
    data: z.union([
      WebAuthnCredentialUpdateInputObjectSchema,
      WebAuthnCredentialUncheckedUpdateInputObjectSchema,
    ]),
    where: WebAuthnCredentialWhereUniqueInputObjectSchema,
  })
  .strict();
