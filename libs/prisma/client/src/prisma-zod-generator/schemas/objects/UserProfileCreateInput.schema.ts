import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutProfileInputObjectSchema as UserCreateNestedOneWithoutProfileInputObjectSchema } from './UserCreateNestedOneWithoutProfileInput.schema';
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
      user: z.lazy(() => UserCreateNestedOneWithoutProfileInputObjectSchema),
      dietaryRestrictions: z.lazy(
        () =>
          UserDietaryRestrictionCreateNestedManyWithoutUserInputObjectSchema,
      ),
      utensils: z.lazy(
        () => UserUtensilCreateNestedManyWithoutUserInputObjectSchema,
      ),
    })
    .strict();
export const UserProfileCreateInputObjectSchema: z.ZodType<Prisma.UserProfileCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCreateInput>;
export const UserProfileCreateInputObjectZodSchema = makeSchema();
