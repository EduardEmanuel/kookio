import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionCreateWithoutUserInputObjectSchema as UserDietaryRestrictionCreateWithoutUserInputObjectSchema } from './UserDietaryRestrictionCreateWithoutUserInput.schema';
import { UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserDietaryRestrictionCreateWithoutUserInputObjectSchema),
        z.lazy(
          () =>
            UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserDietaryRestrictionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateOrConnectWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateOrConnectWithoutUserInput>;
export const UserDietaryRestrictionCreateOrConnectWithoutUserInputObjectZodSchema =
  makeSchema();
