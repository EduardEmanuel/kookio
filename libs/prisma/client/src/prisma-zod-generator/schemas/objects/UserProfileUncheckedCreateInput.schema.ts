import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInput.schema';
import { UserUtensilUncheckedCreateNestedManyWithoutUserInputObjectSchema as UserUtensilUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './UserUtensilUncheckedCreateNestedManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      adultsCount: z.number().int().optional(),
      childrenCount: z.number().int().optional(),
      onboardingDone: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      dietaryRestrictions: z.lazy(
        () =>
          UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInputObjectSchema,
      ),
      utensils: z.lazy(
        () => UserUtensilUncheckedCreateNestedManyWithoutUserInputObjectSchema,
      ),
    })
    .strict();
export const UserProfileUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserProfileUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUncheckedCreateInput>;
export const UserProfileUncheckedCreateInputObjectZodSchema = makeSchema();
