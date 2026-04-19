import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionUpdateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUpdateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUpdateWithoutRestrictionInput.schema';
import { UserDietaryRestrictionUncheckedUpdateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUncheckedUpdateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUncheckedUpdateWithoutRestrictionInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(
          () => UserDietaryRestrictionUpdateWithoutRestrictionInputObjectSchema,
        ),
        z.lazy(
          () =>
            UserDietaryRestrictionUncheckedUpdateWithoutRestrictionInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserDietaryRestrictionUpdateWithWhereUniqueWithoutRestrictionInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateWithWhereUniqueWithoutRestrictionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateWithWhereUniqueWithoutRestrictionInput>;
export const UserDietaryRestrictionUpdateWithWhereUniqueWithoutRestrictionInputObjectZodSchema =
  makeSchema();
