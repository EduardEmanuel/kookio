import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileWhereUniqueInputObjectSchema as UserProfileWhereUniqueInputObjectSchema } from './UserProfileWhereUniqueInput.schema';
import { UserProfileCreateWithoutUtensilsInputObjectSchema as UserProfileCreateWithoutUtensilsInputObjectSchema } from './UserProfileCreateWithoutUtensilsInput.schema';
import { UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema as UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema } from './UserProfileUncheckedCreateWithoutUtensilsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutUtensilsInputObjectSchema),
        z.lazy(
          () => UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserProfileCreateOrConnectWithoutUtensilsInputObjectSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutUtensilsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCreateOrConnectWithoutUtensilsInput>;
export const UserProfileCreateOrConnectWithoutUtensilsInputObjectZodSchema =
  makeSchema();
