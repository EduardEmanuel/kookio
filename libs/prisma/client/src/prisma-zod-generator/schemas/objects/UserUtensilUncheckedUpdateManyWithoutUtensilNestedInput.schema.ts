import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilCreateWithoutUtensilInputObjectSchema as UserUtensilCreateWithoutUtensilInputObjectSchema } from './UserUtensilCreateWithoutUtensilInput.schema';
import { UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema as UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema } from './UserUtensilUncheckedCreateWithoutUtensilInput.schema';
import { UserUtensilCreateOrConnectWithoutUtensilInputObjectSchema as UserUtensilCreateOrConnectWithoutUtensilInputObjectSchema } from './UserUtensilCreateOrConnectWithoutUtensilInput.schema';
import { UserUtensilUpsertWithWhereUniqueWithoutUtensilInputObjectSchema as UserUtensilUpsertWithWhereUniqueWithoutUtensilInputObjectSchema } from './UserUtensilUpsertWithWhereUniqueWithoutUtensilInput.schema';
import { UserUtensilCreateManyUtensilInputEnvelopeObjectSchema as UserUtensilCreateManyUtensilInputEnvelopeObjectSchema } from './UserUtensilCreateManyUtensilInputEnvelope.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';
import { UserUtensilUpdateWithWhereUniqueWithoutUtensilInputObjectSchema as UserUtensilUpdateWithWhereUniqueWithoutUtensilInputObjectSchema } from './UserUtensilUpdateWithWhereUniqueWithoutUtensilInput.schema';
import { UserUtensilUpdateManyWithWhereWithoutUtensilInputObjectSchema as UserUtensilUpdateManyWithWhereWithoutUtensilInputObjectSchema } from './UserUtensilUpdateManyWithWhereWithoutUtensilInput.schema';
import { UserUtensilScalarWhereInputObjectSchema as UserUtensilScalarWhereInputObjectSchema } from './UserUtensilScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserUtensilCreateWithoutUtensilInputObjectSchema),
          z
            .lazy(() => UserUtensilCreateWithoutUtensilInputObjectSchema)
            .array(),
          z.lazy(
            () => UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => UserUtensilCreateOrConnectWithoutUtensilInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUtensilCreateOrConnectWithoutUtensilInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              UserUtensilUpsertWithWhereUniqueWithoutUtensilInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserUtensilUpsertWithWhereUniqueWithoutUtensilInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserUtensilCreateManyUtensilInputEnvelopeObjectSchema)
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
            () =>
              UserUtensilUpdateWithWhereUniqueWithoutUtensilInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserUtensilUpdateWithWhereUniqueWithoutUtensilInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => UserUtensilUpdateManyWithWhereWithoutUtensilInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserUtensilUpdateManyWithWhereWithoutUtensilInputObjectSchema,
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
export const UserUtensilUncheckedUpdateManyWithoutUtensilNestedInputObjectSchema: z.ZodType<Prisma.UserUtensilUncheckedUpdateManyWithoutUtensilNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUncheckedUpdateManyWithoutUtensilNestedInput>;
export const UserUtensilUncheckedUpdateManyWithoutUtensilNestedInputObjectZodSchema =
  makeSchema();
