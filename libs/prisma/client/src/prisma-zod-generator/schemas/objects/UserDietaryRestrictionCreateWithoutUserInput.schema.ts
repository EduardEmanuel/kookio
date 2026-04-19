import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionCreateNestedOneWithoutUsersInputObjectSchema as DietaryRestrictionCreateNestedOneWithoutUsersInputObjectSchema } from './DietaryRestrictionCreateNestedOneWithoutUsersInput.schema';

const makeSchema = () =>
  z
    .object({
      restriction: z.lazy(
        () => DietaryRestrictionCreateNestedOneWithoutUsersInputObjectSchema,
      ),
    })
    .strict();
export const UserDietaryRestrictionCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateWithoutUserInput>;
export const UserDietaryRestrictionCreateWithoutUserInputObjectZodSchema =
  makeSchema();
