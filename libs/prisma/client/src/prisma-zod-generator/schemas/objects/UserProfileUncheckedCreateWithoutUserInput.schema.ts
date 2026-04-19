import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInput.schema';
import { UserUtensilUncheckedCreateNestedManyWithoutUserInputObjectSchema as UserUtensilUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './UserUtensilUncheckedCreateNestedManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      adultsCount: z.number().int().optional(),
      childrenCount: z.number().int().optional(),
      onboardingDone: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      dietaryRestrictions: z
        .lazy(
          () =>
            UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
      utensils: z
        .lazy(
          () =>
            UserUtensilUncheckedCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserProfileUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUncheckedCreateWithoutUserInput>;
export const UserProfileUncheckedCreateWithoutUserInputObjectZodSchema =
  makeSchema();
