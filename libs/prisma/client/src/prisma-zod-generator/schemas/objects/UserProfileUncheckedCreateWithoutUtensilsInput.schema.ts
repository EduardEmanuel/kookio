import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateNestedManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
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
    })
    .strict();
export const UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutUtensilsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUncheckedCreateWithoutUtensilsInput>;
export const UserProfileUncheckedCreateWithoutUtensilsInputObjectZodSchema =
  makeSchema();
