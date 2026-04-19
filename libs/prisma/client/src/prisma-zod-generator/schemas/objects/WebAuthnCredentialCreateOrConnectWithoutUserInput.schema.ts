import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './WebAuthnCredentialWhereUniqueInput.schema';
import { WebAuthnCredentialCreateWithoutUserInputObjectSchema as WebAuthnCredentialCreateWithoutUserInputObjectSchema } from './WebAuthnCredentialCreateWithoutUserInput.schema';
import { WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema as WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema } from './WebAuthnCredentialUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => WebAuthnCredentialCreateWithoutUserInputObjectSchema),
        z.lazy(
          () => WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const WebAuthnCredentialCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialCreateOrConnectWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialCreateOrConnectWithoutUserInput>;
export const WebAuthnCredentialCreateOrConnectWithoutUserInputObjectZodSchema =
  makeSchema();
