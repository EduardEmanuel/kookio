import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilCreateWithoutUserInputObjectSchema as UserUtensilCreateWithoutUserInputObjectSchema } from './UserUtensilCreateWithoutUserInput.schema';
import { UserUtensilUncheckedCreateWithoutUserInputObjectSchema as UserUtensilUncheckedCreateWithoutUserInputObjectSchema } from './UserUtensilUncheckedCreateWithoutUserInput.schema';
import { UserUtensilCreateOrConnectWithoutUserInputObjectSchema as UserUtensilCreateOrConnectWithoutUserInputObjectSchema } from './UserUtensilCreateOrConnectWithoutUserInput.schema';
import { UserUtensilUpsertWithWhereUniqueWithoutUserInputObjectSchema as UserUtensilUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './UserUtensilUpsertWithWhereUniqueWithoutUserInput.schema';
import { UserUtensilCreateManyUserInputEnvelopeObjectSchema as UserUtensilCreateManyUserInputEnvelopeObjectSchema } from './UserUtensilCreateManyUserInputEnvelope.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';
import { UserUtensilUpdateWithWhereUniqueWithoutUserInputObjectSchema as UserUtensilUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './UserUtensilUpdateWithWhereUniqueWithoutUserInput.schema';
import { UserUtensilUpdateManyWithWhereWithoutUserInputObjectSchema as UserUtensilUpdateManyWithWhereWithoutUserInputObjectSchema } from './UserUtensilUpdateManyWithWhereWithoutUserInput.schema';
import { UserUtensilScalarWhereInputObjectSchema as UserUtensilScalarWhereInputObjectSchema } from './UserUtensilScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserUtensilCreateWithoutUserInputObjectSchema),
          z.lazy(() => UserUtensilCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => UserUtensilUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => UserUtensilUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserUtensilCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => UserUtensilCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => UserUtensilUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserUtensilUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserUtensilCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => UserUtensilUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserUtensilUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => UserUtensilUpdateManyWithWhereWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUtensilUpdateManyWithWhereWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserUtensilScalarWhereInputObjectSchema),
          z.lazy(() => UserUtensilScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserUtensilUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.UserUtensilUncheckedUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUncheckedUpdateManyWithoutUserNestedInput>;
export const UserUtensilUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema =
  makeSchema();
