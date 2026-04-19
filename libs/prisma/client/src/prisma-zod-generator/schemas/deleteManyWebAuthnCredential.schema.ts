import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialWhereInputObjectSchema as WebAuthnCredentialWhereInputObjectSchema } from './objects/WebAuthnCredentialWhereInput.schema';

export const WebAuthnCredentialDeleteManySchema: z.ZodType<Prisma.WebAuthnCredentialDeleteManyArgs> =
  z
    .object({ where: WebAuthnCredentialWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialDeleteManyArgs>;

export const WebAuthnCredentialDeleteManyZodSchema = z
  .object({ where: WebAuthnCredentialWhereInputObjectSchema.optional() })
  .strict();
