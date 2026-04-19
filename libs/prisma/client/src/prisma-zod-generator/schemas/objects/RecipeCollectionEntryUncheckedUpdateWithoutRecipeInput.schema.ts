import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';

const makeSchema = () =>
  z
    .object({
      collectionId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      addedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryUncheckedUpdateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUncheckedUpdateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUncheckedUpdateWithoutRecipeInput>;
export const RecipeCollectionEntryUncheckedUpdateWithoutRecipeInputObjectZodSchema =
  makeSchema();
