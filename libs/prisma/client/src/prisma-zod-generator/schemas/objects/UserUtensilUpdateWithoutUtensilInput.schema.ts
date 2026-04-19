import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileUpdateOneRequiredWithoutUtensilsNestedInputObjectSchema as UserProfileUpdateOneRequiredWithoutUtensilsNestedInputObjectSchema } from './UserProfileUpdateOneRequiredWithoutUtensilsNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .lazy(
          () =>
            UserProfileUpdateOneRequiredWithoutUtensilsNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserUtensilUpdateWithoutUtensilInputObjectSchema: z.ZodType<Prisma.UserUtensilUpdateWithoutUtensilInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpdateWithoutUtensilInput>;
export const UserUtensilUpdateWithoutUtensilInputObjectZodSchema = makeSchema();
