import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionCreateNestedManyWithoutUserInputObjectSchema as UserDietaryRestrictionCreateNestedManyWithoutUserInputObjectSchema } from './UserDietaryRestrictionCreateNestedManyWithoutUserInput.schema';
import { UserUtensilCreateNestedManyWithoutUserInputObjectSchema as UserUtensilCreateNestedManyWithoutUserInputObjectSchema } from './UserUtensilCreateNestedManyWithoutUserInput.schema';

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
            UserDietaryRestrictionCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
      utensils: z
        .lazy(() => UserUtensilCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserProfileCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserProfileCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCreateWithoutUserInput>;
export const UserProfileCreateWithoutUserInputObjectZodSchema = makeSchema();
