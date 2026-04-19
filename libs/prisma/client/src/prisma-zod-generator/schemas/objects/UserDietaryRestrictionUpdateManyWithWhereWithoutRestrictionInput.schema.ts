import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionScalarWhereInputObjectSchema as UserDietaryRestrictionScalarWhereInputObjectSchema } from './UserDietaryRestrictionScalarWhereInput.schema';
import { UserDietaryRestrictionUpdateManyMutationInputObjectSchema as UserDietaryRestrictionUpdateManyMutationInputObjectSchema } from './UserDietaryRestrictionUpdateManyMutationInput.schema';
import { UserDietaryRestrictionUncheckedUpdateManyWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUncheckedUpdateManyWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUncheckedUpdateManyWithoutRestrictionInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserDietaryRestrictionScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => UserDietaryRestrictionUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            UserDietaryRestrictionUncheckedUpdateManyWithoutRestrictionInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserDietaryRestrictionUpdateManyWithWhereWithoutRestrictionInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateManyWithWhereWithoutRestrictionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateManyWithWhereWithoutRestrictionInput>;
export const UserDietaryRestrictionUpdateManyWithWhereWithoutRestrictionInputObjectZodSchema =
  makeSchema();
