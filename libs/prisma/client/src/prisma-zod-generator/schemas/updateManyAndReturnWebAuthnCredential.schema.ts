import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialSelectObjectSchema as WebAuthnCredentialSelectObjectSchema } from './objects/WebAuthnCredentialSelect.schema';
import { WebAuthnCredentialUpdateManyMutationInputObjectSchema as WebAuthnCredentialUpdateManyMutationInputObjectSchema } from './objects/WebAuthnCredentialUpdateManyMutationInput.schema';
import { WebAuthnCredentialWhereInputObjectSchema as WebAuthnCredentialWhereInputObjectSchema } from './objects/WebAuthnCredentialWhereInput.schema';

export const WebAuthnCredentialUpdateManyAndReturnSchema: z.ZodType<Prisma.WebAuthnCredentialUpdateManyAndReturnArgs> =
  z
    .object({
      select: WebAuthnCredentialSelectObjectSchema.optional(),
      data: WebAuthnCredentialUpdateManyMutationInputObjectSchema,
      where: WebAuthnCredentialWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialUpdateManyAndReturnArgs>;

export const WebAuthnCredentialUpdateManyAndReturnZodSchema = z
  .object({
    select: WebAuthnCredentialSelectObjectSchema.optional(),
    data: WebAuthnCredentialUpdateManyMutationInputObjectSchema,
    where: WebAuthnCredentialWhereInputObjectSchema.optional(),
  })
  .strict();
