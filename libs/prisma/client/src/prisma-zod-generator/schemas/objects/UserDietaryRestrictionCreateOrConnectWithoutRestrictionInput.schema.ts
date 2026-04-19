import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionCreateWithoutRestrictionInput.schema';
import { UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateWithoutRestrictionInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
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
export const UserDietaryRestrictionCreateOrConnectWithoutRestrictionInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateOrConnectWithoutRestrictionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateOrConnectWithoutRestrictionInput>;
export const UserDietaryRestrictionCreateOrConnectWithoutRestrictionInputObjectZodSchema =
  makeSchema();
