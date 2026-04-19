import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutProfileInputObjectSchema as UserCreateNestedOneWithoutProfileInputObjectSchema } from './UserCreateNestedOneWithoutProfileInput.schema';
import { UserDietaryRestrictionCreateNestedManyWithoutUserInputObjectSchema as UserDietaryRestrictionCreateNestedManyWithoutUserInputObjectSchema } from './UserDietaryRestrictionCreateNestedManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      adultsCount: z.number().int().optional(),
      childrenCount: z.number().int().optional(),
      onboardingDone: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutProfileInputObjectSchema),
      dietaryRestrictions: z
        .lazy(
          () =>
            UserDietaryRestrictionCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserProfileCreateWithoutUtensilsInputObjectSchema: z.ZodType<Prisma.UserProfileCreateWithoutUtensilsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCreateWithoutUtensilsInput>;
export const UserProfileCreateWithoutUtensilsInputObjectZodSchema =
  makeSchema();
