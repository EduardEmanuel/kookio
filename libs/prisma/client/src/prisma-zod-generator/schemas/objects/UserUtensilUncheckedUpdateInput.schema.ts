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
export const UserUtensilUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.UserUtensilUncheckedUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUncheckedUpdateInput>;
export const UserUtensilUncheckedUpdateInputObjectZodSchema = makeSchema();
