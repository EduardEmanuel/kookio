import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

const makeSchema = () =>
  z
    .object({
      utensilId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUtensilUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserUtensilUncheckedUpdateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUncheckedUpdateWithoutUserInput>;
export const UserUtensilUncheckedUpdateWithoutUserInputObjectZodSchema =
  makeSchema();
