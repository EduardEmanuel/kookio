import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCreateWithoutUtensilsInputObjectSchema as UserProfileCreateWithoutUtensilsInputObjectSchema } from './UserProfileCreateWithoutUtensilsInput.schema';
import { UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema as UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema } from './UserProfileUncheckedCreateWithoutUtensilsInput.schema';
import { UserProfileCreateOrConnectWithoutUtensilsInputObjectSchema as UserProfileCreateOrConnectWithoutUtensilsInputObjectSchema } from './UserProfileCreateOrConnectWithoutUtensilsInput.schema';
import { UserProfileUpsertWithoutUtensilsInputObjectSchema as UserProfileUpsertWithoutUtensilsInputObjectSchema } from './UserProfileUpsertWithoutUtensilsInput.schema';
import { UserProfileWhereUniqueInputObjectSchema as UserProfileWhereUniqueInputObjectSchema } from './UserProfileWhereUniqueInput.schema';
import { UserProfileUpdateToOneWithWhereWithoutUtensilsInputObjectSchema as UserProfileUpdateToOneWithWhereWithoutUtensilsInputObjectSchema } from './UserProfileUpdateToOneWithWhereWithoutUtensilsInput.schema';
import { UserProfileUpdateWithoutUtensilsInputObjectSchema as UserProfileUpdateWithoutUtensilsInputObjectSchema } from './UserProfileUpdateWithoutUtensilsInput.schema';
import { UserProfileUncheckedUpdateWithoutUtensilsInputObjectSchema as UserProfileUncheckedUpdateWithoutUtensilsInputObjectSchema } from './UserProfileUncheckedUpdateWithoutUtensilsInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutUtensilsInputObjectSchema),
          z.lazy(
            () => UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserProfileCreateOrConnectWithoutUtensilsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserProfileUpsertWithoutUtensilsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateToOneWithWhereWithoutUtensilsInputObjectSchema,
          ),
          z.lazy(() => UserProfileUpdateWithoutUtensilsInputObjectSchema),
          z.lazy(
            () => UserProfileUncheckedUpdateWithoutUtensilsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const UserProfileUpdateOneRequiredWithoutUtensilsNestedInputObjectSchema: z.ZodType<Prisma.UserProfileUpdateOneRequiredWithoutUtensilsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUpdateOneRequiredWithoutUtensilsNestedInput>;
export const UserProfileUpdateOneRequiredWithoutUtensilsNestedInputObjectZodSchema =
  makeSchema();
