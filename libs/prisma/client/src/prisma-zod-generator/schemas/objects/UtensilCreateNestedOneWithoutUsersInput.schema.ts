import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilCreateWithoutUsersInputObjectSchema as UtensilCreateWithoutUsersInputObjectSchema } from './UtensilCreateWithoutUsersInput.schema';
import { UtensilUncheckedCreateWithoutUsersInputObjectSchema as UtensilUncheckedCreateWithoutUsersInputObjectSchema } from './UtensilUncheckedCreateWithoutUsersInput.schema';
import { UtensilCreateOrConnectWithoutUsersInputObjectSchema as UtensilCreateOrConnectWithoutUsersInputObjectSchema } from './UtensilCreateOrConnectWithoutUsersInput.schema';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './UtensilWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UtensilCreateWithoutUsersInputObjectSchema),
          z.lazy(() => UtensilUncheckedCreateWithoutUsersInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UtensilCreateOrConnectWithoutUsersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UtensilWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UtensilCreateNestedOneWithoutUsersInputObjectSchema: z.ZodType<Prisma.UtensilCreateNestedOneWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilCreateNestedOneWithoutUsersInput>;
export const UtensilCreateNestedOneWithoutUsersInputObjectZodSchema =
  makeSchema();
