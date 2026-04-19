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
      dietaryRestrictionId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUncheckedUpdateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUncheckedUpdateManyInput>;
export const UserDietaryRestrictionUncheckedUpdateManyInputObjectZodSchema =
  makeSchema();
