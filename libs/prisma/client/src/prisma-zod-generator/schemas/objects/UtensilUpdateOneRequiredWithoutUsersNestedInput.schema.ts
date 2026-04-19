import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilCreateWithoutUsersInputObjectSchema as UtensilCreateWithoutUsersInputObjectSchema } from './UtensilCreateWithoutUsersInput.schema';
import { UtensilUncheckedCreateWithoutUsersInputObjectSchema as UtensilUncheckedCreateWithoutUsersInputObjectSchema } from './UtensilUncheckedCreateWithoutUsersInput.schema';
import { UtensilCreateOrConnectWithoutUsersInputObjectSchema as UtensilCreateOrConnectWithoutUsersInputObjectSchema } from './UtensilCreateOrConnectWithoutUsersInput.schema';
import { UtensilUpsertWithoutUsersInputObjectSchema as UtensilUpsertWithoutUsersInputObjectSchema } from './UtensilUpsertWithoutUsersInput.schema';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './UtensilWhereUniqueInput.schema';
import { UtensilUpdateToOneWithWhereWithoutUsersInputObjectSchema as UtensilUpdateToOneWithWhereWithoutUsersInputObjectSchema } from './UtensilUpdateToOneWithWhereWithoutUsersInput.schema';
import { UtensilUpdateWithoutUsersInputObjectSchema as UtensilUpdateWithoutUsersInputObjectSchema } from './UtensilUpdateWithoutUsersInput.schema';
import { UtensilUncheckedUpdateWithoutUsersInputObjectSchema as UtensilUncheckedUpdateWithoutUsersInputObjectSchema } from './UtensilUncheckedUpdateWithoutUsersInput.schema';

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
      upsert: z
        .lazy(() => UtensilUpsertWithoutUsersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UtensilWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => UtensilUpdateToOneWithWhereWithoutUsersInputObjectSchema,
          ),
          z.lazy(() => UtensilUpdateWithoutUsersInputObjectSchema),
          z.lazy(() => UtensilUncheckedUpdateWithoutUsersInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UtensilUpdateOneRequiredWithoutUsersNestedInputObjectSchema: z.ZodType<Prisma.UtensilUpdateOneRequiredWithoutUsersNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilUpdateOneRequiredWithoutUsersNestedInput>;
export const UtensilUpdateOneRequiredWithoutUsersNestedInputObjectZodSchema =
  makeSchema();
