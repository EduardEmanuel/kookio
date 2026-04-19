import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserUtensilUncheckedUpdateManyWithoutUtensilNestedInputObjectSchema as UserUtensilUncheckedUpdateManyWithoutUtensilNestedInputObjectSchema } from './UserUtensilUncheckedUpdateManyWithoutUtensilNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      emoji: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      category: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      users: z
        .lazy(
          () =>
            UserUtensilUncheckedUpdateManyWithoutUtensilNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UtensilUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.UtensilUncheckedUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilUncheckedUpdateInput>;
export const UtensilUncheckedUpdateInputObjectZodSchema = makeSchema();
