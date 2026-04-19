import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserUtensilUpdateManyWithoutUtensilNestedInputObjectSchema as UserUtensilUpdateManyWithoutUtensilNestedInputObjectSchema } from './UserUtensilUpdateManyWithoutUtensilNestedInput.schema';

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
        .lazy(() => UserUtensilUpdateManyWithoutUtensilNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const UtensilUpdateInputObjectSchema: z.ZodType<Prisma.UtensilUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilUpdateInput>;
export const UtensilUpdateInputObjectZodSchema = makeSchema();
