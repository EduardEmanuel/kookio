import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionScalarWhereInputObjectSchema as UserDietaryRestrictionScalarWhereInputObjectSchema } from './UserDietaryRestrictionScalarWhereInput.schema';
import { UserDietaryRestrictionUpdateManyMutationInputObjectSchema as UserDietaryRestrictionUpdateManyMutationInputObjectSchema } from './UserDietaryRestrictionUpdateManyMutationInput.schema';
import { UserDietaryRestrictionUncheckedUpdateManyWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedUpdateManyWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedUpdateManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserDietaryRestrictionScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => UserDietaryRestrictionUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            UserDietaryRestrictionUncheckedUpdateManyWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserDietaryRestrictionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateManyWithWhereWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateManyWithWhereWithoutUserInput>;
export const UserDietaryRestrictionUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  makeSchema();
