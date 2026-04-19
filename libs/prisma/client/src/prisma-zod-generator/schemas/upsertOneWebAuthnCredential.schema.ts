import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialSelectObjectSchema as WebAuthnCredentialSelectObjectSchema } from './objects/WebAuthnCredentialSelect.schema';
import { WebAuthnCredentialIncludeObjectSchema as WebAuthnCredentialIncludeObjectSchema } from './objects/WebAuthnCredentialInclude.schema';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './objects/WebAuthnCredentialWhereUniqueInput.schema';
import { WebAuthnCredentialCreateInputObjectSchema as WebAuthnCredentialCreateInputObjectSchema } from './objects/WebAuthnCredentialCreateInput.schema';
import { WebAuthnCredentialUncheckedCreateInputObjectSchema as WebAuthnCredentialUncheckedCreateInputObjectSchema } from './objects/WebAuthnCredentialUncheckedCreateInput.schema';
import { WebAuthnCredentialUpdateInputObjectSchema as WebAuthnCredentialUpdateInputObjectSchema } from './objects/WebAuthnCredentialUpdateInput.schema';
import { WebAuthnCredentialUncheckedUpdateInputObjectSchema as WebAuthnCredentialUncheckedUpdateInputObjectSchema } from './objects/WebAuthnCredentialUncheckedUpdateInput.schema';

export const WebAuthnCredentialUpsertOneSchema: z.ZodType<Prisma.WebAuthnCredentialUpsertArgs> =
  z
    .object({
      select: WebAuthnCredentialSelectObjectSchema.optional(),
      include: WebAuthnCredentialIncludeObjectSchema.optional(),
      where: WebAuthnCredentialWhereUniqueInputObjectSchema,
      create: z.union([
        WebAuthnCredentialCreateInputObjectSchema,
        WebAuthnCredentialUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        WebAuthnCredentialUpdateInputObjectSchema,
        WebAuthnCredentialUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialUpsertArgs>;

export const WebAuthnCredentialUpsertOneZodSchema = z
  .object({
    select: WebAuthnCredentialSelectObjectSchema.optional(),
    include: WebAuthnCredentialIncludeObjectSchema.optional(),
    where: WebAuthnCredentialWhereUniqueInputObjectSchema,
    create: z.union([
      WebAuthnCredentialCreateInputObjectSchema,
      WebAuthnCredentialUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      WebAuthnCredentialUpdateInputObjectSchema,
      WebAuthnCredentialUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
