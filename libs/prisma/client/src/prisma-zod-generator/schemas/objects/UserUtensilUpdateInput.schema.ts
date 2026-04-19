import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileUpdateOneRequiredWithoutUtensilsNestedInputObjectSchema as UserProfileUpdateOneRequiredWithoutUtensilsNestedInputObjectSchema } from './UserProfileUpdateOneRequiredWithoutUtensilsNestedInput.schema';
import { UtensilUpdateOneRequiredWithoutUsersNestedInputObjectSchema as UtensilUpdateOneRequiredWithoutUsersNestedInputObjectSchema } from './UtensilUpdateOneRequiredWithoutUsersNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .lazy(
          () =>
            UserProfileUpdateOneRequiredWithoutUtensilsNestedInputObjectSchema,
        )
        .optional(),
      utensil: z
        .lazy(() => UtensilUpdateOneRequiredWithoutUsersNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserUtensilUpdateInputObjectSchema: z.ZodType<Prisma.UserUtensilUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpdateInput>;
export const UserUtensilUpdateInputObjectZodSchema = makeSchema();
