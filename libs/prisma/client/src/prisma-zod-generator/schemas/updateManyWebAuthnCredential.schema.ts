import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialUpdateManyMutationInputObjectSchema as WebAuthnCredentialUpdateManyMutationInputObjectSchema } from './objects/WebAuthnCredentialUpdateManyMutationInput.schema';
import { WebAuthnCredentialWhereInputObjectSchema as WebAuthnCredentialWhereInputObjectSchema } from './objects/WebAuthnCredentialWhereInput.schema';

export const WebAuthnCredentialUpdateManySchema: z.ZodType<Prisma.WebAuthnCredentialUpdateManyArgs> =
  z
    .object({
      data: WebAuthnCredentialUpdateManyMutationInputObjectSchema,
      where: WebAuthnCredentialWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialUpdateManyArgs>;

export const WebAuthnCredentialUpdateManyZodSchema = z
  .object({
    data: WebAuthnCredentialUpdateManyMutationInputObjectSchema,
    where: WebAuthnCredentialWhereInputObjectSchema.optional(),
  })
  .strict();
