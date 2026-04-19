import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionUpdateWithoutUserInputObjectSchema as UserDietaryRestrictionUpdateWithoutUserInputObjectSchema } from './UserDietaryRestrictionUpdateWithoutUserInput.schema';
import { UserDietaryRestrictionUncheckedUpdateWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedUpdateWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedUpdateWithoutUserInput.schema';
import { UserDietaryRestrictionCreateWithoutUserInputObjectSchema as UserDietaryRestrictionCreateWithoutUserInputObjectSchema } from './UserDietaryRestrictionCreateWithoutUserInput.schema';
import { UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => UserDietaryRestrictionUpdateWithoutUserInputObjectSchema),
        z.lazy(
          () =>
            UserDietaryRestrictionUncheckedUpdateWithoutUserInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => UserDietaryRestrictionCreateWithoutUserInputObjectSchema),
        z.lazy(
          () =>
            UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserDietaryRestrictionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpsertWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpsertWithWhereUniqueWithoutUserInput>;
export const UserDietaryRestrictionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
