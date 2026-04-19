import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCreateWithoutUtensilsInputObjectSchema as UserProfileCreateWithoutUtensilsInputObjectSchema } from './UserProfileCreateWithoutUtensilsInput.schema';
import { UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema as UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema } from './UserProfileUncheckedCreateWithoutUtensilsInput.schema';
import { UserProfileCreateOrConnectWithoutUtensilsInputObjectSchema as UserProfileCreateOrConnectWithoutUtensilsInputObjectSchema } from './UserProfileCreateOrConnectWithoutUtensilsInput.schema';
import { UserProfileWhereUniqueInputObjectSchema as UserProfileWhereUniqueInputObjectSchema } from './UserProfileWhereUniqueInput.schema';

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
      connect: z.lazy(() => UserProfileWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserProfileCreateNestedOneWithoutUtensilsInputObjectSchema: z.ZodType<Prisma.UserProfileCreateNestedOneWithoutUtensilsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCreateNestedOneWithoutUtensilsInput>;
export const UserProfileCreateNestedOneWithoutUtensilsInputObjectZodSchema =
  makeSchema();
