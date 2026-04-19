import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialCreateWithoutUserInputObjectSchema as WebAuthnCredentialCreateWithoutUserInputObjectSchema } from './WebAuthnCredentialCreateWithoutUserInput.schema';
import { WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema as WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema } from './WebAuthnCredentialUncheckedCreateWithoutUserInput.schema';
import { WebAuthnCredentialCreateOrConnectWithoutUserInputObjectSchema as WebAuthnCredentialCreateOrConnectWithoutUserInputObjectSchema } from './WebAuthnCredentialCreateOrConnectWithoutUserInput.schema';
import { WebAuthnCredentialCreateManyUserInputEnvelopeObjectSchema as WebAuthnCredentialCreateManyUserInputEnvelopeObjectSchema } from './WebAuthnCredentialCreateManyUserInputEnvelope.schema';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './WebAuthnCredentialWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => WebAuthnCredentialCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => WebAuthnCredentialCreateWithoutUserInputObjectSchema)
            .array(),
          z.lazy(
            () => WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => WebAuthnCredentialCreateOrConnectWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                WebAuthnCredentialCreateOrConnectWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => WebAuthnCredentialCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema),
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInput>;
export const WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
  makeSchema();
