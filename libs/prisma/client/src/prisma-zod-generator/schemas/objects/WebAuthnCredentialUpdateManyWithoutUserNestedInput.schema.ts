import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialCreateWithoutUserInputObjectSchema as WebAuthnCredentialCreateWithoutUserInputObjectSchema } from './WebAuthnCredentialCreateWithoutUserInput.schema';
import { WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema as WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema } from './WebAuthnCredentialUncheckedCreateWithoutUserInput.schema';
import { WebAuthnCredentialCreateOrConnectWithoutUserInputObjectSchema as WebAuthnCredentialCreateOrConnectWithoutUserInputObjectSchema } from './WebAuthnCredentialCreateOrConnectWithoutUserInput.schema';
import { WebAuthnCredentialUpsertWithWhereUniqueWithoutUserInputObjectSchema as WebAuthnCredentialUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './WebAuthnCredentialUpsertWithWhereUniqueWithoutUserInput.schema';
import { WebAuthnCredentialCreateManyUserInputEnvelopeObjectSchema as WebAuthnCredentialCreateManyUserInputEnvelopeObjectSchema } from './WebAuthnCredentialCreateManyUserInputEnvelope.schema';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './WebAuthnCredentialWhereUniqueInput.schema';
import { WebAuthnCredentialUpdateWithWhereUniqueWithoutUserInputObjectSchema as WebAuthnCredentialUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './WebAuthnCredentialUpdateWithWhereUniqueWithoutUserInput.schema';
import { WebAuthnCredentialUpdateManyWithWhereWithoutUserInputObjectSchema as WebAuthnCredentialUpdateManyWithWhereWithoutUserInputObjectSchema } from './WebAuthnCredentialUpdateManyWithWhereWithoutUserInput.schema';
import { WebAuthnCredentialScalarWhereInputObjectSchema as WebAuthnCredentialScalarWhereInputObjectSchema } from './WebAuthnCredentialScalarWhereInput.schema';

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
      upsert: z
        .union([
          z.lazy(
            () =>
              WebAuthnCredentialUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                WebAuthnCredentialUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => WebAuthnCredentialCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema),
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema),
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema),
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema),
          z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              WebAuthnCredentialUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                WebAuthnCredentialUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              WebAuthnCredentialUpdateManyWithWhereWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                WebAuthnCredentialUpdateManyWithWhereWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => WebAuthnCredentialScalarWhereInputObjectSchema),
          z.lazy(() => WebAuthnCredentialScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const WebAuthnCredentialUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialUpdateManyWithoutUserNestedInput>;
export const WebAuthnCredentialUpdateManyWithoutUserNestedInputObjectZodSchema =
  makeSchema();
