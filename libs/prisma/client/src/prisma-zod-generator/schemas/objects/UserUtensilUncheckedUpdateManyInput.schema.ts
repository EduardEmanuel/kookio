import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

const makeSchema = () =>
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      utensilId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUtensilUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.UserUtensilUncheckedUpdateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUncheckedUpdateManyInput>;
export const UserUtensilUncheckedUpdateManyInputObjectZodSchema = makeSchema();
