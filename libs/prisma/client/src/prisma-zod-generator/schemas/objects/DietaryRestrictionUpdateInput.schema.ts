import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserDietaryRestrictionUpdateManyWithoutRestrictionNestedInputObjectSchema as UserDietaryRestrictionUpdateManyWithoutRestrictionNestedInputObjectSchema } from './UserDietaryRestrictionUpdateManyWithoutRestrictionNestedInput.schema';

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
            UserDietaryRestrictionUpdateManyWithoutRestrictionNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const DietaryRestrictionUpdateInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionUpdateInput>;
export const DietaryRestrictionUpdateInputObjectZodSchema = makeSchema();
