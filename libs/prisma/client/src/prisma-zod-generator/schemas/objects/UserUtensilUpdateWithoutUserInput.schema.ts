import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilUpdateOneRequiredWithoutUsersNestedInputObjectSchema as UtensilUpdateOneRequiredWithoutUsersNestedInputObjectSchema } from './UtensilUpdateOneRequiredWithoutUsersNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      utensil: z
        .lazy(() => UtensilUpdateOneRequiredWithoutUsersNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserUtensilUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserUtensilUpdateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpdateWithoutUserInput>;
export const UserUtensilUpdateWithoutUserInputObjectZodSchema = makeSchema();
