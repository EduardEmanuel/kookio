import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

const makeSchema = () =>
  z
    .object({
      dietaryRestrictionId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUncheckedUpdateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUncheckedUpdateWithoutUserInput>;
export const UserDietaryRestrictionUncheckedUpdateWithoutUserInputObjectZodSchema =
  makeSchema();
