import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilCreateWithoutUtensilInputObjectSchema as UserUtensilCreateWithoutUtensilInputObjectSchema } from './UserUtensilCreateWithoutUtensilInput.schema';
import { UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema as UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema } from './UserUtensilUncheckedCreateWithoutUtensilInput.schema';
import { UserUtensilCreateOrConnectWithoutUtensilInputObjectSchema as UserUtensilCreateOrConnectWithoutUtensilInputObjectSchema } from './UserUtensilCreateOrConnectWithoutUtensilInput.schema';
import { UserUtensilCreateManyUtensilInputEnvelopeObjectSchema as UserUtensilCreateManyUtensilInputEnvelopeObjectSchema } from './UserUtensilCreateManyUtensilInputEnvelope.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';

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
      createMany: z
        .lazy(() => UserUtensilCreateManyUtensilInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
          z.lazy(() => UserUtensilWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const UserUtensilCreateNestedManyWithoutUtensilInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateNestedManyWithoutUtensilInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateNestedManyWithoutUtensilInput>;
export const UserUtensilCreateNestedManyWithoutUtensilInputObjectZodSchema =
  makeSchema();
