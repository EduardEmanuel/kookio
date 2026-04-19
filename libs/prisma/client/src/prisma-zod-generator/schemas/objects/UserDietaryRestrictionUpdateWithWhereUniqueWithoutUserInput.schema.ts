import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionUpdateWithoutUserInputObjectSchema as UserDietaryRestrictionUpdateWithoutUserInputObjectSchema } from './UserDietaryRestrictionUpdateWithoutUserInput.schema';
import { UserDietaryRestrictionUncheckedUpdateWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedUpdateWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedUpdateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => UserDietaryRestrictionUpdateWithoutUserInputObjectSchema),
        z.lazy(
          () =>
            UserDietaryRestrictionUncheckedUpdateWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserDietaryRestrictionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateWithWhereUniqueWithoutUserInput>;
export const UserDietaryRestrictionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
