import * as z from 'zod';
import type { Prisma } from '@prisma/client';
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
      updatedAt: z.coerce.date().optional(),
      utensils: z
        .lazy(
          () =>
            UserUtensilUncheckedCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutDietaryRestrictionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUncheckedCreateWithoutDietaryRestrictionsInput>;
export const UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectZodSchema =
  makeSchema();
