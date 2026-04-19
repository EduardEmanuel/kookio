import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserDietaryRestrictionUncheckedUpdateManyWithoutRestrictionNestedInputObjectSchema as UserDietaryRestrictionUncheckedUpdateManyWithoutRestrictionNestedInputObjectSchema } from './UserDietaryRestrictionUncheckedUpdateManyWithoutRestrictionNestedInput.schema';

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
      label: z
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
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      users: z
        .lazy(
          () =>
            UserDietaryRestrictionUncheckedUpdateManyWithoutRestrictionNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const DietaryRestrictionUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionUncheckedUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionUncheckedUpdateInput>;
export const DietaryRestrictionUncheckedUpdateInputObjectZodSchema =
  makeSchema();
