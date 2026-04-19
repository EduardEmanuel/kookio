import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInputObjectSchema as DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInputObjectSchema } from './DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      restriction: z
        .lazy(
          () =>
            DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateWithoutUserInput>;
export const UserDietaryRestrictionUpdateWithoutUserInputObjectZodSchema =
  makeSchema();
