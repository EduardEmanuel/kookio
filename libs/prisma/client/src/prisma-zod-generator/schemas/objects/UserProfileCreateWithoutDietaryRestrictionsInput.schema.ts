import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutProfileInputObjectSchema as UserCreateNestedOneWithoutProfileInputObjectSchema } from './UserCreateNestedOneWithoutProfileInput.schema';
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
      user: z.lazy(() => UserCreateNestedOneWithoutProfileInputObjectSchema),
      utensils: z
        .lazy(() => UserUtensilCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema: z.ZodType<Prisma.UserProfileCreateWithoutDietaryRestrictionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCreateWithoutDietaryRestrictionsInput>;
export const UserProfileCreateWithoutDietaryRestrictionsInputObjectZodSchema =
  makeSchema();
