import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionUpdateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUpdateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUpdateWithoutRestrictionInput.schema';
import { UserDietaryRestrictionUncheckedUpdateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUncheckedUpdateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUncheckedUpdateWithoutRestrictionInput.schema';
import { UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionCreateWithoutRestrictionInput.schema';
import { UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateWithoutRestrictionInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(
          () => UserDietaryRestrictionUpdateWithoutRestrictionInputObjectSchema,
        ),
        z.lazy(
          () =>
            UserDietaryRestrictionUncheckedUpdateWithoutRestrictionInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema,
        ),
        z.lazy(
          () =>
            UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserDietaryRestrictionUpsertWithWhereUniqueWithoutRestrictionInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpsertWithWhereUniqueWithoutRestrictionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpsertWithWhereUniqueWithoutRestrictionInput>;
export const UserDietaryRestrictionUpsertWithWhereUniqueWithoutRestrictionInputObjectZodSchema =
  makeSchema();
