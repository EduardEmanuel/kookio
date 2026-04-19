import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilCreateWithoutUserInputObjectSchema as UserUtensilCreateWithoutUserInputObjectSchema } from './UserUtensilCreateWithoutUserInput.schema';
import { UserUtensilUncheckedCreateWithoutUserInputObjectSchema as UserUtensilUncheckedCreateWithoutUserInputObjectSchema } from './UserUtensilUncheckedCreateWithoutUserInput.schema';
import { UserUtensilCreateOrConnectWithoutUserInputObjectSchema as UserUtensilCreateOrConnectWithoutUserInputObjectSchema } from './UserUtensilCreateOrConnectWithoutUserInput.schema';
import { UserUtensilCreateManyUserInputEnvelopeObjectSchema as UserUtensilCreateManyUserInputEnvelopeObjectSchema } from './UserUtensilCreateManyUserInputEnvelope.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';

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
      createMany: z
        .lazy(() => UserUtensilCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserUtensilCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateNestedManyWithoutUserInput>;
export const UserUtensilCreateNestedManyWithoutUserInputObjectZodSchema =
  makeSchema();
